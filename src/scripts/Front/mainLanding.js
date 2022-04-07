import format from "date-fns/format";
import { mainLandingAddTaskPoUp } from "./mainLandingAddTaskPoUp";
import { mainLandingWelcome } from "./mainLandingWelcome";

const mainLanding = (function () {

    const loadTitleDiv = function () {

        const pTitle = document.getElementById("p-todolist-description");
        pTitle.textContent = format(new Date(), "EEE MMM d");
    };

    return {
        onPageLoad: function () {

            loadTitleDiv();
            mainLandingAddTaskPoUp.hide();
            mainLandingWelcome.load();
        },
    }
})();

export { mainLanding };