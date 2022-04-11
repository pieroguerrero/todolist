import { createProjectDAO } from '../DataAccess/ProjectDAO';
import { createTodoDAO } from '../DataAccess/TodoDAO';
import { STATUS } from '../Model/Status';

const mainLandingAddTaskPoUp_Controller = (function () {

    let dblOWnerUserIdkeep;

    return {

        subscribeEvents: function (dblCurrentUserId) {

            dblOWnerUserIdkeep = dblCurrentUserId;
            //PubSub.subscribe("MainLandingAddTaskPoUp-Load-GetProjectsDropDownList", loadProjectsDropDownList);
            //PubSub.subscribe("MainLandinAddTaskPopUp-CreateNewTask-Register", registerNewTask);

        },
        /**
     * 
     * @param {number} dblProjectId 
     * @param {string} strName 
     * @param {string} strDescription 
     * @param {Date} dtDueDate 
     * @param {number} intPriorityId 
     * @param {string} strLabel 
     * @param {number} dblUserOwnerId 
     * @param {number} dblUserCreatorId 
     * @returns 
     */
        registerNewTask: function (dblProjectId, strName, strDescription, dtDueDate, intPriorityId, strLabel, dblUserOwnerId, dblUserCreatorId) {

            const objTaskDAO = createTodoDAO();
            const dblNewTaskId = objTaskDAO.dbInsert(dblProjectId, STATUS.PENDING.id, strName, strDescription, dtDueDate, intPriorityId, strLabel, dblUserOwnerId, dblUserCreatorId);

            const strResult = dblNewTaskId > 0 ? "The Task was created sucessfully." : "Error";

            return { dblId: dblNewTaskId, strResult };
            //PubSub.publish("MainLandingAddTaskPopUpController-RegisterNewTask-Render", { dblId: dblNewTaskId, strResult });
        },
        loadProjectsDropDownList: function (dblCurrentUserId) {

            const objProjectDAO = createProjectDAO();

            const arrProjects = objProjectDAO.dbSelectAll(dblCurrentUserId);

            const arrProjectsFiltered = arrProjects.map(objProject => ({ dblId: objProject.getId(), strName: objProject.getTitle(), }));

            return arrProjectsFiltered;
        },
    }
})();

export { mainLandingAddTaskPoUp_Controller };