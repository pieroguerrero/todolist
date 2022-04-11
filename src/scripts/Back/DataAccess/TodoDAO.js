import { shapeToDo } from "../Model/Todo";
import { createProjectDAO } from "./ProjectDAO";
import format from "date-fns/format";

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

/**
 * 
 * @param {Date} dtDate 
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
function dbSelectByDate(dtDate, dblOWnerUserId) {

    const arrProjects = createProjectDAO().dbSelectAll(dblOWnerUserId);

    const arrAllTasks = arrProjects.reduce((prev, curr) => {

        const arrTodoList = dbSelectAll(curr.getToDosIdList());
        return prev.concat(arrTodoList);
    }, []);

    return arrAllTasks.filter(tasks => (format(tasks.getDueDate(), "yyyy/MM/dd") === format(dtDate, "yyyy/MM/dd")));
}

const objData = { dbInsert: null, dbUpdate: null, dbSelect: null, dbSelectAll: null, dbSelectByDate: null };

/**
 * 
 * @returns {{
 * dbInsert: dbInsert, 
 * dbSelect: dbSelect,
 * dbSelectAll: dbSelectAll,
 * dbUpdate: dbUpdate,
 * dbSelectByDate:dbSelectByDate
 * }}
 */
function createTodoDAO() {

    if (!objData.dbInsert) {

        objData.dbInsert = dbInsert;
        objData.dbSelect = dbSelect;
        objData.dbSelectAll = dbSelectAll;
        objData.dbUpdate = dbUpdate;
        objData.dbSelectByDate = dbSelectByDate;
    }

    return objData;
}

export { createTodoDAO };