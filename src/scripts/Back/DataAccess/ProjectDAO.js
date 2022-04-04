//https://dev.to/j471n/how-to-use-web-storage-api-3o28

import { shapeProject } from "../Model/Project";


/**
 * 
 * @param {string} strTitle 
 * @param {string} strDescription 
 * @param {Date} dtStartDate 
 * @param {Date} dtEndDate 
 * @param {number} intStatusId 
 * @param {number} intUserOwnerId 
 * @param {number} intUserCreatorId 
 * @returns {number} The Id of the recently registered Project, otherwhise returns -1.
 */
function dbInsert(strTitle, strDescription, dtStartDate, dtEndDate, intStatusId, intUserOwnerId, intUserCreatorId) {

    const objProjectData = {

        dblId: Number(Date.now() + ((Math.random() * 100000).toFixed())),
        intStatusId: intStatusId,
        strTitle: strTitle,
        strDescription: strDescription,
        dtStartDate: dtStartDate,
        dtEndDate: dtEndDate,
        intUserOwnerId: intUserOwnerId,
        intUserCreatorId: intUserCreatorId,
        dtCreatedOn: new Date(),
        arrToDoIds: []
    };

    localStorage.setItem("project-" + objProjectData.dblId, JSON.stringify(objProjectData));

    return objProjectData.dblId;
}

/**
 * 
 * @param {number} dblId 
 * @param {string} strTitle 
 * @param {string} strDescription 
 * @param {Date} dtStartDate 
 * @param {Date} dtEndDate 
 * @param {number} intStatusId 
 * @param {number} intUserOwnerId 
 * @returns {number} The Id of the recently updated Project, otherwhise returns -1.
 */
function dbUpdate(dblId, strTitle, strDescription, dtStartDate, dtEndDate, intStatusId, intUserOwnerId) {

    const objProject = dbSelect(dblId);

    const objProjectData = {

        dblId: dblId,
        intStatusId: intStatusId,
        strTitle: strTitle,
        strDescription: strDescription,
        dtStartDate: dtStartDate,
        dtEndDate: dtEndDate,
        intUserOwnerId: intUserOwnerId,
        intUserCreatorId: objProject.getUserCreatorId(),
        dtCreatedOn: objProject.getCreationDate(),
        arrToDoIds: objProject.getToDosIdList()
    };

    localStorage.setItem("project-" + objProjectData.dblId, JSON.stringify(objProjectData));

    return objProjectData.dblId;
}
/**
 * 
 * @param {number} intProjectId 
 * @returns 
 */
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
        objProjectData.dtCreatedOn,
        objProjectData.arrToDoIds
    );

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
export function createProjectDAO() {

    if (!objData.dbInsert) {

        objData.dbInsert = dbInsert;
        objData.dbSelect = dbSelect;
        objData.dbUpdate = dbUpdate;
    }

    return objData;
}
