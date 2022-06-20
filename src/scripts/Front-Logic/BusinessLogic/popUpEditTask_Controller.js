import { createNoteDAO } from "../DataAccess/NoteDAO";
import { createProjectDAO } from "../DataAccess/ProjectDAO";
import { createSubTaskDAO } from "../DataAccess/SubTaskDAO";
import { createTodoDAO } from "../DataAccess/TodoDAO";
import { STATUS } from "../Model/Status";

const popUpEditTask_Controller = (function () {
  return {
    /**
     *
     * @param {string} strTaskId
     * @returns {{
     * strId: string,
     * strName: string,
     * strDescription: string,
     * strProjectId: string,
     * strProjectName: string,
     * dtDueDate: Date,
     * intPriorityId: number,
     * strLabel: string,
     * }}
     */
    getTaskInfo: function (strTaskId) {
      const objTask = createTodoDAO().dbSelect(strTaskId);
      const objProject = createProjectDAO().dbSelect(
        objTask.getProjectId(),
        objTask.getUserOwnerId()
      );

      return {
        strId: objTask.getId(),
        strName: objTask.getTitle(),
        strDescription: objTask.getDescription(),
        strProjectId: objProject?.getId(),
        strProjectName: objProject?.getTitle(),
        dtDueDate: objTask.getDueDate(),
        intPriorityId: objTask.getPriority(),
        strLabel: objTask.getTag(),
      };
    },
    /**
     *
     * @param {string} strCurrentUserId
     * @returns {{
     * strId: string;
     * strName: string;
     * }[]}
     */
    loadProjectsDropDownList: function (strCurrentUserId) {
      const objProjectDAO = createProjectDAO();

      const arrProjects = objProjectDAO.dbSelectAll(strCurrentUserId);

      const arrProjectsFiltered = arrProjects.map((objProject) => ({
        strId: objProject.getId(),
        strName: objProject.getTitle(),
      }));

      return arrProjectsFiltered;
    },
    /**
     *
     * @param {string} strTaskId
     * @param {string} strName
     * @param {string} strDescription
     * @param {Date} dtDueDate
     * @param {string} strUserOwnerId
     * @param {number} intPriorityId
     * @param {string} strLabel
     * @returns {{
     * strId: string;
     * strResult: string;
     * }}
     */
    editTask: function (
      strTaskId,
      strName,
      strDescription,
      dtDueDate,
      strUserOwnerId,
      intPriorityId,
      strLabel
    ) {
      const strEditedTaskId = createTodoDAO().dbUpdate(
        strTaskId,
        STATUS.INPROGRESS.id,
        strName,
        strDescription,
        dtDueDate,
        intPriorityId,
        strLabel,
        strUserOwnerId,
        false
      );

      const strResult =
        strEditedTaskId.length > 0
          ? "The Task was saved sucessfully."
          : "Error";

      return { strId: strEditedTaskId, strResult };
    },
    /**
     *
     * @param {string} strSubtaskId
     * @param {string} strTaskId
     * @param {string} strName
     * @param {string} strDescription
     * @param {Date} dtDueDate
     * @param {string} strUserOwnerId
     * @returns
     */
    addSubTask: function (
      strSubtaskId,
      strTaskId,
      strName,
      strDescription,
      dtDueDate,
      strUserOwnerId
    ) {
      const objResult = {};
      if (strSubtaskId === "-1") {
        objResult.strId = createSubTaskDAO().dbInsert(
          strTaskId,
          strName,
          strDescription,
          dtDueDate,
          strUserOwnerId,
          strUserOwnerId,
          STATUS.PENDING.id
        );

        objResult.strMessage = "Success";
      } else {
        //update
      }
      return objResult;
    },
    /**
     *
     * @param {string} strTaskId
     * @returns
     */
    getSubTasksByTask: function (strTaskId) {
      return createSubTaskDAO()
        .dbSelectActiveByTodo(strTaskId)
        .map((objSubTask) => ({
          strId: objSubTask.getId(),
          strName: objSubTask.getTitle(),
          strDescription: objSubTask.getDescription(),
          intStatusId: objSubTask.getStatusId(),
        }));
    },
    /**
     *
     * @param {string} strTaskId
     * @returns
     */
    getNotesByTask: function (strTaskId) {
      return createNoteDAO()
        .dbSelectByTodo(strTaskId)
        .map((objNote) => ({
          strId: objNote.getId(),
          strDate: objNote.getTitle(),
          strComment: objNote.getDescription(),
        }));
    },
    /**
     *
     * @param {string} strSubTaskId
     * @param {string} strTaskId
     * @param {string} strDate
     * @param {string} strComment
     * @param {string} strUserOwnerId
     * @returns
     */
    saveNote: function (
      strSubTaskId,
      strTaskId,
      strDate,
      strComment,
      strUserOwnerId
    ) {
      //new Date(divPopUpProject.querySelector("#date-register-project-startdate").value.replace(/-/g, '\/'))
      const objResult = {};

      if (strSubTaskId === "-1") {
        objResult.strId = createNoteDAO().dbInsert(
          strTaskId,
          strDate,
          strComment,
          strUserOwnerId
        );
        objResult.strMessage = "Success";
      } else {
        //update
      }

      return objResult;
    },
    /**
     *
     * @param {string} strTaskId
     * @returns {{
     * strId: string;
     * strMessage: string;
     * }}
     */
    completeTask: function (strTaskId) {
      const objResult = {};

      objResult.strId = createTodoDAO().dbComplete(strTaskId);
      objResult.strMessage = "Success";

      return objResult;
    },
    /**
     *
     * @param {string} strSubTaskId
     * @returns
     */
    completeSubTask: function (strSubTaskId) {
      const objResult = {};

      objResult.strId = createSubTaskDAO().dbComplete(strSubTaskId);
      objResult.strMessage = "Success";

      return objResult;
    },
    /**
     *
     * @param {string} strNoteId
     * @returns
     */
    deleteNote: function (strNoteId) {
      const objResult = {};

      objResult.strId = createNoteDAO().dbDelete(strNoteId);
      objResult.strMessage = "Success";

      return objResult;
    },
  };
})();

export { popUpEditTask_Controller };
