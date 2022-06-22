import { createProjectDAO } from "../DataAccess/ProjectDAO";
import { STATUS } from "../Model/Status";

const PopUpSignIn_Controllers = (() => {
  return {
    /**
     *
     * @param {string} strUserOwnerId
     * @returns {Promise<void>}
     */
    createDefatultProject(strUserOwnerId) {
      const objProjectDAO = createProjectDAO();

      return objProjectDAO.fbInsertDefaultProject(
        "1",
        "Personal Tasks",
        "This is the default project where you can log personal and private tasks.",
        STATUS.INPROGRESS.id,
        strUserOwnerId,
        strUserOwnerId
      );
    },
  };
})();
export { PopUpSignIn_Controllers };
