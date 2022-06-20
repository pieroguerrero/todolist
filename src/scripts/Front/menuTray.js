import { popUpProject } from "./popUpProject";
import { menuTray_Controller } from "../Front-Logic/BusinessLogic/menuTray_Controller";
import format from "date-fns/format";
import { mainLandingWelcome } from "./mainLandingWelcome";
import { header } from "./header";
import { mainLanding } from "./mainLanding";

const menuTray = (function () {
  const divMenuShade = document.getElementById("div-shade-bg");
  const divMenuExpanded = document.querySelector(".div-menu-expanded");
  const tmpProjectCopy = document.importNode(
    divMenuExpanded.querySelector("#tmp-project-item"),
    true
  );
  let strOWnerUserIdkeep = "";

  const onClickAddProject = function () {
    popUpProject.load("-1");
  };

  /**
   *
   * @param {string} strProjectId
   */
  const onClickProject = function (strProjectId) {
    removeSelectionStyle();
    this.classList.add("bg-[#ececec]", "rounded-lg", "p-2", "font-bold");
  };

  /**
   * @param {Object[]} arrProjectsFiltered
   * @param {string} arrProjectsFiltered.strId
   * @param {string} arrProjectsFiltered.strName
   * @param {number} arrProjectsFiltered.intCantOpenTasks
   * @param {Date} arrProjectsFiltered.dtStartDate
   * @param {Date} arrProjectsFiltered.dtEndDate
   *
   */
  const renderProjectsList = function (arrProjectsFiltered) {
    const ulProjectsList = divMenuExpanded.querySelector(
      "#ul-menu-projectslist"
    );
    let arrChildrenId = [];

    if (ulProjectsList.children.length > 1) {
      arrChildrenId = Array.from(ulProjectsList.children).reduce(
        (prev, curr) => {
          if (curr.id !== "tmp-project-item") {
            prev.push(curr.querySelector(".hid-project-id").value.toString());
          }

          return prev;
        },
        []
      );
    }

    //ulProjectsList.replaceChildren();

    const fragment = document.createDocumentFragment();

    arrProjectsFiltered.forEach((objProjectFiltered) => {
      if (!arrChildrenId.find((strId) => strId === objProjectFiltered.strId)) {
        const tmpProject = document.importNode(tmpProjectCopy, true).content;

        tmpProject
          .querySelector(".hid-project-id")
          .setAttribute("value", objProjectFiltered.strId);
        tmpProject.querySelector(".p-project-name").textContent =
          objProjectFiltered.strName;
        tmpProject.querySelector(".p-project-subtasks-count").textContent =
          objProjectFiltered.intCantOpenTasks.toString();

        const liProjectItem = tmpProject.querySelector(
          ".ul-menu-projectslist-li"
        );
        liProjectItem.addEventListener(
          "click",
          onClickOptionLoad.bind(
            liProjectItem,
            objProjectFiltered.dtStartDate,
            objProjectFiltered.strId,
            false,
            true,
            objProjectFiltered.strName,
            "Project"
          )
        );

        fragment.appendChild(tmpProject);
      }
    });

    ulProjectsList.appendChild(fragment);
  };

  const loadProjectSection = function () {
    const btnAddProject = divMenuExpanded.querySelector(
      "#button-menu-projects-add"
    );
    btnAddProject.onclick = onClickAddProject.bind(btnAddProject);

    loadProjectsList();
  };

  const removeSelectionStyle = function () {
    const arrChildren = Array.from(
      divMenuExpanded.querySelector("#up-menu-options-list").children
    );

    arrChildren.forEach((child) => {
      if (child.id !== "div-menu-custom") {
        child.classList.remove(
          "bg-[#ececec]",
          "rounded-lg",
          "p-2",
          "font-bold"
        );
        if (child.id === "button-menu-custom") {
          child.querySelector("#p-menu-custom-title").textContent =
            "Custom date";
          child.querySelector("#p-menu-custom-count").textContent = "";
        }
      } else {
        child.querySelector("#inputdate-menu-custom-date").value = "";
      }
    });

    const ulProjectsList = divMenuExpanded.querySelector(
      "#ul-menu-projectslist"
    );

    if (ulProjectsList.children.length > 1) {
      Array.from(ulProjectsList.children).forEach((el) => {
        if (el.id !== "tmp-project-item") {
          el.classList.remove("bg-[#ececec]", "rounded-lg", "p-2", "font-bold");
        }
      });
    }
  };

  const onChangeCustomDate = function (divCustomDate, btnCustomDate) {
    divCustomDate.classList.add("hidden");
    btnCustomDate.classList.remove("hidden");

    const dtCustomDate = new Date(
      divCustomDate
        .querySelector("#inputdate-menu-custom-date")
        .value.replace(/-/g, "/")
    );

    removeSelectionStyle();
    btnCustomDate.classList.add(
      "bg-[#ececec]",
      "rounded-lg",
      "p-2",
      "font-bold"
    );

    btnCustomDate.querySelector("#p-menu-custom-title").textContent = format(
      dtCustomDate,
      "dd/MM/yyyy"
    );
    btnCustomDate.querySelector("#p-menu-custom-count").textContent =
      menuTray_Controller.calculateQttyOfTasks(
        "-1",
        dtCustomDate,
        dtCustomDate,
        strOWnerUserIdkeep
      );

    //TODO: load tasks list

    mainLanding.setTitle(format(dtCustomDate, "EEE MMM d"), "Custom date");
    mainLandingWelcome.load(
      strOWnerUserIdkeep,
      dtCustomDate,
      "-1",
      true,
      false,
      ""
    );

    header.onClickHamburguerMenu();
  };

  const loadCustomDateOption = function () {
    const btnCustomDate = divMenuExpanded.querySelector("#button-menu-custom");
    btnCustomDate.onclick = function () {
      this.classList.add("hidden");

      const divCustomDate = divMenuExpanded.querySelector("#div-menu-custom");
      divCustomDate.classList.remove("hidden");

      const inputCustomDate = divCustomDate.querySelector(
        "#inputdate-menu-custom-date"
      );
      inputCustomDate.onchange = onChangeCustomDate.bind(
        inputCustomDate,
        divCustomDate,
        btnCustomDate
      );

      const buttonCancelCustomDate = divCustomDate.querySelector(
        "#button-menu-custom-date-close"
      );
      buttonCancelCustomDate.onclick = function (divCustomDate, btnCustomDate) {
        divCustomDate.classList.add("hidden");
        btnCustomDate.classList.remove("hidden");
      }.bind(null, divCustomDate, btnCustomDate);
    }.bind(btnCustomDate);
  };

  /**
   *
   * @param {Date} dtDate
   * @param {string} strProjectId
   * @param {boolean} booPunctualDate
   * @param {boolean} booShowOverDue
   * @param {string} strTitle
   * @param {string} strDescription
   */
  const onClickOptionLoad = function (
    dtDate,
    strProjectId,
    booPunctualDate,
    booShowOverDue,
    strTitle,
    strDescription
  ) {
    removeSelectionStyle();
    this.classList.add("bg-[#ececec]", "rounded-lg", "p-2", "font-bold");

    mainLanding.setTitle(strTitle, strDescription);
    mainLandingWelcome.load(
      strOWnerUserIdkeep,
      dtDate,
      strProjectId,
      booPunctualDate,
      booShowOverDue,
      ""
    );

    header.onClickHamburguerMenu();
  };

  const loadTodayOption = function () {
    const dtDateFilter = new Date();
    const strProjectIdFilter = "-1";

    const btnOptionToday = divMenuExpanded.querySelector(
      "#button-menu-options-today"
    );

    const pQtty = btnOptionToday.querySelector("#p-menu-today-count");
    pQtty.textContent = menuTray_Controller
      .calculateQttyOfTasks(
        strProjectIdFilter,
        dtDateFilter,
        dtDateFilter,
        strOWnerUserIdkeep
      )
      .toString();

    btnOptionToday.onclick = onClickOptionLoad.bind(
      btnOptionToday,
      new Date(),
      "-1",
      true,
      true,
      "Today",
      format(new Date(), "EEE MMM d")
    );
  };

  const loadUpcomingOption = function () {
    const dtDateFilter = new Date();
    const strProjectIdFilter = "-1";

    const btnOptionUpcoming = divMenuExpanded.querySelector(
      "#button-menu-options-upcoming"
    );

    const pQtty = btnOptionUpcoming.querySelector("#p-menu-upcoming-count");
    pQtty.textContent = menuTray_Controller
      .calculateQttyOfTasks(
        strProjectIdFilter,
        dtDateFilter,
        null,
        strOWnerUserIdkeep
      )
      .toString();

    btnOptionUpcoming.onclick = onClickOptionLoad.bind(
      btnOptionUpcoming,
      new Date(),
      "-1",
      false,
      false,
      "Upcoming",
      "starting " + format(new Date(), "EEE MMM d")
    );
  };

  const loadOptionsSection = function () {
    //TODO: load events and behavior for each option

    loadTodayOption();
    loadUpcomingOption();
    loadCustomDateOption();
  };

  const loadProjectsList = function () {
    const strCurrentUserId = "1";
    const arrSimpleProjecstList =
      menuTray_Controller.getProjectsList(strCurrentUserId);
    renderProjectsList(arrSimpleProjecstList);
  };

  return {
    /**
     *
     * @param {string} strOWnerUserId
     */
    load: function (strOWnerUserId) {
      strOWnerUserIdkeep = strOWnerUserId;

      divMenuShade?.classList.remove("hidden");
      divMenuExpanded?.classList.add("change");

      if (!divMenuShade?.onclick) {
        divMenuShade.onclick = () => {
          header.onClickHamburguerMenu();
        };
      }

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
    goHome: function () {
      removeSelectionStyle();

      const btnOptionUpcoming = divMenuExpanded.querySelector(
        "#button-menu-options-upcoming"
      );
      btnOptionUpcoming.classList.add(
        "bg-[#ececec]",
        "rounded-lg",
        "p-2",
        "font-bold"
      );

      const dtDate = new Date();

      mainLanding.setTitle(
        "Upcoming",
        "starting " + format(dtDate, "EEE MMM d")
      );
      mainLandingWelcome.load(
        strOWnerUserIdkeep,
        dtDate,
        "-1",
        false,
        true,
        ""
      );
    },
  };
})();

export { menuTray };
