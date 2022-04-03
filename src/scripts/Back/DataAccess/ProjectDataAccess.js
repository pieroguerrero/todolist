//https://dev.to/j471n/how-to-use-web-storage-api-3o28

import { shapeProject } from "../Model/Project";
/**
 * @param {{
 * getId: function(): number, 
 * getStatusId: function(): number,
 * getTitle: function(): string,
 * getDescription: function(): string,
 * getStartDate: function(): Date,
 * getEndDate: function(): Date,
 * getUserOwnerId: function(): number,
 * getUserCreatorId: function(): number,
 * getCreationDate: function(): Date,
 * setTitle: function(string):void,
 * setDescription: function(string):void,
 * setStartDate: function(Date):void,
 * setEndDate: function(Date):void,
 * setStatusId: function(number):void
 * }} objProject 
 * @returns 
 */
function dbInsert(objProject) {

    const objProjectData = {

        dblId: Number(Date.now() + ((Math.random() * 100000).toFixed())),
        intStatusId: objProject.getStatusId(),
        strTitle: objProject.getTitle(),
        strDescription: objProject.getDescription(),
        dtStartDate: objProject.getStartDate(),
        dtEndDate: objProject.getEndDate(),
        intUserOwnerId: objProject.getUserOwnerId(),
        intUserCreatorId: objProject.getUserCreatorId(),
        dtCreatedOn: new Date(),
    };

    localStorage.setItem("project-" + objProjectData.dblId, JSON.stringify(objProjectData));

    return objProjectData.dblId;
}

/**
 * @param {{
 * getId: function(): number, 
 * getStatusId: function(): number,
 * getTitle: function(): string,
 * getDescription: function(): string,
 * getStartDate: function(): Date,
 * getEndDate: function(): Date,
 * getUserOwnerId: function(): number,
 * getUserCreatorId: function(): number,
 * getCreationDate: function(): Date,
 * setTitle: function(string):void,
 * setDescription: function(string):void,
 * setStartDate: function(Date):void,
 * setEndDate: function(Date):void,
 * setStatusId: function(number):void
 * }} objProject 
 * @returns 
 */

function dbUpdate(objProject) {

    const objProjectData = {

        dblId: objProject.getId(),
        intStatusId: objProject.getStatusId(),
        strTitle: objProject.getTitle(),
        strDescription: objProject.getDescription(),
        dtStartDate: objProject.getStartDate(),
        dtEndDate: objProject.getEndDate(),
        intUserOwnerId: objProject.getUserOwnerId(),
        intUserCreatorId: objProject.getUserCreatorId(),
        dtCreatedOn: objProject.getCreationDate(),
    };

    localStorage.setItem("project-" + objProjectData.dblId, JSON.stringify(objProjectData));

    return objProjectData.dblId;
}

function dbSelect(intProjectId) {

    const objProjectData = JSON.parse(localStorage.getItem("project-" + intProjectId));

    const objProject = shapeProject(

        objProjectData.dblId,
        objProjectData.strTitle,
        objProjectData.strDescription,
        objProjectData.dtStartDate,
        objProjectData.dtEndDate,
        objProjectData.intStatusId,
        objProjectData.intUserOwnerId,
        objProjectData.intUserCreatorId,
        objProjectData.dtCreatedOn
    );

    //objProject.setToDos(objProjectData.arrToDosIDs);

    return objProject;
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
export function createProjectDataConnexion() {

    if (!objData.dbInsert) {

        objData.dbInsert = dbInsert;
        objData.dbSelect = dbSelect;
        objData.dbUpdate = dbUpdate;
    }

    return objData;
}
