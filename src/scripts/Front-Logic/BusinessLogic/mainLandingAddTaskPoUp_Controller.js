import { createProjectDAO } from "../DataAccess/ProjectDAO";
import { createTodoDAO } from "../DataAccess/TodoDAO";
import { STATUS } from "../Model/Status";

const mainLandingAddTaskPoUp_Controller = (function () {
  let strOWnerUserIdkeep = "";

  return {
    /**
     *
     * @param {string} strCurrentUserId
     */
    subscribeEvents: function (strCurrentUserId) {
      strOWnerUserIdkeep = strCurrentUserId;
    },
    /**
     *
     * @param {string} strProjectId
     * @param {string} strName
     * @param {string} strDescription
     * @param {Date} dtDueDate
     * @param {number} intPriorityId
     * @param {string} strLabel
     * @param {string} strUserOwnerId
     * @param {string} strUserCreatorId
     * @returns { {strId: string, strResult:string} }
     */
    registerNewTask: function (
      strProjectId,
      strName,
      strDescription,
      dtDueDate,
      intPriorityId,
      strLabel,
      strUserOwnerId,
      strUserCreatorId
    ) {
      const objTaskDAO = createTodoDAO();
      const strNewTaskId = objTaskDAO.dbInsert(
        strProjectId,
        STATUS.PENDING.id,
        strName,
        strDescription,
        dtDueDate,
        intPriorityId,
        strLabel,
        strUserOwnerId,
        strUserCreatorId
      );

      const strResult =
        strNewTaskId && strNewTaskId.length > 0
          ? "The Task was created sucessfully."
          : "Error";

      return { strId: strNewTaskId, strResult };
    },
    /**
     *
     * @param {string} strCurrentUserId
     * @returns
     */
    loadProjectsDropDownList: async function (strCurrentUserId) {
      const objProjectDAO = createProjectDAO();

      const arrProjects = await objProjectDAO.dbSelectAll(strCurrentUserId);

      const arrProjectsFiltered = arrProjects.map((objProject) => ({
        strId: objProject.getId(),
        strName: objProject.getTitle(),
      }));

      return arrProjectsFiltered;
    },
  };
})();

export { mainLandingAddTaskPoUp_Controller };
