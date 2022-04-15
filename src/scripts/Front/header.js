import { mainLanding } from "./mainLanding";
import { mainLandingWelcome } from "./mainLandingWelcome";
import { menuTray } from "./menuTray";

const header = (function () {
    let dblOWnerUserIdkeep;
    const headerElement = document.getElementById("header-options");

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

        const btnHamburguerMenu = headerElement.querySelector("#button-hamburguer-menu");
        btnHamburguerMenu.onclick = onClickHamburguerMenu;

    };

    const loadHomeButton = function () {

        const btnHome = headerElement.querySelector("#button-header-home");
        btnHome.onclick = menuTray.goHome;
    };

    const onKeyDownBoxContent = function () {

        if (this.value.length >= 3) {

            mainLandingWelcome.load(dblOWnerUserIdkeep, new Date(1970, 1, 1), -1, false, true, this.value);
            mainLanding.setTitle("Search", "results");

        } else if (this.value.length === 0) {

            menuTray.goHome();
        }
    };

    const loadSearchButton = function () {

        const btnSearch = headerElement.querySelector("#button-header-search");
        btnSearch.onclick = (function () {

            this.classList.add("hidden");
            const divHeaderSearchbox = headerElement.querySelector("#div-header-searchbox");
            divHeaderSearchbox.classList.remove("hidden");

            const btnCloseSearchBox = headerElement.querySelector("#button-header-search-close");
            btnCloseSearchBox.onclick = (function (btnSearchButton) {

                this.parentElement.classList.add("hidden");
                btnSearchButton.classList.remove("hidden");
            }).bind(btnCloseSearchBox, this);



            const inputSearchBox = headerElement.querySelector("#input-header-search-text");
            inputSearchBox.onkeyup = onKeyDownBoxContent.bind(inputSearchBox);

        }).bind(btnSearch);
    };

    return {
        onPageLoad: function (dblOWnerUserId) {

            dblOWnerUserIdkeep = dblOWnerUserId;
            loadHamburguerMenuButton();
            loadHomeButton();
            loadSearchButton();
            //load other buttons
            //pubsub.notify(it's headers loading time)
        },
        onClickHamburguerMenu: onClickHamburguerMenu,
    }
})();

export { header };