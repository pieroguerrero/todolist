import format from "date-fns/format";
import { mainLandingAddTaskPoUp_Controller } from "../Front-Logic/BusinessLogic/mainLandingAddTaskPoUp_Controller";
import { mainLandingWelcome } from "./mainLandingWelcome";
import { popUpProject } from "./popUpProject";

const mainLandingAddTaskPoUp = (function () {
  const divAddTask = document.querySelector(".div-add-todo-form");
  let strOWnerUserIdkeep = "";

  //creating the New Project option for the dropdown list
  const opNewProject = document.createElement("option");
  opNewProject.value = "-1";
  opNewProject.label = "Create new Project";
  opNewProject.classList.add("italic", "border-slate-400", "font-light");

  const opChooseProject = document.createElement("option");
  opChooseProject.value = "";
  opChooseProject.label = "-- Choose a project --";
  opChooseProject.classList.add("border-slate-400", "font-light");

  const onCancelPopUpTrue = function () {};

  const onCancelPopUpFalse = function () {
    divAddTask.classList.add("hidden");
    mainLandingWelcome.show();
  };

  const onChangeSelect = function () {
    if (this.value === "-1") {
      popUpProject.load(
        "-1",
        () =>
          (divAddTask.querySelector("#select-register-todo-project").value = "")
      );
    }
  };

  const loadProjectsDropDownList = function () {
    const selProjectsList = divAddTask.querySelector(
      "#select-register-todo-project"
    );
    selProjectsList.replaceChildren();

    const fragment = document.createDocumentFragment();

    opChooseProject.selected = true;
    fragment.appendChild(opChooseProject);

    const arrProjectsFiltered =
      mainLandingAddTaskPoUp_Controller.loadProjectsDropDownList(
        strOWnerUserIdkeep
      );

    arrProjectsFiltered.forEach((el) => {
      const opProject = document.createElement("option");
      opProject.value = el.strId;
      opProject.label = el.strName;

      fragment.appendChild(opProject);
    });

    fragment.appendChild(opNewProject);

    selProjectsList.appendChild(fragment);
    // @ts-ignore
    selProjectsList.value = "";
    // @ts-ignore
    selProjectsList.onchange = onChangeSelect.bind(selProjectsList);
  };

  /**
   *
   * @param {Function} fnSuccessLaterExecution
   */
  const createNewTask = function (fnSuccessLaterExecution = null) {
    const frmRegisterTask = divAddTask.querySelector(".form-register-todo");

    if (frmRegisterTask.checkValidity()) {
      const objTaskBasic = {
        strProjectId: frmRegisterTask.querySelector(
          "#select-register-todo-project"
        ).value,
        strName: frmRegisterTask.querySelector("#input-register-todo-title")
          .value,
        strDescription: frmRegisterTask.querySelector(
          "#textarea-register-todo-description"
        ).value,
        dtDueDate: new Date(
          frmRegisterTask
            .querySelector("#input-register-todo-date")
            .value.replace(/-/g, "/")
        ),
        intPriorityId: Number(
          frmRegisterTask.querySelector("#select-register-todo-priority").value
        ),
        strLabel: frmRegisterTask.querySelector("#input-register-todo-tag")
          .value,
        strUserCreatorId: strOWnerUserIdkeep,
        strUserOwnerId: strOWnerUserIdkeep,
      };

      const objResult = mainLandingAddTaskPoUp_Controller.registerNewTask(
        objTaskBasic.strProjectId,
        objTaskBasic.strName,
        objTaskBasic.strDescription,
        objTaskBasic.dtDueDate,
        objTaskBasic.intPriorityId,
        objTaskBasic.strLabel,
        objTaskBasic.strUserOwnerId,
        objTaskBasic.strUserCreatorId
      );

      if (objResult.strId !== "-1") {
        //alert(objResult.strResult);
        //load the tasks list and, in case needed, close the popup
        divAddTask.classList.add("hidden");

        if (fnSuccessLaterExecution) {
          fnSuccessLaterExecution();
        }
      }
    }
  };

  const renderDueDate = function () {
    const dtDueDate = divAddTask.querySelector("#input-register-todo-date");
    dtDueDate.setAttribute("min", format(new Date(), "yyyy-MM-dd"));

    const dtToday = new Date();

    const dliDueDateList = divAddTask.querySelector("#dist-todo-popup-days");
    dliDueDateList.replaceChildren();

    const optToday = document.createElement("option");
    optToday.value = format(dtToday, "yyyy-MM-dd");
    optToday.label = "Today";

    const optTomorrow = document.createElement("option");
    optTomorrow.value = format(
      dtToday.setDate(dtToday.getDate() + 1),
      "yyyy-MM-dd"
    );
    optTomorrow.label = "Tomorrow";

    dliDueDateList.appendChild(optToday);
    dliDueDateList.appendChild(optTomorrow);
  };

  return {
    /**
     *
     * @param {boolean} onPopUp If true, the form will be shown in a popup, otherwhise will be shown in the main element
     * @param {string} strCurrentUserId
     * @param {Function} fnNewTasksLaterExecution
     */
    load: function (
      strCurrentUserId,
      fnNewTasksLaterExecution,
      onPopUp = false
    ) {
      strOWnerUserIdkeep = strCurrentUserId;

      divAddTask.classList.remove("hidden");

      renderDueDate();

      const btnCancel = divAddTask.querySelector(
        "#button-form-register-todo-cancel"
      );
      btnCancel.onclick = onPopUp
        ? onCancelPopUpTrue.bind(btnCancel)
        : onCancelPopUpFalse.bind(btnCancel);

      const btnSave = divAddTask.querySelector(
        "#button-form-register-todo-add"
      );
      btnSave.onclick = createNewTask.bind(btnSave, fnNewTasksLaterExecution);

      loadProjectsDropDownList();
    },
    hide: function () {
      if (!divAddTask.classList.contains("hidden")) {
        divAddTask.classList.add("hidden");
      }
    },
    isOpen: function () {
      return !divAddTask.classList.contains("hidden");
    },
    loadProjectsList: loadProjectsDropDownList,
  };
})();

export { mainLandingAddTaskPoUp };
