import format from "date-fns/format";
import { mainLandingAddTaskPoUp } from "./mainLandingAddTaskPoUp";
import { mainLandingWelcome } from "./mainLandingWelcome";

const mainLanding = (function () {

    const setTitle = function (strTitle, strDescription) {


        const pTitle = document.getElementById("p-todolist-title")
        pTitle.textContent = strTitle;

        const pDescription = document.getElementById("p-todolist-description");
        pDescription.textContent = strDescription;
        //pTitle.textContent = format(new Date(), "EEE MMM d");
    };

    return {
        onPageLoad: function (dblOWnerUserId) {

            setTitle("Today", format(new Date(), "EEE MMM d"));
            mainLandingAddTaskPoUp.hide();
            mainLandingWelcome.load(dblOWnerUserId, new Date, -1, true, true);
        },
        setTitle: setTitle,

    }
})();

export { mainLanding };