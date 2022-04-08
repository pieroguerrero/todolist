import format from "date-fns/format";
import PubSub from 'pubsub-js';
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
                dtStartDate: new Date(divPopUpProject.querySelector("#date-register-project-startdate").valueAsNumber),
                dtEndDate: new Date(divPopUpProject.querySelector("#date-register-project-enddate").valueAsNumber),
            };

            PubSub.publish("PopupProjectSave", objProjectUI);
        }

    };

    const close = function () {

        if (!divPopUpProject.classList.contains("hidden")) {
            divPopUpProject.classList.add("hidden");
        }
    };

    /**
     * 
     * @param {string} strMessage 
     * @param {string} strResult 
     */
    const saveProjectResult = function (strMessage, strResult) {

        alert(strResult);

        if (strResult !== "error") {

            if (menuTray.isOpen()) {

                menuTray.loadProjectsList();
            } else if (mainLandingAddTaskPoUp.isOpen()) {

                mainLandingAddTaskPoUp.loadProjectsList();
            }

            close();
        }
    };

    return {
        /**
         * 
         * @param {number} intProjectID If -1 it will load the PopUp in registration mode, otherwise will use the Project Id passed to load the correspondant Project data.
         */
        load: function (intProjectID) {

            divPopUpProject.classList.remove("hidden");

            const btnCancel = divPopUpProject.querySelector("#button-form-register-project-cancel");
            btnCancel.onclick = this.close.bind(btnCancel);

            const btnAdd = divPopUpProject.querySelector("#button-form-register-project-add");
            btnAdd.onclick = saveProject.bind(null, intProjectID);
            btnAdd.textContent = intProjectID === -1 ? "Add" : "Update";
        },
        subscribeEvents: function () {

            PubSub.subscribe("PopupProjectSaveResult", saveProjectResult);
        },
        close: close,
    }
})();

export { popUpProject };