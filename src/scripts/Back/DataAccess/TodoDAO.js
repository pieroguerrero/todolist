import { shapeToDo } from "../Model/Todo";
import { createProjectDAO } from "./ProjectDAO";
import format from "date-fns/format";
import { STATUS } from "../Model/Status";

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
 * @returns {number}
 */
function dbInsert(dblProjectId, intStatusId, strTitle, strDescription, dtDueDate, intPriority, strTag, intUserOwnerId, intUserCreatorId) {

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
        booIsClosed: false,
        arrNoteId: [],
        arrSubTaskId: []
    }

    localStorage.setItem("todo-" + objTodoData.dblId, JSON.stringify(objTodoData));

    createProjectDAO().dbAddTodoIdToProject(objTodoData.dblProjectId, objTodoData.dblId, objTodoData.intUserOwnerId);

    return objTodoData.dblId;
}

/**
 * 
 * @param {number} dblTodoId 
 * @param {number} dblSubtaskId 
 * @returns 
 */
function dbAddSubTaskId(dblTodoId, dblSubtaskId) {

    const objTodo = createTodoDAO().dbSelect(dblTodoId);
    objTodo.getSubTasksIdList().push(dblSubtaskId);

    const objTodoData = {
        dblId: objTodo.getId(),
        dblProjectId: objTodo.getProjectId(),
        intStatusId: objTodo.getStatusId(),
        strTitle: objTodo.getTitle(),
        strDescription: objTodo.getDescription(),
        dtDueDate: objTodo.getDueDate(),
        intPriority: objTodo.getPriority(),
        strTag: objTodo.getTag(),
        intUserOwnerId: objTodo.getUserOwnerId(),
        intUserCreatorId: objTodo.getUserCreatorId(),
        dtCreatedOn: objTodo.getCreationDate(),
        booIsClosed: false,
        arrNoteId: objTodo.getNotesIdList(),
        arrSubTaskId: objTodo.getSubTasksIdList()
    };

    localStorage.setItem("todo-" + objTodoData.dblId, JSON.stringify(objTodoData));

    return true;
}

/**
 * 
 * @param {number} dblTodoId 
 * @param {number} dblNoteId 
 * @returns 
 */
function dbAddNoteId(dblTodoId, dblNoteId) {

    const objTodo = createTodoDAO().dbSelect(dblTodoId);
    objTodo.getNotesIdList().push(dblNoteId);

    const objTodoData = {
        dblId: objTodo.getId(),
        dblProjectId: objTodo.getProjectId(),
        intStatusId: objTodo.getStatusId(),
        strTitle: objTodo.getTitle(),
        strDescription: objTodo.getDescription(),
        dtDueDate: objTodo.getDueDate(),
        intPriority: objTodo.getPriority(),
        strTag: objTodo.getTag(),
        intUserOwnerId: objTodo.getUserOwnerId(),
        intUserCreatorId: objTodo.getUserCreatorId(),
        dtCreatedOn: objTodo.getCreationDate(),
        booIsClosed: false,
        arrNoteId: objTodo.getNotesIdList(),
        arrSubTaskId: objTodo.getSubTasksIdList()
    };

    localStorage.setItem("todo-" + objTodoData.dblId, JSON.stringify(objTodoData));

    return true;
}

/**
 * 
 * @param {number} dblTodoId 
 * @param {number} dblNoteId 
 * @returns 
 */
function dbRemoveNoteId(dblTodoId, dblNoteId) {

    const objTodo = createTodoDAO().dbSelect(dblTodoId);

    for (let i = 0; i < objTodo.getNotesIdList().length; i++) {

        if (objTodo.getNotesIdList()[i] === dblNoteId) {

            objTodo.getNotesIdList().splice(i, 1);
            break;
        }
    }

    const objTodoData = {
        dblId: objTodo.getId(),
        dblProjectId: objTodo.getProjectId(),
        intStatusId: objTodo.getStatusId(),
        strTitle: objTodo.getTitle(),
        strDescription: objTodo.getDescription(),
        dtDueDate: objTodo.getDueDate(),
        intPriority: objTodo.getPriority(),
        strTag: objTodo.getTag(),
        intUserOwnerId: objTodo.getUserOwnerId(),
        intUserCreatorId: objTodo.getUserCreatorId(),
        dtCreatedOn: objTodo.getCreationDate(),
        booIsClosed: false,
        arrNoteId: objTodo.getNotesIdList(),
        arrSubTaskId: objTodo.getSubTasksIdList()
    };

    localStorage.setItem("todo-" + objTodoData.dblId, JSON.stringify(objTodoData));

    return true;
}

/**
 * 
 * @param {number} dblId 
 * @returns 
 */
function dbSelect(dblId) {

    const objTodoData = JSON.parse(localStorage.getItem("todo-" + dblId));

    const objTodo = shapeToDo(
        objTodoData.dblId,
        objTodoData.dblProjectId,
        objTodoData.intStatusId,
        objTodoData.strTitle,
        objTodoData.strDescription,
        new Date(objTodoData.dtDueDate),
        objTodoData.intPriority,
        objTodoData.strTag,
        objTodoData.intUserOwnerId,
        objTodoData.intUserCreatorId,
        new Date(objTodoData.dtCreatedOn),
        objTodoData.booIsClosed,
        objTodoData.arrNoteId,
        objTodoData.arrSubTaskId
    );

    return objTodo;
}

function dbComplete(dblTodoId) {

    const objTodo = dbSelect(dblTodoId);

    const objTodoData = {
        dblId: objTodo.getId(),
        dblProjectId: objTodo.getProjectId(),
        intStatusId: STATUS.COMPLETED.id,
        strTitle: objTodo.getTitle(),
        strDescription: objTodo.getDescription(),
        dtDueDate: objTodo.getDueDate(),
        intPriority: objTodo.getPriority(),
        strTag: objTodo.getTag(),
        intUserOwnerId: objTodo.getUserOwnerId(),
        intUserCreatorId: objTodo.getUserCreatorId(),
        dtCreatedOn: objTodo.getCreationDate(),
        booIsClosed: true,
        arrNoteId: objTodo.getNotesIdList(),
        arrSubTaskId: objTodo.getSubTasksIdList()
    }

    localStorage.setItem("todo-" + objTodoData.dblId, JSON.stringify(objTodoData));

    return objTodoData.dblId;
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

/**
 * 
 * @param {number[]} arrTodoId 
 * @returns {{
 *      getId: function(): number,
 *       getProjectId: function(): number,
 *       getStatusId: function(): number,
 *       getTitle: function(): string,
 *       getDescription: function(): string,
 *       getDueDate: function(): Date,
 *       getPriority: function(): number,
 *       getNotesIdList: function(): number[],
 *       getSubTasksIdList: function(): number[],
 *       getTag: function(): string,
 *       getUserOwnerId: function(): number,
 *       getUserCreatorId: function(): number,
 *       getCreationDate: function(): Date,
 *       setPriority: function(number):void,
 *       setTag: function(string):void,
 *       closeToDo: function(): void,
 *       setTitle: function(string):void,
 *       setDescription: function(string):void,
 *       setDueDate: function(Date):void,
 *       setStatusId: function(number):void,
 * }[]}
 */
function dbSelectAll(arrTodoId) {

    const arrTodos = arrTodoId.map(todoId => dbSelect(todoId));
    return arrTodos;
}


function dbSelectByProject(dblProjectId) {

    const objProject = createProjectDAO().dbSelect(dblProjectId, 1);
    return dbSelectAll(objProject.getToDosIdList());
}
/**
 * 
 * @param {Date} dtStartDate 
 * @param {Date} dtEndDate 
 * @param {number} dblOWnerUserId 
 * @returns {{
 *      getId: function(): number,
 *       getProjectId: function(): number,
 *       getStatusId: function(): number,
 *       getTitle: function(): string,
 *       getDescription: function(): string,
 *       getDueDate: function(): Date,
 *       getPriority: function(): number,
 *       getNotesIdList: function(): number[],
 *       getSubTasksIdList: function(): number[],
 *       getTag: function(): string,
 *       getUserOwnerId: function(): number,
 *       getUserCreatorId: function(): number,
 *       getCreationDate: function(): Date,
 *       setPriority: function(number):void,
 *       setTag: function(string):void,
 *       closeToDo: function(): void,
 *       setTitle: function(string):void,
 *       setDescription: function(string):void,
 *       setDueDate: function(Date):void,
 *       setStatusId: function(number):void,
 * }[]}
 */
function dbSelectByDate(dtStartDate, dtEndDate, dblOWnerUserId) {

    const arrProjects = createProjectDAO().dbSelectAll(dblOWnerUserId);

    const arrAllTasks = arrProjects.reduce((prev, curr) => {

        const arrTodoList = dbSelectAll(curr.getToDosIdList());
        return prev.concat(arrTodoList);
    }, []);

    return arrAllTasks.filter(tasks =>
    ((format(tasks.getDueDate(), "yyyy/MM/dd") >= format(dtStartDate, "yyyy/MM/dd")) &&
        ((dtEndDate == null) || (dtEndDate && (format(tasks.getDueDate(), "yyyy/MM/dd") <= format(dtEndDate, "yyyy/MM/dd")))) &&
        (tasks.getStatusId() !== STATUS.COMPLETED.id && tasks.getStatusId() !== STATUS.CLOSED.id)
    ));
}

const objData = { dbInsert: null, dbUpdate: null, dbSelect: null, dbSelectAll: null, dbSelectByDate: null, dbAddSubTaskId: null, dbAddNoteId: null, dbComplete: null, dbRemoveNoteId: null, dbSelectByProject: null };

/**
 * 
 * @returns {{
 * dbInsert: dbInsert, 
 * dbSelect: dbSelect,
 * dbSelectAll: dbSelectAll,
 * dbUpdate: dbUpdate,
 * dbSelectByDate:dbSelectByDate,
 * dbAddSubTaskId:dbAddSubTaskId,
 * dbAddNoteId:dbAddNoteId,
 * dbComplete:dbComplete,
 * dbRemoveNoteId:dbRemoveNoteId,
 * dbSelectByProject:dbSelectByProject
 * }}
 */
function createTodoDAO() {

    if (!objData.dbInsert) {

        objData.dbInsert = dbInsert;
        objData.dbSelect = dbSelect;
        objData.dbSelectAll = dbSelectAll;
        objData.dbUpdate = dbUpdate;
        objData.dbSelectByDate = dbSelectByDate;
        objData.dbAddSubTaskId = dbAddSubTaskId;
        objData.dbAddNoteId = dbAddNoteId;
        objData.dbComplete = dbComplete;
        objData.dbRemoveNoteId = dbRemoveNoteId;
        objData.dbSelectByProject = dbSelectByProject;
    }

    return objData;
}

export { createTodoDAO };