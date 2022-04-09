import PubSub from 'pubsub-js'
import { mainLandingWelcome } from './mainLandingWelcome';
import { popUpProject } from './popUpProject';

const mainLandingAddTaskPoUp = (function () {

    const divAddTask = document.querySelector(".div-add-todo-form");
    let dblOWnerUserIdkeep;

    //creating the New Project option for the dropdown list 
    const opNewProject = document.createElement("option");
    opNewProject.value = "-1";
    opNewProject.label = "Create new Project";
    opNewProject.classList.add("italic", "border-slate-400", "font-light");

    const opChooseProject = document.createElement("option");
    opChooseProject.value = "";
    opChooseProject.label = "--Choose a project--";
    opChooseProject.classList.add("border-slate-400", "font-light");

    const onCancelPopUpTrue = function () {

    };

    const onCancelPopUpFalse = function () {

        divAddTask.classList.add("hidden");
        mainLandingWelcome.show();
    };

    const onChangeSelect = function () {

        if (this.value === "-1") {
            popUpProject.load(-1, loadProjectsDropDownList);
        }
    };

    /**
     * 
     * @param {string} strMessage 
     * @param {object[]} arrProjectsFiltered 
     */
    const popuplateDropDownList = function (strMessage, arrProjectsFiltered) {

        const selProjectsList = divAddTask.querySelector("#select-register-todo-project");
        selProjectsList.replaceChildren();

        const fragment = document.createDocumentFragment();

        opChooseProject.selected = true;
        fragment.appendChild(opChooseProject);

        arrProjectsFiltered.forEach(el => {

            const opProject = document.createElement("option");
            opProject.value = el.dblId.toString();
            opProject.label = el.strName;

            fragment.appendChild(opProject);
        });

        //opNewProject.onclick = popUpProject.load.bind(-1);

        fragment.appendChild(opNewProject);

        selProjectsList.appendChild(fragment);
        selProjectsList.onchange = onChangeSelect.bind(selProjectsList);
    };

    const loadProjectsDropDownList = function () {

        if (PubSub.getSubscriptions("MainLandingAddTaskPoUp-Load-RenderProjectsDropDownList").length === 0) {

            PubSub.subscribe("MainLandingAddTaskPoUp-Load-RenderProjectsDropDownList", popuplateDropDownList);
        }

        PubSub.publish("MainLandingAddTaskPoUp-Load-GetProjectsDropDownList", { dblCurrentUserId: dblOWnerUserIdkeep });
    };

    return {
        /**
         * 
         * @param {boolean} onPopUp If true, the form will be shown in a popup, otherwhise will be shown in the main element
         * @param {number} dblCurrentUserId
         */
        load: function (dblCurrentUserId, onPopUp = false) {

            dblOWnerUserIdkeep = dblCurrentUserId;

            divAddTask.classList.remove("hidden");

            const btnCancel = divAddTask.querySelector("#button-form-register-todo-cancel");
            btnCancel.onclick = onPopUp ? onCancelPopUpTrue.bind(btnCancel) : onCancelPopUpFalse.bind(btnCancel);

            loadProjectsDropDownList();
        },
        hide: function () {

            if (!divAddTask.classList.contains("hidden")) {
                divAddTask.classList.add("hidden");
            }
        },
        isOpen: function () {

            return !divAddTask.classList.contains("hidden");
        },
        //loadProjectsList: loadProjectsList,
    }
})();

export { mainLandingAddTaskPoUp };