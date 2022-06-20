import { mainLandingWelcome_Controller } from "../Front-Logic/BusinessLogic/mainLandingWelcome_Controller";
import { STATUS } from "../Front-Logic/Model/Status";
import { mainLandingAddTaskPoUp } from "./mainLandingAddTaskPoUp";
import { popUpEditTask } from "./popUpEditTask";

const mainLandingWelcome = (function () {
  const divLandingWelcome = document.querySelector(".div-welcome-section");
  const tmpTaskCopy = document.importNode(
    divLandingWelcome.querySelector("#tmp-tasks-item"),
    true
  );
  let strOWnerUserIdkeep = "",
    dtCurrentDateFilter,
    strCurrentProjectFilter = "",
    booPunctualDateFilter,
    booShowOverDueTaskFilter,
    strSearchTermFilter;

  /**
   *
   * @param {string} strOWnerUserId
   * @param {Date} dtDate
   * @param {string} strProjectId
   */
  const loadAddTaskPopUp = function (strOWnerUserId, dtDate, strProjectId) {
    divLandingWelcome.classList.add("hidden");
    mainLandingAddTaskPoUp.load(
      strOWnerUserIdkeep,
      loadTasksList.bind(null, strOWnerUserId, dtDate, strProjectId),
      false
    );
  };

  /**
   *
   * @param {string} strOWnerUserId
   * @param {Date} dtDate
   * @param {string} strProjectId
   */
  const loadAddTaskButton = function (strOWnerUserId, dtDate, strProjectId) {
    const btnAddTask = document.getElementById(
      "button-welcome-section-addtask"
    );
    btnAddTask.onclick = loadAddTaskPopUp.bind(
      btnAddTask,
      strOWnerUserId,
      dtDate,
      strProjectId
    );
  };

  /**
   *
   * @param {string} strTaskId
   */
  const completeTask = function (strTaskId) {
    if (
      mainLandingWelcome_Controller.completeTask(strTaskId).strId.length > 0
    ) {
      const liParent = this.closest(".li-task-item");

      const divCheckBoxs = liParent.querySelector(".div-check-complete");
      divCheckBoxs.classList.add("hidden");
      const btnEdit = liParent.querySelector(".button-todo-list-item");
      btnEdit.classList.add("hidden");
      const pCant = liParent.querySelector(".p-cant-subtasks");
      pCant.classList.add("hidden");

      const divCompletedMark = liParent.querySelector(
        ".div-check-completed-mark"
      );
      divCompletedMark.classList.remove("hidden");

      const ulParent = this.closest("ul");

      liParent.style.opacity = "0";

      window.setTimeout(function removethis() {
        ulParent.removeChild(liParent);
      }, 1800);
    }
  };

  const loadTasksList = function () {
    let arrSimpleTasksList = mainLandingWelcome_Controller.getTasksListbyDate(
      strOWnerUserIdkeep,
      dtCurrentDateFilter,
      strCurrentProjectFilter,
      booPunctualDateFilter,
      booShowOverDueTaskFilter
    );

    if (strSearchTermFilter && strSearchTermFilter.length > 0) {
      arrSimpleTasksList = arrSimpleTasksList.filter(
        (objSimpleTask) =>
          objSimpleTask.strTaskName
            .toLowerCase()
            .includes(strSearchTermFilter.toLowerCase()) ||
          objSimpleTask.strDescription
            .toLowerCase()
            .includes(strSearchTermFilter.toLowerCase())
      );
    }

    const divWelcomeImage =
      divLandingWelcome.querySelector(".div-welcome-image");
    const divWelcomeTaskList =
      divLandingWelcome.querySelector(".div-todo-list");

    if (arrSimpleTasksList.length > 0) {
      divWelcomeImage.classList.add("hidden");
      divWelcomeTaskList.classList.remove("hidden");

      divLandingWelcome.classList.remove("hidden");

      const ulTasksList = divLandingWelcome.querySelector(
        ".div-welcome-section .div-todo-list ul"
      );
      ulTasksList.replaceChildren();

      const fragment = document.createDocumentFragment();

      arrSimpleTasksList.forEach((objSimpleTask) => {
        if (
          objSimpleTask.intStatusId !== STATUS.COMPLETED.id &&
          objSimpleTask.intStatusId !== STATUS.CLOSED.id
        ) {
          const tmpTask = document.importNode(tmpTaskCopy, true).content;

          tmpTask
            .querySelector(".hidden-task-item-id")
            .setAttribute("value", objSimpleTask.strTaskId);
          tmpTask.querySelector(".p-todo-title").textContent =
            objSimpleTask.strTaskName;
          tmpTask.querySelector(".p-todo-description").textContent =
            objSimpleTask.strDescription;
          tmpTask.querySelector(".p-cant-subtasks").textContent =
            objSimpleTask.intCantSubTasks.toString();
          tmpTask.querySelector(".button-todo-list-item").onclick =
            popUpEditTask.load.bind(
              null,
              objSimpleTask.strTaskId,
              strOWnerUserIdkeep,
              null
            );

          const chkCompleteTask = tmpTask.querySelector(
            ".chk-todolist-complete"
          );
          chkCompleteTask.onchange = completeTask.bind(
            chkCompleteTask,
            objSimpleTask.strTaskId
          );

          fragment.appendChild(tmpTask);
        }
      });

      ulTasksList.appendChild(fragment);

      //divLandingWelcome.classList.remove("hidden");
    } else {
      divWelcomeImage.classList.remove("hidden");
      divWelcomeTaskList.classList.add("hidden");
    }
  };

  return {
    /**
     *
     * @param {string} strOWnerUserId
     * @param {Date} dtDate
     * @param {string} strProjectId
     * @param {Boolean} booPunctualDate
     * @param {Boolean} booShowOverDueTask
     * @param {string} strSearchTerm
     */
    load: function (
      strOWnerUserId,
      dtDate,
      strProjectId,
      booPunctualDate,
      booShowOverDueTask,
      strSearchTerm
    ) {
      strOWnerUserIdkeep = strOWnerUserId;
      dtCurrentDateFilter = dtDate;
      strCurrentProjectFilter = strProjectId;
      booPunctualDateFilter = booPunctualDate;
      booShowOverDueTaskFilter = booShowOverDueTask;
      strSearchTermFilter = strSearchTerm;

      loadAddTaskButton(strOWnerUserId, dtDate, strProjectId);

      loadTasksList();

      popUpEditTask.hide();
    },
    show: function () {
      divLandingWelcome.classList.remove("hidden");
    },
    loadTasksList: loadTasksList,
  };
})();

export { mainLandingWelcome };
