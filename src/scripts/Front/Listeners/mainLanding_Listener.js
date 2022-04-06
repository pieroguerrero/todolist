import { mainLanding_Render } from "../Renders/mainLanding_Render";

const mainLanding_Listener = (function () {

    return {
        onPageLoad: function () {

            mainLanding_Render.load();

        },
    }
})();

export { mainLanding_Listener };