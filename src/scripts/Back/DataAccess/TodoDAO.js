import { shapeToDo } from "../Model/Todo";

/**
 * 
 * @param {number} dblProjectId 
 * @param {number} intStatusId 
 * @param {string} strTitle 
 * @param {string} strDescription 
 * @param {Date} dtDueDate 
 * @param {number} intPriority 
 * @param {string} strTag 
 * @param {number} intUserOwnerId 
 * @param {number} intUserCreatorId 
 * @param {boolean} booIsClosed 
 * @returns {number}
 */
function dbInsert(dblProjectId, intStatusId, strTitle, strDescription, dtDueDate, intPriority, strTag, intUserOwnerId, intUserCreatorId, booIsClosed) {

    const objTodoData = {
        dblId: Number(Date.now() + ((Math.random() * 100000).toFixed())),
        dblProjectId: dblProjectId,
        intStatusId: intStatusId,
        strTitle: strTitle,
        strDescription: strDescription,
        dtDueDate: dtDueDate,
        intPriority: intPriority,
        strTag: strTag,
        intUserOwnerId: intUserOwnerId,
        intUserCreatorId: intUserCreatorId,
        dtCreatedOn: new Date(),
        booIsClosed: booIsClosed,
        arrNoteId: [],
        arrSubTaskId: []
    }

    localStorage.setItem("todo-" + objTodoData.dblId, JSON.stringify(objTodoData));

    return objTodoData.dblId;
}

function dbSelect(dblId) {

    const objTodoData = JSON.parse(localStorage.getItem("todo-" + dblId));

    const objTodo = shapeToDo(
        objTodoData.dblId,
        objTodoData.dblProjectId,
        objTodoData.intStatusId,
        objTodoData.strTitle,
        objTodoData.strDescription,
        objTodoData.dtDueDate,
        objTodoData.intPriority,
        objTodoData.strTag,
        objTodoData.intUserOwnerId,
        objTodoData.intUserCreatorId,
        objTodoData.dtCreatedOn,
        objTodoData.booIsClosed,
        objTodoData.arrNoteId,
        objTodoData.arrSubTaskId
    );

    return objTodo;
}

function dbUpdate(dblId, intStatusId, strTitle, strDescription, dtDueDate, intPriority, strTag, intUserOwnerId, booIsClosed) {

    const objTodo = dbSelect(dblId);

    const objTodoData = {
        dblId: objTodo.getId(),
        dblProjectId: objTodo.getProjectId(),
        intStatusId: intStatusId,
        strTitle: strTitle,
        strDescription: strDescription,
        dtDueDate: dtDueDate,
        intPriority: intPriority,
        strTag: strTag,
        intUserOwnerId: intUserOwnerId,
        intUserCreatorId: objTodo.getUserCreatorId(),
        dtCreatedOn: objTodo.getCreationDate(),
        booIsClosed: booIsClosed,
        arrNoteId: objTodo.getNotesIdList(),
        arrSubTaskId: objTodo.getSubTasksIdList()
    }

    localStorage.setItem("todo-" + objTodoData.dblId, JSON.stringify(objTodoData));

    return objTodoData.dblId;
}

function dbSelectAll(arrTodoId) {

    const arrTodos = arrTodoId.map(todoId => dbSelect(todoId));
    return arrTodos;
}

const objData = { dbInsert: null, dbUpdate: null, dbSelect: null, dbSelectAll: null };

/**
 * 
 * @returns {{
 * dbInsert: dbInsert, 
 * dbSelect: dbSelect,
 * dbSelectAll: dbSelectAll,
 * dbUpdate: dbUpdate
 * }}
 */
export function createTodoDAO() {

    if (!objData.dbInsert) {

        objData.dbInsert = dbInsert;
        objData.dbSelect = dbSelect;
        objData.dbSelectAll = dbSelectAll;
        objData.dbUpdate = dbUpdate;
    }

    return objData;
}