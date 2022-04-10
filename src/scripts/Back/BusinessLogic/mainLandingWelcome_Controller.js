import { createProjectDAO } from "../DataAccess/ProjectDAO";
import { STATUS } from "../Model/Status";

const mainLandingWelcome_Controller = (function () {

    let dblOWnerUserIdkeep;

    const createDefatultProject = function () {

        const objProjectDAO = createProjectDAO();

        if (!objProjectDAO.dbSelect(1, dblOWnerUserIdkeep)) {

            objProjectDAO.dbInsertDefaultProject(1, "Personal Tasks", "This is the default project where you can log personal and private tasks.", STATUS.INPROGRESS.id, dblOWnerUserIdkeep, dblOWnerUserIdkeep);
        }
    };

    /**
     * @param {string} strMessage
     * @param {{ dblCurrentUserId: number, dtDate: Date, dblProjectId: number }} objCriteria 
     */
    const loadTasksList = function (strMessage, objCriteria) {



        createDefatultProject();

        //PubSub.publish("MainLandingWelcomeController-LoadProjectsList-Render",);
    };

    return {
        subscribeEvents: function (dblCurrentUserId) {

            dblOWnerUserIdkeep = dblCurrentUserId;
            PubSub.subscribe("MainLandingWelcome-Load-GetTasksList", loadTasksList);
        },

    }
})();

export { mainLandingWelcome_Controller };