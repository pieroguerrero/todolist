import { headerRenders } from "../Renders/headerRender";

const headerListeners = (function () {

    return {
        attachHamburguerMenuClick: function () {

            const btnHamburguerMenu = document.getElementById("button-hamburguer-menu");
            btnHamburguerMenu.onclick = headerRenders.hamburguerMenuClicked;
        },
    }
})();

export { headerListeners };