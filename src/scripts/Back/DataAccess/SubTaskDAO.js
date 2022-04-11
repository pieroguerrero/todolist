import { STATUS } from "../Model/Status";
import { shapeSubTask } from "../Model/SubTask";
import { createTodoDAO } from "./TodoDAO";


/**
 * 
 * @param {number} intTodoId 
 * @param {string} strTitle 
 * @param {string} strDescription 
 * @param {Date} dtDueDate 
 * @param {number} idUserOwner 
 * @param {number} idUserCreator 
 * @param {number} idStatus 
 * @returns {number}
 */
function dbInsert(intTodoId, strTitle, strDescription, dtDueDate, idUserOwner, idUserCreator, idStatus) {

    const objSubTaskData = {
        dblId: Number(Date.now() + ((Math.random() * 100000).toFixed())),
        intTodoId: intTodoId,
        strTitle: strTitle,
        strDescription: strDescription,
        dtDueDate: dtDueDate,
        idUserOwner: idUserOwner,
        idUserCreator: idUserCreator,
        idStatus: idStatus,
        dtCreatedOn: new Date()
    };

    localStorage.setItem("subtask-" + objSubTaskData.dblId, JSON.stringify(objSubTaskData));

    return objSubTaskData.dblId;
}

/**
 * 
 * @param {number} dblId 
 * @param {string} strTitle 
 * @param {string} strDescription 
 * @param {Date} dtDueDate 
 * @param {number} idUserOwner 
 * @param {number} idStatus 
 * @returns 
 */
function dbUpdate(dblId, strTitle, strDescription, dtDueDate, idUserOwner, idStatus) {

    const objSubTask = dbSelect(dblId);

    const objSubTaskData = {
        dblId: dblId,
        intTodoId: objSubTask.getIdTodo(),
        strTitle: strTitle,
        strDescription: strDescription,
        dtDueDate: dtDueDate,
        idUserOwner: idUserOwner,
        idUserCreator: objSubTask.getUserCreatorId(),
        idStatus: idStatus,
        dtCreatedOn: objSubTask.getCreationDate()
    };

    localStorage.setItem("subtask-" + objSubTaskData.dblId, JSON.stringify(objSubTaskData));

    return objSubTaskData.dblId;
}

function dbSelect(intSubTaskId) {

    const objSubTaskData = JSON.parse(localStorage.getItem("subtask-" + intSubTaskId));

    const objSubTask = shapeSubTask(
        objSubTaskData.dblId,
        new Date(objSubTaskData.dtCreatedOn),
        objSubTaskData.intTodoId,
        objSubTaskData.strTitle,
        objSubTaskData.strDescription,
        new Date(objSubTaskData.dtDueDate),
        objSubTaskData.idUserOwner,
        objSubTaskData.idUserCreator,
        objSubTaskData.idStatus,
    );

    return objSubTask;
}

/**
 * 
 * @param {number[]} arrSubTaskId 
 * @returns 
 */

function dbSelectAll(arrSubTaskId) {

    const arrSubTasks = arrSubTaskId.map(subTaskId => dbSelect(subTaskId));
    return arrSubTasks;
}

/**
 * 
 * @param {number} dblTodoId 
 * @returns 
 */
function dbSelectByTodo(dblTodoId) {

    const arrSubTasksId = createTodoDAO().dbSelect(dblTodoId).getSubTasksIdList();

    return dbSelectAll(arrSubTasksId);
}

function dbSelectActiveByTodo(dblTodoId, dblUserOwnerId) {

    return dbSelectByTodo(dblTodoId).filter(objSubTasks => ((objSubTasks.getStatusId() !== STATUS.CLOSED.id) && (objSubTasks.getStatusId() !== STATUS.COMPLETED.id)));

}

const objData = { dbInsert: null, dbUpdate: null, dbSelect: null, dbSelectAll: null, dbSelectActiveByTodo: null };

/**
 * 
 * @returns {{
 * dbInsert: dbInsert, 
 * dbSelect: dbSelect,
 * dbSelectAll: dbSelectAll,
 * dbUpdate: dbUpdate,
 * dbSelectActiveByTodo:dbSelectActiveByTodo
 * }}
 */
function createSubTaskDAO() {

    if (!objData.dbInsert) {

        objData.dbInsert = dbInsert;
        objData.dbSelect = dbSelect;
        objData.dbSelectAll = dbSelectAll;
        objData.dbUpdate = dbUpdate;
        objData.dbSelectActiveByTodo = dbSelectActiveByTodo;
    }

    return objData;
}

export { createSubTaskDAO };