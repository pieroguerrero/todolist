import { createProjectDAO } from "../DataAccess/ProjectDAO";
import { STATUS } from "../Model/Status";
import { createTodoDAO } from "../DataAccess/TodoDAO";
import { createSubTaskDAO } from "../DataAccess/SubTaskDAO";

const mainLandingWelcome_Controller = (function () {
  let strOWnerUserIdkeep;

  return {
    /**
     *
     * @param {string} strCurrentUserId
     */
    load: function (strCurrentUserId) {
      strOWnerUserIdkeep = strCurrentUserId;
    },
    createDefatultProject: function () {
      const objProjectDAO = createProjectDAO();

      if (!objProjectDAO.dbSelect("1", strOWnerUserIdkeep)) {
        objProjectDAO.dbInsertDefaultProject(
          "1",
          "Personal Tasks",
          "This is the default project where you can log personal and private tasks.",
          STATUS.INPROGRESS.id,
          strOWnerUserIdkeep,
          strOWnerUserIdkeep
        );
      }
    },
    /**
     *
     * @param {string} strCurrentUserId
     * @param {Date} dtDate
     * @param {string} strProjectId
     * @returns {{
     * strTaskId: string,
     * strTaskName: string,
     * strDescription: string,
     * intCantSubTasks:number,
     * intStatusId:number
     * }[]}
     */
    getTasksListbyDate: function (
      strCurrentUserId,
      dtDate,
      strProjectId,
      booPunctualDate,
      booShowOverDueTask
    ) {
      let arrAllTasks;

      if (strProjectId === "-1") {
        arrAllTasks = createTodoDAO().dbSelectByDate(
          dtDate,
          booPunctualDate ? dtDate : null,
          strCurrentUserId
        );
      } else {
        arrAllTasks = createTodoDAO().dbSelectByProject(strProjectId);
      }

      const objSubTasks = createSubTaskDAO();

      const arrSimpleTasksList = arrAllTasks.map((objTaks) => ({
        strTaskId: objTaks.getId(),
        strTaskName: objTaks.getTitle(),
        strDescription: objTaks.getDescription(),
        intCantSubTasks: objSubTasks.dbSelectActiveByTodo(objTaks.getId())
          .length,
        intStatusId: objTaks.getStatusId(),
      }));

      return arrSimpleTasksList;
    },
    /**
     *
     * @param {string} strTaskId
     * @returns {{strId:string, strMessage:string}}
     */
    completeTask: function (strTaskId) {
      const objResult = {};

      objResult.strId = createTodoDAO().dbComplete(strTaskId);
      objResult.strMessage = "Success";

      return objResult;
    },
  };
})();

export { mainLandingWelcome_Controller };
