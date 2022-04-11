import { createProjectDAO } from '../DataAccess/ProjectDAO';
import { STATUS } from '../Model/Status';

const popUpProject_Controller = (function () {

    let dblOWnerUserIdkeep;

    return {
        subscribeEvents: function (dblOWnerUserId) {

            dblOWnerUserIdkeep = dblOWnerUserId;
            //PubSub.subscribe("PopupProjectSave", saveProject);
        },
        /**
         * 
                 * @param {number} dblId 
                 * @param {string} strName 
                 * @param {string} strDescription 
                 * @param {Date} dtStartDate 
                 * @param {Date} dtEndDate 
         * @returns 
         */
        saveProject: function (dblId, strName, strDescription, dtStartDate, dtEndDate) {

            let dblResultId, strResult = "error";

            const objProjectDAO = createProjectDAO();

            if (dblId === -1) {

                dblResultId = objProjectDAO.dbInsert(strName, strDescription, dtStartDate, dtEndDate, STATUS.PENDING.id, 1, 1);
                if (dblResultId > 0) {
                    strResult = "The Project was created successfully."
                }

            } else if (dblId > 0) {

                dblResultId = objProjectDAO.dbUpdate(dblId, strName, strDescription, dtStartDate, dtEndDate, STATUS.PENDING.id, 1);
                if (dblResultId > 0) {
                    strResult = "The Project was updated successfully."
                }

            }

            return { strResult, dblResultId }
            //PubSub.publish("PopupProjectSaveResult", { strResult, dblResultId });
        },
    }

})();

export { popUpProject_Controller };