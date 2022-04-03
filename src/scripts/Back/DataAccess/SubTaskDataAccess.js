import { shapeSubTask } from "../Model/SubTask";


/**
 * 
 * @param {{
 * getId: function(): number,
 * getIdTodo: function(): number, 
 * getTitle: function(): string,
 * getUserOwnerId: function(): number,
 * getUserCreatorId: function(): number,
 * getDescription: function(): string, 
 * getCreationDate: function(): Date,
 * getDueDate: function(): Date,
 * getStatusId: function(): number,
 * setTitle: function(string):void,
 * setDescription: function(string):void,
 * setDueDate: function(Date):void,
 * setStatusId: function(number):void
 * }} objSubTask 
 */
function dbInsert(objSubTask) {

    const objSubTaskData = {
        dblId: Number(Date.now() + ((Math.random() * 100000).toFixed())),
        intTodoId: objSubTask.getIdTodo(),
        strTitle: objSubTask.getTitle(),
        strDescription: objSubTask.getDescription(),
        dtDueDate: objSubTask.getDueDate(),
        idUserOwner: objSubTask.getUserOwnerId(),
        idUserCreator: objSubTask.getUserCreatorId(),
        idStatus: objSubTask.getStatusId(),
        dtCreatedOn: new Date(),
    };

    localStorage.setItem("project-" + objSubTaskData.dblId, JSON.stringify(objSubTaskData));

    return objSubTaskData.dblId;
}

/**
 * 
 * @param {{
 * getId: function(): number,
 * getIdTodo: function(): number, 
 * getTitle: function(): string,
 * getUserOwnerId: function(): number,
 * getUserCreatorId: function(): number,
 * getDescription: function(): string, 
 * getCreationDate: function(): Date,
 * getDueDate: function(): Date,
 * getStatusId: function(): number,
 * setTitle: function(string):void,
 * setDescription: function(string):void,
 * setDueDate: function(Date):void,
 * setStatusId: function(number):void
 * }} objSubTask 
 */
function dbUpdate(objSubTask) {

    const objSubTaskData = {
        dblId: objSubTask.getId(),
        intTodoId: objSubTask.getIdTodo(),
        strTitle: objSubTask.getTitle(),
        strDescription: objSubTask.getDescription(),
        dtDueDate: objSubTask.getDueDate(),
        idUserOwner: objSubTask.getUserOwnerId(),
        idUserCreator: objSubTask.getUserCreatorId(),
        idStatus: objSubTask.getStatusId(),
        dtCreatedOn: objSubTask.getCreationDate(),
    };

    localStorage.setItem("project-" + objSubTaskData.dblId, JSON.stringify(objSubTaskData));

    return objSubTaskData.dblId;
}

function dbSelect(intSubTaskId) {

    const objSubTaskData = JSON.parse(localStorage.getItem("project-" + intSubTaskId));

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
export function createSubTaskDataConnexion() {

    if (!objData.dbInsert) {

        objData.dbInsert = dbInsert;
        objData.dbSelect = dbSelect;
        objData.dbUpdate = dbUpdate;
    }

    return objData;
}