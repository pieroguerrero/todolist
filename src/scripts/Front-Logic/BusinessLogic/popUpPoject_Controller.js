import { createProjectDAO } from "../DataAccess/ProjectDAO";
import { STATUS } from "../Model/Status";

const popUpProject_Controller = (function () {
  let strOWnerUserIdkeep = "";

  return {
    /**
     *
     * @param {string} strOWnerUserId
     */
    subscribeEvents: function (strOWnerUserId) {
      strOWnerUserIdkeep = strOWnerUserId;
    },
    /**
     *
     * @param {string} strId
     * @param {string} strName
     * @param {string} strDescription
     * @param {Date} dtStartDate
     * @param {Date} dtEndDate
     * @param {string} strUserOwnerId
     * @returns { Promise<{strResult:string, strResultId:string}> }
     */
    saveProject: async function (
      strId,
      strName,
      strDescription,
      dtStartDate,
      dtEndDate,
      strUserOwnerId
    ) {
      let strResultId = "",
        strResult = "error";

      const objProjectDAO = createProjectDAO();

      if (strId === "-1") {
        strResultId = await objProjectDAO.dbInsert(
          strName,
          strDescription,
          dtStartDate,
          dtEndDate,
          STATUS.PENDING.id,
          strUserOwnerId,
          strUserOwnerId
        );
        if (strResultId.length > 0) {
          strResult = "The Project was created successfully.";
        }
      } else if (strId && strId.length > 0) {
        strResultId = await objProjectDAO.dbUpdate(
          strId,
          strName,
          strDescription,
          dtStartDate,
          dtEndDate,
          STATUS.PENDING.id,
          strUserOwnerId
        );
        if (strResultId.length > 0) {
          strResult = "The Project was updated successfully.";
        }
      }

      return { strResult, strResultId };
    },
  };
})();

export { popUpProject_Controller };
