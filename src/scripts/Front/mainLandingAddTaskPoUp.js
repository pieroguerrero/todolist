import PubSub, { publish } from 'pubsub-js'
import { mainLandingAddTaskPoUp_Controller } from '../Back/BusinessLogic/mainLandingAddTaskPoUp_Controller';
import { mainLandingWelcome_Controller } from '../Back/BusinessLogic/mainLandingWelcome_Controller';
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
    opChooseProject.label = "-- Choose a project --";
    opChooseProject.classList.add("border-slate-400", "font-light");

    const onCancelPopUpTrue = function () {

    };

    const onCancelPopUpFalse = function () {

        divAddTask.classList.add("hidden");
        mainLandingWelcome.show();
    };

    const onChangeSelect = function () {

        if (this.value === "-1") {
            // @ts-ignore
            popUpProject.load(-1, () => (divAddTask.querySelector("#select-register-todo-project").value = ""));

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
        // @ts-ignore
        selProjectsList.value = "";
        // @ts-ignore
        selProjectsList.onchange = onChangeSelect.bind(selProjectsList);
    };

    const loadProjectsDropDownList = function () {

        if (PubSub.getSubscriptions("MainLandingAddTaskPoUp-Load-RenderProjectsDropDownList").length === 0) {

            PubSub.subscribe("MainLandingAddTaskPoUp-Load-RenderProjectsDropDownList", popuplateDropDownList);
        }

        PubSub.publish("MainLandingAddTaskPoUp-Load-GetProjectsDropDownList", { dblCurrentUserId: dblOWnerUserIdkeep });
    };

    /**
     * 
     * @param {Function} fnSuccessLaterExecution 
     */
    const createNewTask = function (fnSuccessLaterExecution = null) {

        const frmRegisterTask = divAddTask.querySelector(".form-register-todo");

        if (frmRegisterTask.checkValidity()) {

            const objTaskBasic = {
                // @ts-ignore
                dblProjectId: Number(frmRegisterTask.querySelector("#select-register-todo-project").value),
                strName: frmRegisterTask.querySelector("#input-register-todo-title").value,
                strDescription: frmRegisterTask.querySelector("#textarea-register-todo-description").value,
                dtDueDate: new Date(frmRegisterTask.querySelector("#input-register-todo-date").valueAsNumber),
                intPriorityId: Number(frmRegisterTask.querySelector("#select-register-todo-priority").value),
                strLabel: frmRegisterTask.querySelector("#input-register-todo-tag").value,
                dblUserCreatorId: dblOWnerUserIdkeep,
                dblUserOwnerId: dblOWnerUserIdkeep,
            };

            const objResult = mainLandingAddTaskPoUp_Controller.registerNewTask(objTaskBasic.dblProjectId, objTaskBasic.strName, objTaskBasic.strDescription, objTaskBasic.dtDueDate, objTaskBasic.intPriorityId, objTaskBasic.strLabel, objTaskBasic.dblUserOwnerId, objTaskBasic.dblUserCreatorId);

            if (objResult.dblId > 0) {

                alert(objResult.strResult);
                //load the tasks list and, in case needed, close the popup
                if (fnSuccessLaterExecution) {

                    fnSuccessLaterExecution();
                }
            }
        }
    };

    return {
        /**
         * 
         * @param {boolean} onPopUp If true, the form will be shown in a popup, otherwhise will be shown in the main element
         * @param {number} dblCurrentUserId
         * @param {Function} fnNewTasksLaterExecution
         */
        load: function (dblCurrentUserId, fnNewTasksLaterExecution, onPopUp = false) {

            dblOWnerUserIdkeep = dblCurrentUserId;

            divAddTask.classList.remove("hidden");

            const btnCancel = divAddTask.querySelector("#button-form-register-todo-cancel");
            btnCancel.onclick = onPopUp ? onCancelPopUpTrue.bind(btnCancel) : onCancelPopUpFalse.bind(btnCancel);

            const btnSave = divAddTask.querySelector("#button-form-register-todo-add");
            btnSave.onclick = createNewTask.bind(btnSave, fnNewTasksLaterExecution);

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
        /**
         * 
         * @param {number} dblResultId 
         */
        loadProjectsList: loadProjectsDropDownList,
    }
})();

export { mainLandingAddTaskPoUp };