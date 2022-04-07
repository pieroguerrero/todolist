import { popUpProject } from "./popUpProject";

const menuTray = (function () {

    const divMenuShade = document.getElementById("div-shade-bg");
    const divMenuExpanded = document.querySelector(".div-menu-expanded");

    const onClickAddProject = function () {

        popUpProject.load();
    };

    return {
        load: function () {

            divMenuShade.classList.toggle("hidden");
            divMenuExpanded.classList.toggle("change");

            const btnAddProject = divMenuExpanded.querySelector("#button-menu-projects-add");
            btnAddProject.onclick = onClickAddProject.bind(btnAddProject);
        },
    }
})();

export { menuTray };