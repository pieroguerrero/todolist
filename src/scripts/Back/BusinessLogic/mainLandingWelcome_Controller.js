import { createProjectDAO } from "../DataAccess/ProjectDAO";
import { STATUS } from "../Model/Status";
import { createTodoDAO } from "../DataAccess/TodoDAO";
import { createSubTaskDAO } from "../DataAccess/SubTaskDAO";

const mainLandingWelcome_Controller = (function () {

    let dblOWnerUserIdkeep;

    return {
        load: function (dblCurrentUserId) {

            dblOWnerUserIdkeep = dblCurrentUserId;
        },
        createDefatultProject: function () {

            const objProjectDAO = createProjectDAO();

            if (!objProjectDAO.dbSelect(1, dblOWnerUserIdkeep)) {

                objProjectDAO.dbInsertDefaultProject(1, "Personal Tasks", "This is the default project where you can log personal and private tasks.", STATUS.INPROGRESS.id, dblOWnerUserIdkeep, dblOWnerUserIdkeep);
            }
        },
        /**
         * 
         * @param {number} dblCurrentUserId 
         * @param {Date} dtDate 
         * @param {number} dblProjectId
         * @returns {{
         * dblTaskId: number,
         * strTaskName: string,
         * strDescription: string,
         * intCantSubTasks:number,
         * intStatusId:number
         * }[]}
         */
        getTasksListbyDate: function (dblCurrentUserId, dtDate, dblProjectId, booPunctualDate, booShowOverDueTask) {

            let arrAllTasks;

            if (dblProjectId === -1) {
                arrAllTasks = createTodoDAO().dbSelectByDate(dtDate, booPunctualDate ? dtDate : null, dblCurrentUserId);
            } else {
                arrAllTasks = createTodoDAO().dbSelectByProject(dblProjectId);
            }

            const objSubTasks = createSubTaskDAO();

            const arrSimpleTasksList = arrAllTasks.map(objTaks => ({
                dblTaskId: objTaks.getId(),
                strTaskName: objTaks.getTitle(),
                strDescription: objTaks.getDescription(),
                intCantSubTasks: objSubTasks.dbSelectActiveByTodo(objTaks.getId()).length,
                intStatusId: objTaks.getStatusId(),
            }));

            return arrSimpleTasksList;
        },
        /**
         * 
         * @param {number} dblTaskId 
         */
        completeTask: function (dblTaskId) {

            const objResult = {};

            objResult.dblId = createTodoDAO().dbComplete(dblTaskId);
            objResult.strMessage = "Success";

            return objResult;
        },
    }
})();

export { mainLandingWelcome_Controller };