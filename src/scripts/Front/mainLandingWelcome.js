import { mainLandingAddTaskPoUp } from "./mainLandingAddTaskPoUp";

const mainLandingWelcome = (function () {

    const divLandingWelcome = document.querySelector(".div-welcome-section");

    const loadAddTaskPopUp = function () {

        divLandingWelcome.classList.add("hidden");
        mainLandingAddTaskPoUp.load();
    };

    const loadAddTaskButton = function () {

        const btnAddTask = document.getElementById("button-welcome-section-addtask");
        btnAddTask.onclick = loadAddTaskPopUp.bind(btnAddTask);
    };

    return {
        load: function () {

            loadAddTaskButton();
            //load the list of projects if any
        },
        show: function () {

            divLandingWelcome.classList.remove("hidden");
        },
    }
})();

export { mainLandingWelcome };