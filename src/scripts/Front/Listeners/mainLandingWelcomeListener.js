import { mainLandingWelcomeRender } from "../Renders/mainLandingWelcomeRender.js";

const mainLandingWelcomeListener = (function () {

    return {
        // onPageLoad: function () {

        //     mainLandingWelcomeRender.load();
        //     //pubsub.notify(it's headers loading time)
        // },
        onClickAddTaskButton: function () {

            mainLandingWelcomeRender.loadAddTaskPopUp(this);
        },
    }
})();

export { mainLandingWelcomeListener };