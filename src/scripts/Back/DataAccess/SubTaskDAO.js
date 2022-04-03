import { shapeSubTask } from "../Model/SubTask";


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
        objSubTaskData.dtCreatedOn,
        objSubTaskData.intTodoId,
        objSubTaskData.strTitle,
        objSubTaskData.strDescription,
        objSubTaskData.dtDueDate,
        objSubTaskData.idUserOwner,
        objSubTaskData.idUserCreator,
        objSubTaskData.idStatus,
    );

    return objSubTask;
}

const objData = { dbInsert: null, dbUpdate: null, dbSelect: null };

/**
 * 
 * @returns {{
 * dbInsert: dbInsert, 
 * dbSelect: dbSelect,
 * dbUpdate: dbUpdate
 * }}
 */
export function createSubTaskDAO() {

    if (!objData.dbInsert) {

        objData.dbInsert = dbInsert;
        objData.dbSelect = dbSelect;
        objData.dbUpdate = dbUpdate;
    }

    return objData;
}