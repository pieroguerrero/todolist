import format from "date-fns/format";
import { popUpEditTask_Controller } from "../Back/BusinessLogic/popUpEditTask_Controller";
import { createNoteDAO } from "../Back/DataAccess/NoteDAO";
import { STATUS } from "../Back/Model/Status";
import { mainLandingWelcome } from "./mainLandingWelcome";

const popUpEditTask = (function () {

    const divPopUpEditTask = document.getElementById("div-popup-edit-task");
    const tmpSubTaskCopy = document.importNode(divPopUpEditTask.querySelector("#tmp-popup-subtask-item"), true);
    const tmpNoteCopy = document.importNode(divPopUpEditTask.querySelector("#tmp-popup-note-item"), true);
    let dblOWnerUserIdkeep;

    const opNewProject = document.createElement("option");
    opNewProject.value = "-1";
    opNewProject.label = "Create new Project";
    opNewProject.classList.add("italic", "border-slate-400", "font-light");

    const opChooseProject = document.createElement("option");
    opChooseProject.value = "";
    opChooseProject.label = "-- Choose a project --";
    opChooseProject.classList.add("border-slate-400", "font-light");


    const initializeTabs = function () {

        let tabsContainer = divPopUpEditTask.querySelector("#ul-popup-edit-task-tabs");
        let tabTogglers = tabsContainer.querySelectorAll("a");

        tabTogglers.forEach((toggler) => toggler.addEventListener("click", function (e) {

            e.preventDefault();

            let tabName = this.getAttribute("href");
            let tabContents = document.querySelector("#div-popup-edi-task-contents");

            for (let i = 0; i < tabContents.children.length; i++) {

                tabTogglers[i].parentElement.classList.remove("border-t", "border-r", "border-l", "-mb-px", "bg-white"); tabContents.children[i].classList.remove("hidden");
                if ("#" + tabContents.children[i].id === tabName) {
                    continue;
                }
                tabContents.children[i].classList.add("hidden");

            }

            e.target.parentElement.classList.add("border-t", "border-r", "border-l", "-mb-px", "bg-white");
        }));
    };

    const completeSubTask = function (dblSubTaskId) {

        if (popUpEditTask_Controller.completeSubTask(dblSubTaskId).dblId > 0) {

            const liParent = this.closest(".li-popup-edit-task-subtask-item");
            this.closest("ul").removeChild(liParent);
        }
    };

    /**
     * 
     * @param {number} dblTaskId 
     */
    const loadSubTasks = function (dblTaskId) {

        const ulSubTasksList = divPopUpEditTask.querySelector("#ul-popup-edi-task-contents-subtaskslist");

        const arrSubTasksList = popUpEditTask_Controller.getSubTasksByTask(dblTaskId);

        if (arrSubTasksList.length > 0) {

            ulSubTasksList.classList.remove("hidden");

            ulSubTasksList.replaceChildren();

            const fragment = document.createDocumentFragment();

            arrSubTasksList.forEach(objSimpleSubTask => {

                if (objSimpleSubTask.intStatusId !== STATUS.COMPLETED.id && objSimpleSubTask.intStatusId !== STATUS.CLOSED.id) {
                    const tmpSubTask = document.importNode(tmpSubTaskCopy, true).content;

                    tmpSubTask.querySelector(".hidden-tab-subtask-item-id").value = objSimpleSubTask.dblId.toString();
                    tmpSubTask.querySelector(".p-subtask-tab-title").textContent = objSimpleSubTask.strName.toString();
                    tmpSubTask.querySelector(".p-subtask-tab-description").textContent = objSimpleSubTask.strDescription.toString();

                    const chkComplete = tmpSubTask.querySelector(".chk-tab-subtask-complete");
                    chkComplete.onchange = completeSubTask.bind(chkComplete, objSimpleSubTask.dblId);

                    //TODO: assign the event to open and edit the subtask.

                    fragment.appendChild(tmpSubTask);
                }

            });

            ulSubTasksList.appendChild(fragment);
        } else {

            ulSubTasksList.classList.add("hidden");
        }
    };

    const deleteNote = function (dblNoteId) {

        if (popUpEditTask_Controller.deleteNote(dblNoteId).dblId > 0) {

            const liParent = this.closest(".li-popup-note-list-item");
            this.closest("ul").removeChild(liParent);
        }
    };

    /**
     * 
     * @param {number} dblTaskId 
     */
    const loadNotes = function (dblTaskId) {

        const ulNotessList = divPopUpEditTask.querySelector("#ul-popup-note-list");
        const divNoteEmtpy = divPopUpEditTask.querySelector("#div-popup-note-empty");
        const arrSimpleNotesList = popUpEditTask_Controller.getNotesByTask(dblTaskId);

        if (arrSimpleNotesList.length > 0) {

            divNoteEmtpy.classList.add("hidden");
            ulNotessList.classList.remove("hidden");
            ulNotessList.replaceChildren();

            const fragment = document.createDocumentFragment();

            arrSimpleNotesList.forEach(objSimpleNote => {

                const tmpNote = document.importNode(tmpNoteCopy, true).content;

                tmpNote.querySelector(".hidden-tab-note-item-id").value = objSimpleNote.dblId.toString();
                tmpNote.querySelector(".p-note-tab-date").textContent = objSimpleNote.strDate;
                tmpNote.querySelector(".p-note-tab-description").textContent = objSimpleNote.strComment;

                const btnDeleteNote = tmpNote.querySelector(".btn-tab-note-complete");
                btnDeleteNote.onclick = deleteNote.bind(btnDeleteNote, objSimpleNote.dblId);

                fragment.appendChild(tmpNote);
            });

            ulNotessList.appendChild(fragment);
        } else {

            ulNotessList.classList.add("hidden");
            divNoteEmtpy.classList.remove("hidden");
        }

    };

    const saveSubTask = function (dblTaskId, dblSubtaskId) {

        const frmSubTask = divPopUpEditTask.querySelector("#form-popup-create-subtask");

        const strNewName = frmSubTask.querySelector("#input-popup-create-subtask-title").value;
        const strNewDescription = frmSubTask.querySelector("#textarea-popup-edit-task-description").value;
        const dtNewDueDate = new Date(frmSubTask.querySelector("#input-popup-edit-task-date").value.replace(/-/g, '\/'));

        const objResult = popUpEditTask_Controller.addSubTask(dblSubtaskId, dblTaskId, strNewName, strNewDescription, dtNewDueDate, dblOWnerUserIdkeep);

        if (objResult.dblId > 0) {

            loadSubTasks(dblTaskId);

            frmSubTask.classList.add("hidden");
            divPopUpEditTask.querySelector("#button-popup-edi-task-contents-add-subtask").classList.remove("hidden");

            const ulSubTasksList = divPopUpEditTask.querySelector("#ul-popup-edi-task-contents-subtaskslist");
            ulSubTasksList.classList.remove("hidden");
        }

    };

    const loadSubTaskPopUp = function (dblTaskId) {

        const frmCreateSubTask = divPopUpEditTask.querySelector("#form-popup-create-subtask");
        frmCreateSubTask.classList.remove("hidden");
        frmCreateSubTask.reset();

        //limit the Subt-task DueDate setting min date as today and max date as the Task's duedate.

        const btnCancel = divPopUpEditTask.querySelector("#button-form-create-subtask-cancel");
        btnCancel.onclick = (function () {

            divPopUpEditTask.querySelector("#form-popup-create-subtask").classList.add("hidden");
            divPopUpEditTask.querySelector("#button-popup-edi-task-contents-add-subtask").classList.remove("hidden")

            const ulSubTasksList = divPopUpEditTask.querySelector("#ul-popup-edi-task-contents-subtaskslist");
            ulSubTasksList.classList.remove("hidden");

        }).bind(btnCancel);

        const btnAdd = divPopUpEditTask.querySelector("#button-form-create-subtask-add");
        btnAdd.onclick = saveSubTask.bind(btnAdd, dblTaskId, -1);



    };

    const loadFirstTab = function (dblTaskId) {
        //TODO: Load First Tab: hide the popup to register subtasks, assign events and load subtasks

        divPopUpEditTask.querySelector("#form-popup-create-subtask").classList.add("hidden");

        const btnAddSubTask = divPopUpEditTask.querySelector("#button-popup-edi-task-contents-add-subtask");
        btnAddSubTask.onclick = (function (dblTaskId) {

            this.classList.add("hidden");
            const ulSubTasksList = divPopUpEditTask.querySelector("#ul-popup-edi-task-contents-subtaskslist");
            ulSubTasksList.classList.add("hidden");

            loadSubTaskPopUp(dblTaskId);
        }).bind(btnAddSubTask, dblTaskId);

        loadSubTasks(dblTaskId);
    };

    /**
     * 
     * @param {number} dblTaskId 
     */
    const saveNote = function (dblTaskId) {

        const objResult = popUpEditTask_Controller.saveNote(-1, dblTaskId, format(new Date(), "dd/MM/yyyy hh:mm"), divPopUpEditTask.querySelector("#texarea-popup-subtask-note-comment").value, dblOWnerUserIdkeep);

        if (objResult.dblId > 0) {

            loadNotes(dblTaskId);
        }
    };

    const loadSecondTab = function (dblTaskId) {
        //Load Second Tab: load notes

        const btnSaveNote = divPopUpEditTask.querySelector("#button-popup-subtask-note-add");
        btnSaveNote.onclick = saveNote.bind(null, dblTaskId);

        loadNotes(dblTaskId);
    };

    const loadTabs = function (dblTaskId) {

        initializeTabs();
        loadFirstTab(dblTaskId);
        loadSecondTab(dblTaskId);
    };


    const loadProjectsDropDownList = function (dblSelectedProjectId) {

        const selProjectsList = divPopUpEditTask.querySelector("#select-popup-edit-task-project");
        selProjectsList.replaceChildren();

        const fragment = document.createDocumentFragment();

        opChooseProject.selected = true;
        fragment.appendChild(opChooseProject);

        const arrProjectsFiltered = popUpEditTask_Controller.loadProjectsDropDownList(dblOWnerUserIdkeep);

        arrProjectsFiltered.forEach(el => {

            const opProject = document.createElement("option");
            opProject.value = el.dblId.toString();
            opProject.label = el.strName;

            fragment.appendChild(opProject);
        });

        fragment.appendChild(opNewProject);

        selProjectsList.appendChild(fragment);

        selProjectsList.value = dblSelectedProjectId.toString();
        //selProjectsList.onchange = onChangeSelect.bind(selProjectsList);

    };

    /**
     * 
     * @param {Date} dtDueDateValue 
     */
    const loadDueDate = function (dtDueDateValue) {

        const dtDueDate = divPopUpEditTask.querySelector("#input-popup-edit-task-date");
        //dtDueDate.setAttribute("min", format(new Date(), "yyyy-MM-dd"));

        const dtToday = new Date();

        const optToday = document.createElement("option");
        optToday.value = format(dtToday, "yyyy-MM-dd");
        optToday.label = "Today";

        const optTomorrow = document.createElement("option");
        optTomorrow.value = format(dtToday.setDate(dtToday.getDate() + 1), "yyyy-MM-dd");
        optTomorrow.label = "Tomorrow";

        const dliDueDateList = divPopUpEditTask.querySelector("#dist-popup-edit-task-days");
        dliDueDateList.replaceChildren();
        dliDueDateList.appendChild(optToday);
        dliDueDateList.appendChild(optTomorrow);

        dtDueDate.value = format(dtDueDateValue, "yyyy-MM-dd")
    };

    const cancelMainEditInfo = function () {

        divPopUpEditTask.querySelector("#div-popup-edit-task-fields-view").classList.remove("hidden");
        divPopUpEditTask.querySelector("#form-popup-edit-task-fields-edit").classList.add("hidden");

        divPopUpEditTask.querySelector("#div-popup-edit-task-tabs").classList.remove("hidden");
    };

    const editTask = function (dblTaskId) {

        const frmEditTask = divPopUpEditTask.querySelector("#form-popup-edit-task-fields-edit");

        if (frmEditTask.checkValidity()) {

            const objTaskBasic = {

                dblId: dblTaskId,
                strName: frmEditTask.querySelector("#input-popup-edit-task-title").value,
                strDescription: frmEditTask.querySelector("#textarea-popup-edit-task-description").value,
                dtDueDate: new Date(frmEditTask.querySelector("#input-popup-edit-task-date").value.replace(/-/g, '\/')),
                intPriorityId: Number(frmEditTask.querySelector("#select-popup-edit-task-priority").value),
                strLabel: frmEditTask.querySelector("#input-popup-edit-task-tag").value,
                dblUserOwnerId: dblOWnerUserIdkeep,
            };

            const objResult = popUpEditTask_Controller.editTask(objTaskBasic.dblId, objTaskBasic.strName, objTaskBasic.strDescription, objTaskBasic.dtDueDate, objTaskBasic.dblUserOwnerId, objTaskBasic.intPriorityId, objTaskBasic.strLabel);

            if (objResult.dblId === dblTaskId) {

                //alert(objResult.strResult);
                //load the tasks list and, in case needed, close the popup
                divPopUpEditTask.querySelector("#form-popup-edit-task-fields-edit").classList.add("hidden");
                loadMainInfo(dblTaskId);
                divPopUpEditTask.querySelector("#div-popup-edit-task-tabs").classList.remove("hidden");
            }
        }
    };

    /**
     * 
     * @param {object} objTaskInfo 
     */
    const loadMainInfoEdit = function (objTaskInfo) {

        const frmPopUpEditTask = divPopUpEditTask.querySelector("#form-popup-edit-task-fields-edit");
        frmPopUpEditTask.classList.remove("hidden");

        frmPopUpEditTask.querySelector(".p-popup-edit-task-project-readonly").textContent = objTaskInfo.strProjectName;
        frmPopUpEditTask.querySelector("#input-popup-edit-task-title").value = objTaskInfo.strName;
        frmPopUpEditTask.querySelector("#textarea-popup-edit-task-description").value = objTaskInfo.strDescription;
        loadDueDate(objTaskInfo.dtDueDate);
        frmPopUpEditTask.querySelector("#select-popup-edit-task-priority").value = objTaskInfo.intPriorityId;
        frmPopUpEditTask.querySelector("#input-popup-edit-task-tag").value = objTaskInfo.strLabel;

        frmPopUpEditTask.querySelector("#button-form-popup-edit-task-cancel").onclick = cancelMainEditInfo;
        frmPopUpEditTask.querySelector("#button-form-popup-edit-task-save").onclick = editTask.bind(null, objTaskInfo.dblId);
    };

    /**
     * 
     * @param {number} dblTaskId 
     */
    const completeTask = function (dblTaskId) {

        if (popUpEditTask_Controller.completeTask(dblTaskId).dblId > 0) {

            divPopUpEditTask.classList.add("hidden");
            mainLandingWelcome.loadTasksList();
        }
    }

    /**
     * 
     * @param {number} dblTaskId 
     */
    const loadMainInfo = function (dblTaskId) {

        divPopUpEditTask.querySelector("#div-popup-edit-task-fields-view").classList.remove("hidden");

        const objTaskInfo = popUpEditTask_Controller.getTaskInfo(dblTaskId);

        const btnEditInfo = divPopUpEditTask.querySelector("#button-popup-edit-task-save");

        btnEditInfo.querySelector(".p-popup-edit-task-title").textContent = objTaskInfo.strName;
        btnEditInfo.querySelector(".p-popup-edit-task-description").textContent = objTaskInfo.strDescription;
        btnEditInfo.querySelector(".p-popup-edit-task-project").textContent = objTaskInfo.strProjectName;
        btnEditInfo.querySelector(".p-popup-edit-task-duedate").textContent = format(objTaskInfo.dtDueDate, "dd/MM/yyyy");

        const strPriorityName = objTaskInfo.intPriorityId === 4 ? "⚪ No Priority" :
            (objTaskInfo.intPriorityId === 3 ? "🟡 Low Priority" :
                (objTaskInfo.intPriorityId === 2 ? "🟠 Medium Priority" : "🔴 High Priority"));

        btnEditInfo.querySelector(".p-popup-edit-task-priority").textContent = strPriorityName;
        btnEditInfo.querySelector(".p-popup-edit-task-label").textContent = objTaskInfo.strLabel;

        const chkCompleteTask = divPopUpEditTask.querySelector("#chk-popup-edit-task-complete");
        chkCompleteTask.checked = false;
        chkCompleteTask.onchange = completeTask.bind(chkCompleteTask, objTaskInfo.dblId);

        btnEditInfo.onclick = (function (objTaskInfo) {

            divPopUpEditTask.querySelector("#div-popup-edit-task-fields-view").classList.add("hidden");
            divPopUpEditTask.querySelector("#div-popup-edit-task-tabs").classList.add("hidden");

            loadMainInfoEdit(objTaskInfo);
        }).bind(btnEditInfo, objTaskInfo);


        //loadMainInfoEdit.bind(btnEditInfo, objTaskInfo);
    };

    return {

        /**
         * 
         * @param {Function} fncCloseLaterExecution 
         * @param {number} dblTaskId
         */
        load: function (dblTaskId, dblCurrentUserId, fncCloseLaterExecution = null) {

            dblOWnerUserIdkeep = dblCurrentUserId;

            const btnClose = divPopUpEditTask.querySelector("#button-popup-task-edit-close");
            btnClose.onclick = function () {
                divPopUpEditTask.classList.add("hidden");
            };

            divPopUpEditTask.querySelector("#form-popup-edit-task-fields-edit").classList.add("hidden");

            loadMainInfo(dblTaskId);
            loadTabs(dblTaskId);

            divPopUpEditTask.classList.remove("hidden");
        },
        hide: function () {
            divPopUpEditTask.classList.add("hidden");
        }
    }
})();

export { popUpEditTask };