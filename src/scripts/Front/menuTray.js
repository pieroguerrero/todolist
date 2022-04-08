import { popUpProject } from "./popUpProject";
import PubSub from 'pubsub-js';

const menuTray = (function () {

    const divMenuShade = document.getElementById("div-shade-bg");
    const divMenuExpanded = document.querySelector(".div-menu-expanded");
    const tmpProjectCopy = document.importNode(divMenuExpanded.querySelector("#tmp-project-item"), true);

    const onClickAddProject = function () {

        popUpProject.load(-1);
    };

    /**
     * 
     * @param {string} strMessage 
     * @param {{dblId:number, strName:string, intCantOpenTasks:number}[]} arrProjectsFiltered 
     */
    const renderProjectsList = function (strMessage, arrProjectsFiltered) {

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

            if (PubSub.getSubscriptions("MenuTray-LoadProjectsList-Render").length === 0) {

                PubSub.subscribe("MenuTray-LoadProjectsList-Render", renderProjectsList);
            }

            const dblCurrentUserId = 1;
            PubSub.publish("MenuTray-LoadProjectsList-Get", { dblCurrentUserId });
        },
        isOpen: function () {

            return !divMenuExpanded.classList.contains("hidden");
        },
    }
})();

export { menuTray };