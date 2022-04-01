//https://dev.to/j471n/how-to-use-web-storage-api-3o28

import { shapeProject } from "../classes/project";

/**
 * 
 * @param {*} objProject 
 * @returns true if the transaction succeed, otherwhise returns false.
 */

function insertObj(objProject) {

    const objProjectData = {};

    objProjectData.dblId = Date.now() + ((Math.random() * 100000).toFixed());
    objProjectData.strTitle = objProject.getTitle();
    objProjectData.strDescription = objProject.getDescription();
    objProjectData.dtStartDate = objProject.getStartDate();
    objProjectData.dtEndDate = objProject.getEndDate();
    objProjectData.intStatusId = objProject.getStatusId();
    objProjectData.intUserOwnerId = objProject.getUserOwnerId();
    //objProjectData.strOwnerNickName = objProject.getOwnerNickName();
    objProjectData.intUserCreatorId = objProject.getUserCreatorId();
    objProjectData.dtCreatedOn = new Date();
    objProjectData.arrToDosIDs = objProject.getToDosList().map(objTodoBasicInfo => objTodoBasicInfo.intId);

    localStorage.setItem("project-" + objProjectData.dblId, JSON.stringify(objProjectData));

    return objProjectData.dblId;
}

function readObj(intProjectId) {

    const objProjectData = JSON.parse(localStorage.getItem("project-" + intProjectId));

    const objProject = shapeProject(

        objProjectData.dblId,
        objProjectData.strTitle,
        objProjectData.strDescription,
        objProjectData.dtStartDate,
        objProjectData.dtEndDate,
        objProjectData.intStatusId,
        objProjectData.intUserOwnerId,
        null,
        objProjectData.intUserCreatorId,
        objProjectData.dtCreatedOn
    );

    objProject.setToDos(objProjectData.arrToDosIDs);

    return objProject;
}

const objData = {};

export function createProjectDataConnexion() {

    if (Object.keys(objData).length === 0) {
        objData.insertObj = insertObj;
        objData.readObj = readObj;
    }

    return objData;
}
