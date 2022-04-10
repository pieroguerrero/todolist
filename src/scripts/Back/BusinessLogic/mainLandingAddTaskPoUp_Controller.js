import PubSub from 'pubsub-js'
import { createProjectDAO } from '../DataAccess/ProjectDAO';
import { createTodoDAO } from '../DataAccess/TodoDAO';
import { STATUS } from '../Model/Status';

const mainLandingAddTaskPoUp_Controller = (function () {

    let dblOWnerUserIdkeep;

    const loadProjectsDropDownList = function (data) {

        const objProjectDAO = createProjectDAO();

        const arrProjects = objProjectDAO.dbSelectAll(data.dblCurrentUserId);

        const arrProjectsFiltered = arrProjects.map(objProject => ({ dblId: objProject.getId(), strName: objProject.getTitle(), }));

        PubSub.publish("MainLandingAddTaskPoUp-Load-RenderProjectsDropDownList", arrProjectsFiltered);
    };

    /**
     * 
     * @param {string} strMessage
     * @param {{
     * dblProjectId:number,
     * strName:string,
     * strDescription:string,
     * dtDueDate:Date,
     * intPriorityId:number,
     * strLabel:string,
     * dblUserCreatorId:number,
     * dblUserOwnerId:number,
     * }} objTaskBasic 
     */
    const registerNewTask = function (strMessage, objTaskBasic) {

        const objTaskDAO = createTodoDAO();
        const dblNewTaskId = objTaskDAO.dbInsert(objTaskBasic.dblProjectId, STATUS.PENDING.id, objTaskBasic.strName, objTaskBasic.strDescription, objTaskBasic.dtDueDate, objTaskBasic.intPriorityId, objTaskBasic.strLabel, objTaskBasic.dblUserOwnerId, objTaskBasic.dblUserCreatorId);

        const strResult = dblNewTaskId > 0 ? "The Task was created sucessfully." : "Error";

        PubSub.publish("MainLandingAddTaskPopUpController-RegisterNewTask-Render", { dblId: dblNewTaskId, strResult });
    };

    return {

        subscribeEvents: function (dblCurrentUserId) {

            dblOWnerUserIdkeep = dblCurrentUserId;
            PubSub.subscribe("MainLandingAddTaskPoUp-Load-GetProjectsDropDownList", loadProjectsDropDownList);
            PubSub.subscribe("MainLandinAddTaskPopUp-CreateNewTask-Register", registerNewTask);

        },
    }
})();

export { mainLandingAddTaskPoUp_Controller };