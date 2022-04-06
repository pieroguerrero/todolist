import { headerRender } from "../Renders/headerRender";

const headerListener = (function () {

    return {
        onPageLoad: function () {

            headerRender.load();
            //pubsub.notify(it's headers loading time)
        },
        onClickHamburguerMenu: function () {

            headerRender.onClickHamburguerMenu(this);
            //pubsub.notify(time to show the menu)
        },
    }
})();

export { headerListener };