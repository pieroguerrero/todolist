const projectActions = {

    getId: function () { return this.dblId },
    getStatusId: function () { return this.intStatusId },
    getTitle: function () { return this.strTitle },
    getDescription: function () { return this.strDescription },
    getStartDate: function () { return this.dtStartDate },
    getEndDate: function () { return this.dtEndDate },
    getUserOwnerId: function () { return this.intUserOwnerId },
    getUserCreatorId: function () { return this.intUserCreatorId },
    getCreationDate: function () { return this.dtCreatedOn },
    getToDosIdList: function () { return this.arrToDoIds },

    setTitle: function (value) { this.strTitle = value },
    setDescription: function (value) { this.strDescription = value },
    setStartDate: function (value) { this.dtStartDate = value },
    setEndDate: function (value) { this.dtEndDate = value },
    setStatusId: function (value) { this.intStatusId = value },

    //setToDos: function (value) { this.arrToDos = value },
    //addToDo: function (value) { this.arrSubTasks.push(value) },

};

/**
 * 
 * @param {number} dblId 
 * @param {string} strTitle 
 * @param {string} strDescription 
 * @param {Date} dtStartDate 
 * @param {Date} dtEndDate 
 * @param {number} intStatusId 
 * @param {number} intUserOwnerId 
 * @param {number} intUserCreatorId 
 * @param {Date} dtCreatedOn 
 * @param {number[]} arrToDoIds
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
 * }}
 */

export function shapeProject(dblId, strTitle, strDescription, dtStartDate, dtEndDate, intStatusId, intUserOwnerId, intUserCreatorId, dtCreatedOn, arrToDoIds) {

    const objProject = Object.create(projectActions);

    objProject.dblId = dblId;
    objProject.strTitle = strTitle;
    objProject.strDescription = strDescription;
    objProject.dtStartDate = dtStartDate;
    objProject.dtEndDate = dtEndDate;
    objProject.intStatusId = intStatusId;
    objProject.intUserOwnerId = intUserOwnerId;
    objProject.intUserCreatorId = intUserCreatorId;
    objProject.dtCreatedOn = dtCreatedOn;
    objProject.arrToDoIds = arrToDoIds;

    return {

        getId: objProject.getId.bind(objProject),
        getStatusId: objProject.getStatusId.bind(objProject),
        getTitle: objProject.getTitle.bind(objProject),
        getDescription: objProject.getDescription.bind(objProject),
        getStartDate: objProject.getStartDate.bind(objProject),
        getEndDate: objProject.getEndDate.bind(objProject),
        getUserOwnerId: objProject.getUserOwnerId.bind(objProject),
        getUserCreatorId: objProject.getUserCreatorId.bind(objProject),
        getCreationDate: objProject.getCreationDate.bind(objProject),
        getToDosIdList: objProject.getToDosIdList.bind(objProject),

        setTitle: objProject.setTitle.bind(objProject),
        setDescription: objProject.setDescription.bind(objProject),
        setStartDate: objProject.setStartDate.bind(objProject),
        setEndDate: objProject.setEndDate.bind(objProject),
        setStatusId: objProject.setStatusId.bind(objProject),

        //setToDos: objProject.setToDos.bind(objProject),
        //addToDo: objProject.addToDo.bind(objProject),
    }
}