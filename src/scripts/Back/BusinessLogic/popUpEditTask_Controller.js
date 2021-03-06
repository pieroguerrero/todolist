import { createNoteDAO } from "../DataAccess/NoteDAO";
import { createProjectDAO } from "../DataAccess/ProjectDAO";
import { createSubTaskDAO } from "../DataAccess/SubTaskDAO";
import { createTodoDAO } from "../DataAccess/TodoDAO";
import { STATUS } from "../Model/Status";

const popUpEditTask_Controller = (function () {

    return {

        getTaskInfo: function (dblTaskId) {

            const objTask = createTodoDAO().dbSelect(dblTaskId);
            const objProject = createProjectDAO().dbSelect(objTask.getProjectId(), objTask.getUserOwnerId());

            return {
                dblId: objTask.getId(),
                strName: objTask.getTitle(),
                strDescription: objTask.getDescription(),
                dblProjectId: objProject.getId(),
                strProjectName: objProject.getTitle(),
                dtDueDate: objTask.getDueDate(),
                intPriorityId: objTask.getPriority(),
                strLabel: objTask.getTag(),
            }
        },
        loadProjectsDropDownList: function (dblCurrentUserId) {

            const objProjectDAO = createProjectDAO();

            const arrProjects = objProjectDAO.dbSelectAll(dblCurrentUserId);

            const arrProjectsFiltered = arrProjects.map(objProject => ({ dblId: objProject.getId(), strName: objProject.getTitle(), }));

            return arrProjectsFiltered;
        },
        editTask: function (dblTaskId, strName, strDescription, dtDueDate, intUserOwnerId, intPriorityId, strLabel) {

            const dblEditedTaskId = createTodoDAO().dbUpdate(dblTaskId, STATUS.INPROGRESS.id, strName, strDescription, dtDueDate, intPriorityId, strLabel, intUserOwnerId, false);

            const strResult = dblEditedTaskId > 0 ? "The Task was saved sucessfully." : "Error";

            return { dblId: dblEditedTaskId, strResult };
            //PubSub.publish("MainLandingAddTaskPopUpController-RegisterNewTask-Render", { dblId: dblNewTaskId, strResult });
        },
        addSubTask: function (dblSubtaskId, dblTaskId, strName, strDescription, dtDueDate, dblUserOwnerId) {

            const objResult = {};
            if (dblSubtaskId === -1) {

                objResult.dblId = createSubTaskDAO().dbInsert(dblTaskId, strName, strDescription, dtDueDate, dblUserOwnerId, dblUserOwnerId, STATUS.PENDING.id);

                objResult.strMessage = "Success";
            } else {//update

            }
            return objResult;

        },
        /**
         * 
         * @param {number} dblTaskId 
         * @returns 
         */
        getSubTasksByTask: function (dblTaskId) {

            return createSubTaskDAO().dbSelectActiveByTodo(dblTaskId).map(objSubTask => ({

                dblId: objSubTask.getId(),
                strName: objSubTask.getTitle(),
                strDescription: objSubTask.getDescription(),
                intStatusId: objSubTask.getStatusId(),
            }));
        },
        /**
         * 
         * @param {number} dblTaskId 
         * @returns 
         */
        getNotesByTask: function (dblTaskId) {

            return createNoteDAO().dbSelectByTodo(dblTaskId).map(objNote => ({

                dblId: objNote.getId(),
                strDate: objNote.getTitle(),
                strComment: objNote.getDescription(),
            }));
        },
        saveNote: function (dblSubTaskId, dblTaskId, strDate, strComment, dblUserOwnerId) {

            //new Date(divPopUpProject.querySelector("#date-register-project-startdate").value.replace(/-/g, '\/'))
            const objResult = {};

            if (dblSubTaskId === -1) {

                objResult.dblId = createNoteDAO().dbInsert(dblTaskId,
                    strDate,
                    strComment,
                    dblUserOwnerId);
                objResult.strMessage = "Success";
            } else {//update

            }

            return objResult;
        },
        /**
         * 
         * @param {number} dblTaskId 
         */
        completeTask: function (dblTaskId) {

            const objResult = {};

            objResult.dblId = createTodoDAO().dbComplete(dblTaskId);
            objResult.strMessage = "Success";

            return objResult;
        },
        completeSubTask: function (dblSubTaskId) {

            const objResult = {};

            objResult.dblId = createSubTaskDAO().dbComplete(dblSubTaskId);
            objResult.strMessage = "Success";

            return objResult;
        },
        deleteNote: function (dblNoteId) {

            const objResult = {};

            objResult.dblId = createNoteDAO().dbDelete(dblNoteId);
            objResult.strMessage = "Success";

            return objResult;
        },
    }
})();

export { popUpEditTask_Controller };