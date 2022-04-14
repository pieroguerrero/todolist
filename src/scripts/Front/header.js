import { menuTray } from "./menuTray";

const header = (function () {
    let dblOWnerUserIdkeep;

    const onClickHamburguerMenu = function () {

        const btnHamburguerMenu = document.getElementById("button-hamburguer-menu");
        const svgMenuIcon = btnHamburguerMenu.querySelector(".menu_icon");
        const svgCloseIcon = btnHamburguerMenu.querySelector(".close_icon");

        if (svgCloseIcon.classList.contains("hidden")) {

            menuTray.load(dblOWnerUserIdkeep);
        } else {

            menuTray.hide();
        }

        svgMenuIcon.classList.toggle("hidden");
        svgCloseIcon.classList.toggle("hidden");
    }

    const loadHamburguerMenuButton = function () {

        const btnHamburguerMenu = document.getElementById("button-hamburguer-menu");
        btnHamburguerMenu.onclick = onClickHamburguerMenu;

    };

    return {
        onPageLoad: function (dblOWnerUserId) {

            dblOWnerUserIdkeep = dblOWnerUserId;
            loadHamburguerMenuButton();
            //load other buttons
            //pubsub.notify(it's headers loading time)
        },
        onClickHamburguerMenu: onClickHamburguerMenu,
    }
})();

export { header };