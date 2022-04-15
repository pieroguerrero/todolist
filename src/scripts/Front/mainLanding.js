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

            setTitle("Upcoming", "starting " + format(new Date(), "EEE MMM d"));
            mainLandingAddTaskPoUp.hide();

            const btnOptionUpcoming = document.querySelector("#button-menu-options-upcoming");
            btnOptionUpcoming.classList.add("bg-[#ececec]", "rounded-lg", "p-2", "font-bold");

            mainLandingWelcome.load(dblOWnerUserId, new Date, -1, false, true, "");
        },
        setTitle: setTitle,

    }
})();

export { mainLanding };