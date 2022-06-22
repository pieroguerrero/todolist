import { createProjectDAO } from "../DataAccess/ProjectDAO";
import { createTodoDAO } from "../DataAccess/TodoDAO";
import { STATUS } from "../Model/Status";

const menuTray_Controller = (function () {
  let strOWnerUserIdkeep;

  /**
   *
   * @param {string[]} arrTodoIds
   * @returns
   */
  const calculateOpenTasksByProject = function (arrTodoIds) {
    const arrTodos = createTodoDAO().dbSelectAll(arrTodoIds);
    const arrTodosReduced = arrTodos.reduce((prev, curr) => {
      if (
        curr.getStatusId() !== STATUS.EMPTY.id &&
        curr.getStatusId() !== STATUS.COMPLETED.id &&
        curr.getStatusId() !== STATUS.CLOSED.id
      ) {
        prev++;
      }

      return prev;
    }, 0);

    return arrTodosReduced;
  };

  return {
    /**
     *
     * @param {string} strOWnerUserId
     */
    subscribeEvents: function (strOWnerUserId) {
      strOWnerUserIdkeep = strOWnerUserId;
    },
    /**
     *
     * @param {string} strOWnerUserId
     * @returns {Promise<Object[]>}
     */
    getProjectsList: async (strOWnerUserId) => {
      const arrProjects = await createProjectDAO().dbSelectAll(strOWnerUserId);

      const arrProjectsFiltered = arrProjects.map((objProject) => ({
        strId: objProject.getId(),
        strName: objProject.getTitle(),
        dtStartDate: objProject.getStartDate(),
        dtEndDate: objProject.getEndDate(),
        intCantOpenTasks: calculateOpenTasksByProject(
          objProject.getToDosIdList()
        ),
      }));

      return arrProjectsFiltered;
    },
    /**
     *
     * @param {string} strProjectId
     * @param {Date} dtStartDate
     * @param {Date} dtEndDate
     * @param {string} strCurrentUserId
     * @returns
     */
    calculateQttyOfTasks: async function (
      strProjectId,
      dtStartDate,
      dtEndDate,
      strCurrentUserId
    ) {
      const arrTodo = await createTodoDAO().dbSelectByDate(
        dtStartDate,
        dtEndDate,
        strCurrentUserId
      );

      return arrTodo.length;
    },
  };
})();

export { menuTray_Controller };
