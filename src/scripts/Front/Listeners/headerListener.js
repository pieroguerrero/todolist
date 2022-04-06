import { headerRender } from "../Renders/headerRender";

const headerListener = (function () {

    return {
        onPageLoad: function () {

            headerRender.load();
            //pubsub.notify(it's headers loading time)
        },
        onClickHamburguerMenu: function () {

            headerRender.loadMenuTray(this);

        },
    }
})();

export { headerListener };