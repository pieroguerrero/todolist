import { mainLandingWelcome_Controller } from "../Back/BusinessLogic/mainLandingWelcome_Controller";
import { mainLandingAddTaskPoUp } from "./mainLandingAddTaskPoUp";

const mainLandingWelcome = (function () {

    const divLandingWelcome = document.querySelector(".div-welcome-section");
    const tmpTaskCopy = document.importNode(divLandingWelcome.querySelector("#tmp-tasks-item"), true);
    let dblOWnerUserIdkeep;



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
     * @param {number} dblCurrentUserId 
     * @param {Date} dtDate 
     * @param {number} dblProjectId 
     */
    const loadTasksList = function (dblCurrentUserId, dtDate, dblProjectId) {

        const arrSimpleTasksList = mainLandingWelcome_Controller.getTasksListbyDate(dblCurrentUserId, dtDate, dblProjectId);
        const divWelcomeImage = divLandingWelcome.querySelector(".div-welcome-image");

        if (arrSimpleTasksList.length > 0) {

            divWelcomeImage.classList.add("hidden");

            divLandingWelcome.classList.remove("hidden");

            const ulTasksList = divLandingWelcome.querySelector(".div-welcome-section .div-todo-list ul");
            ulTasksList.replaceChildren();

            const tmpTask = document.importNode(tmpTaskCopy, true).content;
            const fragment = document.createDocumentFragment();

            arrSimpleTasksList.forEach(objSimpleTask => {

                tmpTask.querySelector(".hidden-task-item-id").setAttribute("value", objSimpleTask.dblTaskId.toString());
                tmpTask.querySelector(".p-todo-title").textContent = objSimpleTask.strTaskName;
                tmpTask.querySelector(".p-todo-description").textContent = objSimpleTask.strDescription;
                tmpTask.querySelector(".p-cant-subtasks").textContent = objSimpleTask.intCantSubTasks.toString();

                fragment.appendChild(document.importNode(tmpTask, true));
            });

            ulTasksList.appendChild(fragment);

            //divLandingWelcome.classList.remove("hidden");
        } else {

            divWelcomeImage.classList.remove("hidden");
        }


    };

    return {
        load: function (dblOWnerUserId, dtDate, dblProjectId) {

            dblOWnerUserIdkeep = dblOWnerUserId;

            loadAddTaskButton(dblOWnerUserId, dtDate, dblProjectId);

            loadTasksList(dblOWnerUserId, dtDate, dblProjectId);
        },
        show: function () {

            divLandingWelcome.classList.remove("hidden");
        },
        loadTasksList: loadTasksList,
    }
})();

export { mainLandingWelcome };