import { popUpProject } from "./popUpProject";
import { menuTray_Controller } from "../Back/BusinessLogic/menuTray_Controller";
import format from "date-fns/format";
import { mainLandingWelcome } from "./mainLandingWelcome";

const menuTray = (function () {

    const divMenuShade = document.getElementById("div-shade-bg");
    const divMenuExpanded = document.querySelector(".div-menu-expanded");
    const tmpProjectCopy = document.importNode(divMenuExpanded.querySelector("#tmp-project-item"), true);
    let dblOWnerUserIdkeep;

    const onClickAddProject = function () {

        popUpProject.load(-1);
    };

    /**
     * 
     * @param {{dblId:number, strName:string, intCantOpenTasks:number}[]} arrProjectsFiltered 
     */
    const renderProjectsList = function (arrProjectsFiltered) {

        const ulProjectsList = divMenuExpanded.querySelector("#ul-menu-projectslist");

        ulProjectsList.replaceChildren();

        const tmpProject = document.importNode(tmpProjectCopy, true).content;
        const fragment = document.createDocumentFragment();

        arrProjectsFiltered.forEach(objProjectFiltered => {

            tmpProject.querySelector(".hid-project-id").setAttribute("value", objProjectFiltered.dblId.toString());
            tmpProject.querySelector(".p-project-name").textContent = objProjectFiltered.strName;
            tmpProject.querySelector(".p-project-subtasks-count").textContent = objProjectFiltered.intCantOpenTasks.toString();

            fragment.appendChild(document.importNode(tmpProject, true));
        });

        ulProjectsList.appendChild(fragment);
    };

    const loadProjectSection = function () {

        const btnAddProject = divMenuExpanded.querySelector("#button-menu-projects-add");
        btnAddProject.onclick = onClickAddProject.bind(btnAddProject);

        loadProjectsList();
    };

    const removeSelectionStyle = function () {

        const arrChildren = Array.from(divMenuExpanded.querySelector("#up-menu-options-list").children);

        arrChildren.forEach(child => {

            if (child.id !== "div-menu-custom") {
                child.classList.remove("bg-[#ececec]", "rounded-lg", "p-2", "font-bold");
            }

        });
    };

    const onChangeCustomDate = function (divCustomDate, btnCustomDate) {

        divCustomDate.classList.add("hidden");
        btnCustomDate.classList.remove("hidden");

        removeSelectionStyle();
        btnCustomDate.classList.add("bg-[#ececec]", "rounded-lg", "p-2", "font-bold");

        const dtCustomDate = new Date(divCustomDate.querySelector("#inputdate-menu-custom-date").value.replace(/-/g, '\/'));

        btnCustomDate.querySelector("#p-menu-custom-title").textContent = format(dtCustomDate, "dd/MM/yyyy");

        //TODO: load tasks list
        mainLandingWelcome.loadTasksList(dblOWnerUserIdkeep, dtCustomDate, -1);

    };

    const loadCustomDateOption = function () {

        const btnCustomDate = divMenuExpanded.querySelector("#button-menu-custom");
        btnCustomDate.onclick = (function () {

            this.classList.add("hidden");

            const divCustomDate = divMenuExpanded.querySelector("#div-menu-custom");
            divCustomDate.classList.remove("hidden");

            const inputCustomDate = divCustomDate.querySelector("#inputdate-menu-custom-date");
            inputCustomDate.onchange = onChangeCustomDate.bind(inputCustomDate, divCustomDate, btnCustomDate);

            const buttonCancelCustomDate = divCustomDate.querySelector("#button-menu-custom-date-close");
            buttonCancelCustomDate.onclick = (function (divCustomDate, btnCustomDate) {

                divCustomDate.classList.add("hidden");
                btnCustomDate.classList.remove("hidden");
            }).bind(null, divCustomDate, btnCustomDate);

        }).bind(btnCustomDate);
    };

    const loadOptionsSection = function () {

        //TODO: load events and behavior for each option

        loadCustomDateOption();
    };

    const loadProjectsList = function () {

        const dblCurrentUserId = 1;
        const arrSimpleProjecstList = menuTray_Controller.getProjectsList(dblCurrentUserId);
        renderProjectsList(arrSimpleProjecstList);
    }

    return {
        load: function (dblOWnerUserId) {

            dblOWnerUserIdkeep = dblOWnerUserId;

            divMenuShade.classList.remove("hidden");
            divMenuExpanded.classList.add("change");

            loadOptionsSection();
            loadProjectSection();
        },
        loadProjectsList,
        isOpen: function () {

            return divMenuExpanded.classList.contains("change");
        },
        hide: function () {
            divMenuShade.classList.add("hidden");
            divMenuExpanded.classList.remove("change");
        },
    }
})();

export { menuTray };