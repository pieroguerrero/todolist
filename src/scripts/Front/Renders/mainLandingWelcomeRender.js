import { mainLandingWelcomeListener } from "../Listeners/mainLandingWelcomeListener.js";

import { mainLandingAddTaskPoUp_Render } from "./mainLandingAddTaskPoUp_Render.js";

const mainLandingWelcomeRender = (function () {

    const divLandingWelcome = document.querySelector(".div-welcome-section");

    const loadAddTaskButton = function () {

        const btnAddTask = document.getElementById("button-welcome-section-addtask");
        btnAddTask.onclick = mainLandingWelcomeListener.onClickAddTaskButton.bind(btnAddTask);
    };

    return {
        load: function () {

            loadAddTaskButton();
            //load the list of projects if any
        },
        loadAddTaskPopUp: function (btnAddTask) {

            divLandingWelcome.classList.add("hidden");
            mainLandingAddTaskPoUp_Render.load();
        },
    }
})();

export { mainLandingWelcomeRender };