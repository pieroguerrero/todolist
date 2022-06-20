import { STATUS } from "../Model/Status";
import { shapeSubTask } from "../Model/SubTask";
import { createTodoDAO } from "./TodoDAO";
import { SubTask } from "./../Model/SubTask";

/**
 *
 * @param {string} strId
 * @param {string} strTodoId
 * @param {string} strTitle
 * @param {string} strDescription
 * @param {Date} dtDueDate
 * @param {string} strIdUserOwner
 * @param {string} strIdUserCreator
 * @param {number} idStatus
 * @param {Date} dtCreatedOn
 * @returns
 */
const adapt = (
  strId,
  strTodoId,
  strTitle,
  strDescription,
  dtDueDate,
  strIdUserOwner,
  strIdUserCreator,
  idStatus,
  dtCreatedOn
) => {
  return {
    strId,
    strTodoId,
    strTitle,
    strDescription,
    dtDueDate,
    strIdUserOwner,
    strIdUserCreator,
    idStatus,
    dtCreatedOn,
  };
};

/**
 *
 * @param {string} strTodoId
 * @param {string} strTitle
 * @param {string} strDescription
 * @param {Date} dtDueDate
 * @param {string} strIdUserOwner
 * @param {string} strIdUserCreator
 * @param {number} idStatus
 * @returns {string}
 */
function dbInsert(
  strTodoId,
  strTitle,
  strDescription,
  dtDueDate,
  strIdUserOwner,
  strIdUserCreator,
  idStatus
) {
  const objSubTaskData = adapt(
    Number(Date.now() + (Math.random() * 100000).toFixed()).toString(),
    strTodoId,
    strTitle,
    strDescription,
    dtDueDate,
    strIdUserOwner,
    strIdUserCreator,
    idStatus,
    new Date()
  );

  localStorage.setItem(
    "subtask-" + objSubTaskData.strId,
    JSON.stringify(objSubTaskData)
  );

  createTodoDAO().dbAddSubTaskId(
    objSubTaskData.strTodoId,
    objSubTaskData.strId
  );

  return objSubTaskData.strId;
}

/**
 *
 * @param {string} strId
 * @returns {string}
 */
function dbComplete(strId) {
  const objSubTask = dbSelect(strId);

  const objSubTaskData = adapt(
    objSubTask.getId(),
    objSubTask.getIdTodo(),
    objSubTask.getTitle(),
    objSubTask.getDescription(),
    objSubTask.getDueDate(),
    objSubTask.getUserOwnerId(),
    objSubTask.getUserCreatorId(),
    STATUS.COMPLETED.id,
    objSubTask.getCreationDate()
  );

  localStorage.setItem(
    "subtask-" + objSubTaskData.strId,
    JSON.stringify(objSubTaskData)
  );

  return objSubTaskData.strId;
}

/**
 *
 * @param {string} strId
 * @param {string} strTitle
 * @param {string} strDescription
 * @param {Date} dtDueDate
 * @param {string} strIdUserOwner
 * @param {number} idStatus
 * @returns {string}
 */
function dbUpdate(
  strId,
  strTitle,
  strDescription,
  dtDueDate,
  strIdUserOwner,
  idStatus
) {
  const objSubTask = dbSelect(strId);

  const objSubTaskData = adapt(
    strId,
    objSubTask.getIdTodo(),
    strTitle,
    strDescription,
    dtDueDate,
    strIdUserOwner,
    objSubTask.getUserCreatorId(),
    idStatus,
    objSubTask.getCreationDate()
  );

  localStorage.setItem(
    "subtask-" + objSubTaskData.strId,
    JSON.stringify(objSubTaskData)
  );

  return objSubTaskData.strId;
}

/**
 *
 * @param {string} strSubTaskId
 * @returns {SubTask}
 */
function dbSelect(strSubTaskId) {
  const objSubTaskData = JSON.parse(
    localStorage.getItem("subtask-" + strSubTaskId)
  );

  const objSubTask = shapeSubTask(
    objSubTaskData.strId,
    new Date(objSubTaskData.dtCreatedOn),
    objSubTaskData.intTodoId,
    objSubTaskData.strTitle,
    objSubTaskData.strDescription,
    new Date(objSubTaskData.dtDueDate),
    objSubTaskData.strIdUserOwner,
    objSubTaskData.strIdUserCreator,
    objSubTaskData.idStatus
  );

  return objSubTask;
}

/**
 *
 * @param {string[]} arrSubTaskId
 * @returns {SubTask[]}
 */

function dbSelectAll(arrSubTaskId) {
  const arrSubTasks = arrSubTaskId.map((subTaskId) => dbSelect(subTaskId));
  return arrSubTasks;
}

/**
 *
 * @param {string} strTodoId
 * @returns {SubTask[]}
 */
function dbSelectByTodo(strTodoId) {
  const arrSubTasksId = createTodoDAO().dbSelect(strTodoId).getSubTasksIdList();

  return dbSelectAll(arrSubTasksId);
}

/**
 *
 * @param {string} strTodoId
 * @returns {SubTask[]}
 */
function dbSelectActiveByTodo(strTodoId) {
  return dbSelectByTodo(strTodoId).filter(
    (objSubTasks) =>
      objSubTasks.getStatusId() !== STATUS.CLOSED.id &&
      objSubTasks.getStatusId() !== STATUS.COMPLETED.id
  );
}

function createSubTaskDAO() {
  return {
    dbInsert,
    dbSelect,
    dbSelectAll,
    dbUpdate,
    dbSelectActiveByTodo,
    dbComplete,
  };
}

export { createSubTaskDAO };
