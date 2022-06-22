import { shapeToDo } from "../Model/Todo";
import { createProjectDAO } from "./ProjectDAO";
import format from "date-fns/format";
import { STATUS } from "../Model/Status";
import { Todo } from "../Model/Todo";
import { Project } from "../Model/Project";

/**
 *
 * @param {string} strProjectId
 * @param {number} intStatusId
 * @param {string} strTitle
 * @param {string} strDescription
 * @param {Date} dtDueDate
 * @param {number} intPriority
 * @param {string} strTag
 * @param {string} strUserOwnerId
 * @param {string} strUserCreatorId
 * @returns {string}
 */
function dbInsert(
  strProjectId,
  intStatusId,
  strTitle,
  strDescription,
  dtDueDate,
  intPriority,
  strTag,
  strUserOwnerId,
  strUserCreatorId
) {
  const objTodoData = {
    strId: Number(Date.now() + (Math.random() * 100000).toFixed()).toString(),
    strProjectId: strProjectId,
    intStatusId: intStatusId,
    strTitle: strTitle,
    strDescription: strDescription,
    dtDueDate: dtDueDate,
    intPriority: intPriority,
    strTag: strTag,
    strUserOwnerId: strUserOwnerId,
    strUserCreatorId: strUserCreatorId,
    dtCreatedOn: new Date(),
    booIsClosed: false,
    arrNoteId: [],
    arrSubTaskId: [],
  };

  localStorage.setItem(
    "todo-" + objTodoData.strId,
    JSON.stringify(objTodoData)
  );

  createProjectDAO().dbAddTodoIdToProject(
    objTodoData.strProjectId,
    objTodoData.strId,
    objTodoData.strUserOwnerId
  );

  return objTodoData.strId;
}

/**
 *
 * @param {string} strTodoId
 * @param {string} strSubtaskId
 * @returns
 */
function dbAddSubTaskId(strTodoId, strSubtaskId) {
  const objTodo = createTodoDAO().dbSelect(strTodoId);
  objTodo.getSubTasksIdList().push(strSubtaskId);

  const objTodoData = {
    strId: objTodo.getId(),
    strProjectId: objTodo.getProjectId(),
    intStatusId: objTodo.getStatusId(),
    strTitle: objTodo.getTitle(),
    strDescription: objTodo.getDescription(),
    dtDueDate: objTodo.getDueDate(),
    intPriority: objTodo.getPriority(),
    strTag: objTodo.getTag(),
    strUserOwnerId: objTodo.getUserOwnerId(),
    strUserCreatorId: objTodo.getUserCreatorId(),
    dtCreatedOn: objTodo.getCreationDate(),
    booIsClosed: false,
    arrNoteId: objTodo.getNotesIdList(),
    arrSubTaskId: objTodo.getSubTasksIdList(),
  };

  localStorage.setItem(
    "todo-" + objTodoData.strId,
    JSON.stringify(objTodoData)
  );

  return true;
}

/**
 *
 * @param {string} strTodoId
 * @param {string} strNoteId
 * @returns {boolean}
 */
function dbAddNoteId(strTodoId, strNoteId) {
  const objTodo = createTodoDAO().dbSelect(strTodoId);
  objTodo.getNotesIdList().push(strNoteId);

  const objTodoData = {
    strId: objTodo.getId(),
    strProjectId: objTodo.getProjectId(),
    intStatusId: objTodo.getStatusId(),
    strTitle: objTodo.getTitle(),
    strDescription: objTodo.getDescription(),
    dtDueDate: objTodo.getDueDate(),
    intPriority: objTodo.getPriority(),
    strTag: objTodo.getTag(),
    strUserOwnerId: objTodo.getUserOwnerId(),
    strUserCreatorId: objTodo.getUserCreatorId(),
    dtCreatedOn: objTodo.getCreationDate(),
    booIsClosed: false,
    arrNoteId: objTodo.getNotesIdList(),
    arrSubTaskId: objTodo.getSubTasksIdList(),
  };

  localStorage.setItem(
    "todo-" + objTodoData.strId,
    JSON.stringify(objTodoData)
  );

  return true;
}

/**
 *
 * @param {string} strTodoId
 * @param {string} strNoteId
 * @returns {Boolean}
 */
function dbRemoveNoteId(strTodoId, strNoteId) {
  const objTodo = createTodoDAO().dbSelect(strTodoId);

  for (let i = 0; i < objTodo.getNotesIdList().length; i++) {
    if (objTodo.getNotesIdList()[i] === strNoteId) {
      objTodo.getNotesIdList().splice(i, 1);
      break;
    }
  }

  const objTodoData = {
    strId: objTodo.getId(),
    strProjectId: objTodo.getProjectId(),
    intStatusId: objTodo.getStatusId(),
    strTitle: objTodo.getTitle(),
    strDescription: objTodo.getDescription(),
    dtDueDate: objTodo.getDueDate(),
    intPriority: objTodo.getPriority(),
    strTag: objTodo.getTag(),
    strUserOwnerId: objTodo.getUserOwnerId(),
    strUserCreatorId: objTodo.getUserCreatorId(),
    dtCreatedOn: objTodo.getCreationDate(),
    booIsClosed: false,
    arrNoteId: objTodo.getNotesIdList(),
    arrSubTaskId: objTodo.getSubTasksIdList(),
  };

  localStorage.setItem(
    "todo-" + objTodoData.strId,
    JSON.stringify(objTodoData)
  );

  return true;
}

/**
 *
 * @param {string} strId
 * @returns {Todo}
 */
function dbSelect(strId) {
  const objTodoData = JSON.parse(localStorage.getItem("todo-" + strId));

  const objTodo = shapeToDo(
    objTodoData.strId,
    objTodoData.strProjectId,
    objTodoData.intStatusId,
    objTodoData.strTitle,
    objTodoData.strDescription,
    new Date(objTodoData.dtDueDate),
    objTodoData.intPriority,
    objTodoData.strTag,
    objTodoData.strUserOwnerId,
    objTodoData.strUserCreatorId,
    new Date(objTodoData.dtCreatedOn),
    objTodoData.booIsClosed,
    objTodoData.arrNoteId,
    objTodoData.arrSubTaskId
  );

  return objTodo;
}

/**
 *
 * @param {string} strTodoId
 * @returns {string}
 */
function dbComplete(strTodoId) {
  const objTodo = dbSelect(strTodoId);

  const objTodoData = {
    strId: objTodo.getId(),
    strProjectId: objTodo.getProjectId(),
    intStatusId: STATUS.COMPLETED.id,
    strTitle: objTodo.getTitle(),
    strDescription: objTodo.getDescription(),
    dtDueDate: objTodo.getDueDate(),
    intPriority: objTodo.getPriority(),
    strTag: objTodo.getTag(),
    strUserOwnerId: objTodo.getUserOwnerId(),
    strUserCreatorId: objTodo.getUserCreatorId(),
    dtCreatedOn: objTodo.getCreationDate(),
    booIsClosed: true,
    arrNoteId: objTodo.getNotesIdList(),
    arrSubTaskId: objTodo.getSubTasksIdList(),
  };

  localStorage.setItem(
    "todo-" + objTodoData.strId,
    JSON.stringify(objTodoData)
  );

  return objTodoData.strId;
}

/**
 *
 * @param {string} strId
 * @param {number} intStatusId
 * @param {string} strTitle
 * @param {string} strDescription
 * @param {Date} dtDueDate
 * @param {number} intPriority
 * @param {string} strTag
 * @param {string} strUserOwnerId
 * @param {boolean} booIsClosed
 * @returns {string}
 */
function dbUpdate(
  strId,
  intStatusId,
  strTitle,
  strDescription,
  dtDueDate,
  intPriority,
  strTag,
  strUserOwnerId,
  booIsClosed
) {
  const objTodo = dbSelect(strId);

  const objTodoData = {
    strId: objTodo.getId(),
    strProjectId: objTodo.getProjectId(),
    intStatusId: intStatusId,
    strTitle: strTitle,
    strDescription: strDescription,
    dtDueDate: dtDueDate,
    intPriority: intPriority,
    strTag: strTag,
    strUserOwnerId: strUserOwnerId,
    strUserCreatorId: objTodo.getUserCreatorId(),
    dtCreatedOn: objTodo.getCreationDate(),
    booIsClosed: booIsClosed,
    arrNoteId: objTodo.getNotesIdList(),
    arrSubTaskId: objTodo.getSubTasksIdList(),
  };

  localStorage.setItem(
    "todo-" + objTodoData.strId,
    JSON.stringify(objTodoData)
  );

  return objTodoData.strId;
}

/**
 *
 * @param {string[]} arrTodoId
 * @returns {Todo[]}
 */
function dbSelectAll(arrTodoId) {
  const arrTodos = arrTodoId.map((todoId) => dbSelect(todoId));
  return arrTodos;
}

/**
 *
 * @param {string} strProjectId
 * @returns {Todo[]}
 */
function dbSelectByProject(strProjectId) {
  const objProject = createProjectDAO().dbSelect(strProjectId, "1");
  return dbSelectAll(objProject ? objProject.getToDosIdList() : []);
}
/**
 *
 * @param {Date} dtStartDate
 * @param {Date} dtEndDate
 * @param {string} strOWnerUserId
 * @returns {Promise<Todo[]>}
 */
async function dbSelectByDate(dtStartDate, dtEndDate, strOWnerUserId) {
  const arrProjects = await createProjectDAO().dbSelectAll(strOWnerUserId);

  const arrAllTasks = arrProjects.reduce(
    /**
     *
     * @param {Todo[]} prev
     * @param {Project} curr
     * @returns
     */
    (prev, curr) => {
      const arrTodoList = dbSelectAll(curr.getToDosIdList());
      return prev.concat(arrTodoList);
    },
    []
  );

  return arrAllTasks.filter(
    (tasks) =>
      format(tasks.getDueDate(), "yyyy/MM/dd") >=
        format(dtStartDate, "yyyy/MM/dd") &&
      (dtEndDate == null ||
        (dtEndDate &&
          format(tasks.getDueDate(), "yyyy/MM/dd") <=
            format(dtEndDate, "yyyy/MM/dd"))) &&
      tasks.getStatusId() !== STATUS.COMPLETED.id &&
      tasks.getStatusId() !== STATUS.CLOSED.id
  );
}

function createTodoDAO() {
  return {
    dbInsert,
    dbSelect,
    dbSelectAll,
    dbUpdate,
    dbSelectByDate,
    dbAddSubTaskId,
    dbAddNoteId,
    dbComplete,
    dbRemoveNoteId,
    dbSelectByProject,
  };
}

export { createTodoDAO };
