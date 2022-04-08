import { createProjectDAO } from "../DataAccess/ProjectDAO";
import { STATUS } from "../Model/Status";

const mainLandingWelcome_Controller = (function () {

    let dblOWnerUserIdkeep;

    const createDefatultProject = function () {

        const objProjectDAO = createProjectDAO();
        const objDefaultProject = objProjectDAO.dbSelect(1, dblOWnerUserIdkeep);

        if (!objDefaultProject) {

            objProjectDAO.dbInsert("Personal Tasks", "This is the default project where you can log personal and private tasks.", new Date(), new Date(), STATUS.INPROGRESS.id, dblOWnerUserIdkeep, dblOWnerUserIdkeep);
        }
    };

    /**
     * 
     * @param {object} obj 
     */
    const loadProjectsList = function (obj) {



        createDefatultProject();

        //PubSub.publish("MainLandingWelcomeController-LoadProjectsList-Render",);
    };

    return {
        subscribeEvents: function (dblOWnerUserId) {

            dblOWnerUserIdkeep = dblOWnerUserId;
            PubSub.subscribe("MainLandingWelcome-Load-GetProjectsList", loadProjectsList);
        },

    }
})();

export { mainLandingWelcome_Controller };