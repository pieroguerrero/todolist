import { popUpProject } from "./popUpProject";
import { menuTray_Controller } from "../Back/BusinessLogic/menuTray_Controller";

const menuTray = (function () {

    const divMenuShade = document.getElementById("div-shade-bg");
    const divMenuExpanded = document.querySelector(".div-menu-expanded");
    const tmpProjectCopy = document.importNode(divMenuExpanded.querySelector("#tmp-project-item"), true);

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

    return {
        load: function () {

            divMenuShade.classList.toggle("hidden");
            divMenuExpanded.classList.toggle("change");

            const btnAddProject = divMenuExpanded.querySelector("#button-menu-projects-add");
            btnAddProject.onclick = onClickAddProject.bind(btnAddProject);

            this.loadProjectsList();
        },
        loadProjectsList: function () {

            const dblCurrentUserId = 1;
            const arrSimpleProjecstList = menuTray_Controller.getProjectsList(dblCurrentUserId);
            renderProjectsList(arrSimpleProjecstList);
        },
        isOpen: function () {

            return divMenuExpanded.classList.contains("change");
        },
    }
})();

export { menuTray };