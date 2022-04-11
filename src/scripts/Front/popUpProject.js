import format from "date-fns/format";
import { popUpProject_Controller } from "../Back/BusinessLogic/popUpPoject_Controller";
import { mainLandingAddTaskPoUp } from "./mainLandingAddTaskPoUp";
import { menuTray } from "./menuTray";

const popUpProject = (function () {

    const divPopUpProject = document.getElementById("div-popup-register-project");
    const limitEndDate = function (dtStartDate) {

        const inputEndDate = divPopUpProject.querySelector("#date-register-project-enddate");
        inputEndDate.setAttribute("min", format(dtStartDate, "yyyy/MM/dd"));
    }

    /**
         * 
         * @param {number} intProjectID If -1 it will register a new Project, otherwise will update the correspondant Project based on the Project ID.
         */
    const saveProject = function (intProjectID) {

        const frmPopUpProject = divPopUpProject.querySelector("#form-popup-register-project");

        if (frmPopUpProject.checkValidity()) {

            const objProjectUI = {
                dblId: intProjectID,
                strName: divPopUpProject.querySelector("#input-register-project-name").value,
                strDescription: divPopUpProject.querySelector("#textarea-register-project-description").value,
                dtStartDate: new Date(divPopUpProject.querySelector("#date-register-project-startdate").value.replace(/-/g, '\/')),
                dtEndDate: new Date(divPopUpProject.querySelector("#date-register-project-enddate").value.replace(/-/g, '\/')),
            };

            const objResult = popUpProject_Controller.saveProject(objProjectUI.dblId, objProjectUI.strName, objProjectUI.strDescription, objProjectUI.dtStartDate, objProjectUI.dtEndDate);

            if (objResult.strResult !== "error") {

                if (menuTray.isOpen()) {

                    menuTray.loadProjectsList();
                } else if (mainLandingAddTaskPoUp.isOpen()) {

                    mainLandingAddTaskPoUp.loadProjectsList();
                }

                close();
            }

            alert(objResult.strResult);
        }
    };

    const close = function () {

        if (!divPopUpProject.classList.contains("hidden")) {
            divPopUpProject.classList.add("hidden");
        }
    };

    /**
     * 
     * @param {Function} fnLaterExecution 
     */
    const cancelPopUp = function (fnLaterExecution) {

        close();

        if (fnLaterExecution) {

            fnLaterExecution();
        }

    };

    return {
        /**
         * 
         * @param {number} intProjectID If -1 it will load the PopUp in registration mode, otherwise will use the Project Id passed to load the correspondant Project data.
         * @param {Function} fnCancelLaterExecution To be 
         */
        load: function (intProjectID, fnCancelLaterExecution = null) {

            divPopUpProject.classList.remove("hidden");

            const btnCancel = divPopUpProject.querySelector("#button-form-register-project-cancel");
            btnCancel.onclick = cancelPopUp.bind(btnCancel, fnCancelLaterExecution);

            const btnAdd = divPopUpProject.querySelector("#button-form-register-project-add");
            btnAdd.onclick = saveProject.bind(null, intProjectID);
            btnAdd.textContent = intProjectID === -1 ? "Add" : "Update";
        },
        close: close,
    }
})();

export { popUpProject };