import { mainLandingWelcome_Controller } from "../Back/BusinessLogic/mainLandingWelcome_Controller";
import { STATUS } from "../Back/Model/Status";
import { mainLandingAddTaskPoUp } from "./mainLandingAddTaskPoUp";
import { popUpEditTask } from "./popUpEditTask";

const mainLandingWelcome = (function () {

    const divLandingWelcome = document.querySelector(".div-welcome-section");
    const tmpTaskCopy = document.importNode(divLandingWelcome.querySelector("#tmp-tasks-item"), true);
    let dblOWnerUserIdkeep, dtCurrentDateFilter, dblCurrentProjectFilter, booPunctualDateFilter, booShowOverDueTaskFilter, strSearchTermFilter;



    const loadAddTaskPopUp = function (dblOWnerUserId, dtDate, dblProjectId) {

        divLandingWelcome.classList.add("hidden");
        mainLandingAddTaskPoUp.load(dblOWnerUserIdkeep, loadTasksList.bind(null, dblOWnerUserId, dtDate, dblProjectId), false);
    };

    const loadAddTaskButton = function (dblOWnerUserId, dtDate, dblProjectId) {

        const btnAddTask = document.getElementById("button-welcome-section-addtask");
        btnAddTask.onclick = loadAddTaskPopUp.bind(btnAddTask, dblOWnerUserId, dtDate, dblProjectId);
    };

    /**
     * 
     * @param {number} dblTaskId 
     */
    const completeTask = function (dblTaskId) {

        if (mainLandingWelcome_Controller.completeTask(dblTaskId).dblId > 0) {

            const liParent = this.closest(".li-task-item");
            this.closest("ul").removeChild(liParent);
        }
    }

    const loadTasksList = function () {

        let arrSimpleTasksList = mainLandingWelcome_Controller.getTasksListbyDate(dblOWnerUserIdkeep, dtCurrentDateFilter, dblCurrentProjectFilter, booPunctualDateFilter, booShowOverDueTaskFilter);

        if (strSearchTermFilter && strSearchTermFilter.length > 0) {

            arrSimpleTasksList = arrSimpleTasksList.filter(objSimpleTask => (objSimpleTask.strTaskName.toLowerCase().includes(strSearchTermFilter.toLowerCase()) || objSimpleTask.strDescription.toLowerCase().includes(strSearchTermFilter.toLowerCase())));
        }

        const divWelcomeImage = divLandingWelcome.querySelector(".div-welcome-image");
        const divWelcomeTaskList = divLandingWelcome.querySelector(".div-todo-list");


        if (arrSimpleTasksList.length > 0) {

            divWelcomeImage.classList.add("hidden");
            divWelcomeTaskList.classList.remove("hidden");

            divLandingWelcome.classList.remove("hidden");

            const ulTasksList = divLandingWelcome.querySelector(".div-welcome-section .div-todo-list ul");
            ulTasksList.replaceChildren();


            const fragment = document.createDocumentFragment();

            arrSimpleTasksList.forEach(objSimpleTask => {

                if (objSimpleTask.intStatusId !== STATUS.COMPLETED.id && objSimpleTask.intStatusId !== STATUS.CLOSED.id) {

                    const tmpTask = document.importNode(tmpTaskCopy, true).content;

                    tmpTask.querySelector(".hidden-task-item-id").setAttribute("value", objSimpleTask.dblTaskId.toString());
                    tmpTask.querySelector(".p-todo-title").textContent = objSimpleTask.strTaskName;
                    tmpTask.querySelector(".p-todo-description").textContent = objSimpleTask.strDescription;
                    tmpTask.querySelector(".p-cant-subtasks").textContent = objSimpleTask.intCantSubTasks.toString();
                    tmpTask.querySelector(".button-todo-list-item").onclick = popUpEditTask.load.bind(null, objSimpleTask.dblTaskId, dblOWnerUserIdkeep, null);

                    const chkCompleteTask = tmpTask.querySelector(".chk-todolist-complete");
                    chkCompleteTask.onchange = completeTask.bind(chkCompleteTask, objSimpleTask.dblTaskId);

                    fragment.appendChild(tmpTask);
                }
            });

            ulTasksList.appendChild(fragment);

            //divLandingWelcome.classList.remove("hidden");
        } else {

            divWelcomeImage.classList.remove("hidden");
            divWelcomeTaskList.classList.add("hidden");

        }


    };

    return {
        /**
         * 
         * @param {number} dblOWnerUserId 
         * @param {Date} dtDate 
         * @param {number} dblProjectId 
         * @param {Boolean} booPunctualDate 
         * @param {Boolean} booShowOverDueTask 
         * @param {string} strSearchTerm
         */
        load: function (dblOWnerUserId, dtDate, dblProjectId, booPunctualDate, booShowOverDueTask, strSearchTerm) {

            dblOWnerUserIdkeep = dblOWnerUserId;
            dtCurrentDateFilter = dtDate;
            dblCurrentProjectFilter = dblProjectId;
            booPunctualDateFilter = booPunctualDate;
            booShowOverDueTaskFilter = booShowOverDueTask;
            strSearchTermFilter = strSearchTerm;

            loadAddTaskButton(dblOWnerUserId, dtDate, dblProjectId);

            loadTasksList();

            popUpEditTask.hide();
        },
        show: function () {

            divLandingWelcome.classList.remove("hidden");
        },
        loadTasksList: loadTasksList,

    }
})();

export { mainLandingWelcome };