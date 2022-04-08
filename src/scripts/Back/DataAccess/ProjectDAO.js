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

    const projectsListRaw = localStorage.getItem("projects-list");
    const arrProjectsList = projectsListRaw ? JSON.parse(projectsListRaw) : [];
    arrProjectsList.push(objProjectData.dblId);
    localStorage.setItem("projects-list", JSON.stringify(arrProjectsList));

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

    const objProject = dbSelect(dblId, intUserOwnerId);

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
 * @param {number} dblProjectId 
 * @param {number} dblOWnerUserId 
 * @returns 
 */
function dbSelect(dblProjectId, dblOWnerUserId) {

    const objProjectData = JSON.parse(localStorage.getItem("project-" + dblProjectId));

    if (objProjectData) {

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
}

/**
 * @param {number} dblOWnerUserId
 * @returns {{
 * getId: function(): number, 
 * getStatusId: function(): number,
 * getTitle: function(): string,
 * getDescription: function(): string,
 * getStartDate: function(): Date,
 * getEndDate: function(): Date,
 * getUserOwnerId: function(): number,
 * getUserCreatorId: function(): number,
 * getCreationDate: function(): Date,
 * getToDosIdList: function(): number[],
 * setTitle: function(string):void,
 * setDescription: function(string):void,
 * setStartDate: function(Date):void,
 * setEndDate: function(Date):void,
 * setStatusId: function(number):void
 * }[]}
 */
function dbSelectAll(dblOWnerUserId) {

    const arrProjectsId = JSON.parse(localStorage.getItem("projects-list"));

    const arrProjects = arrProjectsId.map(projectId => dbSelect(projectId, dblOWnerUserId));
    return arrProjects;
}

const objData = { dbInsert: null, dbUpdate: null, dbSelect: null, dbSelectAll: null };

/**
 * 
 * @returns {{
 * dbInsert: dbInsert, 
 * dbSelect: dbSelect,
 * dbSelectAll:dbSelectAll,
 * dbUpdate: dbUpdate
 * }}
 */
export function createProjectDAO() {

    if (!objData.dbInsert) {

        objData.dbInsert = dbInsert;
        objData.dbSelect = dbSelect;
        objData.dbSelectAll = dbSelectAll;
        objData.dbUpdate = dbUpdate;
    }

    return objData;
}
