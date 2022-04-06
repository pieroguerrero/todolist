import { mainLandingAddTaskPoUp_Render } from "./mainLandingAddTaskPoUp_Render";
import { mainLandingWelcomeRender } from "./mainLandingWelcomeRender";
import format from 'date-fns/format';

const mainLanding_Render = (function () {

    const loadTitleDiv = function () {

        const pTitle = document.getElementById("p-todolist-description");
        pTitle.textContent = format(new Date(), "EEE MMM d");
    };

    return {

        load: function () {

            loadTitleDiv();
            mainLandingAddTaskPoUp_Render.hide();
            mainLandingWelcomeRender.load();
        },
    }
})();

export { mainLanding_Render };