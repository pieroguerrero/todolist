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
     * @returns { {strResult:string, strResultId:string} }
     */
    saveProject: function (
      strId,
      strName,
      strDescription,
      dtStartDate,
      dtEndDate
    ) {
      let strResultId = "",
        strResult = "error";

      const objProjectDAO = createProjectDAO();

      if (strId === "-1") {
        strResultId = objProjectDAO.dbInsert(
          strName,
          strDescription,
          dtStartDate,
          dtEndDate,
          STATUS.PENDING.id,
          "1",
          "1"
        );
        if (strResultId.length > 0) {
          strResult = "The Project was created successfully.";
        }
      } else if (strId && strId.length > 0) {
        strResultId = objProjectDAO.dbUpdate(
          strId,
          strName,
          strDescription,
          dtStartDate,
          dtEndDate,
          STATUS.PENDING.id,
          "1"
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
