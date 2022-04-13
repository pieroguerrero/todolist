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
         * intCantSubTasks:number
         * }[]}
         */
        getTasksListbyDate: function (dblCurrentUserId, dtDate, dblProjectId) {

            const arrAllTasks = createTodoDAO().dbSelectByDate(dtDate, dblCurrentUserId);
            const objSubTasks = createSubTaskDAO();

            const arrSimpleTasksList = arrAllTasks.map(objTaks => ({
                dblTaskId: objTaks.getId(),
                strTaskName: objTaks.getTitle(),
                strDescription: objTaks.getDescription(),
                intCantSubTasks: objSubTasks.dbSelectActiveByTodo(objTaks.getId()).length,
            }));

            return arrSimpleTasksList;
        },

    }
})();

export { mainLandingWelcome_Controller };