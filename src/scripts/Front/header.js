import { menuTray } from "./menuTray";

const header = (function () {

    const onClickHamburguerMenu = function () {

        this.querySelector(".menu_icon").classList.toggle("hidden");
        this.querySelector(".close_icon").classList.toggle("hidden");

        menuTray.load();

        //pubsub.notify(time to load data and in the menu tray)

    }

    const loadHamburguerMenuButton = function () {

        const btnHamburguerMenu = document.getElementById("button-hamburguer-menu");
        btnHamburguerMenu.onclick = onClickHamburguerMenu.bind(btnHamburguerMenu);

    };

    return {
        onPageLoad: function () {

            loadHamburguerMenuButton();
            //load other buttons
            //pubsub.notify(it's headers loading time)
        },
    }
})();

export { header };