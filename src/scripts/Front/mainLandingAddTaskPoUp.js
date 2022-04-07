import PubSub from 'pubsub-js'
import { mainLandingWelcome } from './mainLandingWelcome';

const mainLandingAddTaskPoUp = (function () {

    const divAddTask = document.querySelector(".div-add-todo-form");

    const onCancelPopUpTrue = function () {

    };

    const onCancelPopUpFalse = function () {

        divAddTask.classList.add("hidden");
        mainLandingWelcome.show();
    };

    return {
        /**
         * 
         * @param {boolean} onPopUp If true, the form will be shown in a popup, otherwhise will be shown in the main element
         */
        load: function (onPopUp = false) {

            divAddTask.classList.remove("hidden");

            const btnCancel = divAddTask.querySelector("#button-form-register-todo-cancel");
            btnCancel.onclick = onPopUp ? onCancelPopUpTrue.bind(btnCancel) : onCancelPopUpFalse.bind(btnCancel);

            //pubsub.notify(time to all the data from the modal popup:projects and dates)
            PubSub.publish("main-landing-addtask-load", { clientCurrentDate: new Date() });
        },
        hide: function () {

            if (!divAddTask.classList.contains("hidden")) {
                divAddTask.classList.add("hidden");
            }
        }
    }
})();

export { mainLandingAddTaskPoUp };