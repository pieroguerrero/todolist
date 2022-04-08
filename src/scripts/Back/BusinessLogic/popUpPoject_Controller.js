import PubSub from 'pubsub-js';
import { createProjectDAO } from '../DataAccess/ProjectDAO';
import { STATUS } from '../Model/Status';

const popUpProject_Controller = (function () {

    let dblOWnerUserIdkeep;

    const saveProject = function (strMessage, { dblId, strName, strDescription, dtStartDate, dtEndDate }) {

        let strResult = "error";
        const objProjectDAO = createProjectDAO();

        if (dblId === -1) {

            if (objProjectDAO.dbInsert(strName, strDescription, dtStartDate, dtEndDate, STATUS.PENDING.id, 1, 1) > 0) {
                strResult = "The Project was created successfully."
            }

        } else if (dblId > 0) {

            if (objProjectDAO.dbUpdate(dblId, strName, strDescription, dtStartDate, dtEndDate, STATUS.PENDING.id, 1) > 0) {
                strResult = "The Project was updated successfully."
            }

        }

        PubSub.publish("PopupProjectSaveResult", strResult);
    };

    return {
        subscribeEvents: function (dblOWnerUserId) {

            dblOWnerUserIdkeep = dblOWnerUserId;
            PubSub.subscribe("PopupProjectSave", saveProject);
        },
    }

})();

export { popUpProject_Controller };