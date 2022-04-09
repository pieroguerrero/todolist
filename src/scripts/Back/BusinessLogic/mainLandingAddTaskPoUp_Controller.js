import PubSub from 'pubsub-js'
import { createProjectDAO } from '../DataAccess/ProjectDAO';

const mainLandingAddTaskPoUp_Controller = (function () {

    let dblOWnerUserIdkeep;

    const loadProjectsDropDownList = function (data) {

        const objProjectDAO = createProjectDAO();

        const arrProjects = objProjectDAO.dbSelectAll(data.dblCurrentUserId);

        const arrProjectsFiltered = arrProjects.map(objProject => ({ dblId: objProject.getId(), strName: objProject.getTitle(), }));

        PubSub.publish("MainLandingAddTaskPoUp-Load-RenderProjectsDropDownList", arrProjectsFiltered);
    };

    return {

        subscribeEvents: function (dblCurrentUserId) {

            dblOWnerUserIdkeep = dblCurrentUserId;
            PubSub.subscribe("MainLandingAddTaskPoUp-Load-GetProjectsDropDownList", loadProjectsDropDownList);
        },
    }
})();

export { mainLandingAddTaskPoUp_Controller };