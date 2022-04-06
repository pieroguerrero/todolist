import { headerListener } from "../Listeners/headerListener";

const headerRender = (function () {

    const loadHamburguerMenuButton = function () {

        const btnHamburguerMenu = document.getElementById("button-hamburguer-menu");
        btnHamburguerMenu.onclick = headerListener.onClickHamburguerMenu.bind(btnHamburguerMenu);
    };

    return {
        load: function () {

            loadHamburguerMenuButton();
        },
        loadMenuTray: function (btnHamburguerMenu) {

            btnHamburguerMenu.querySelector(".menu_icon").classList.toggle("hidden");
            btnHamburguerMenu.querySelector(".close_icon").classList.toggle("hidden");

            document.getElementById("div-shade-bg").classList.toggle("hidden");

            const divMenuExpanded = document.querySelector(".div-menu-expanded");
            divMenuExpanded.classList.toggle("change");

            //pubsub.notify(time to load data and in the menu tray)
        },
    }
})();

export { headerRender };