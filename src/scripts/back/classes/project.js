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
    getOwnerNickName: function () { return this.strOwnerNickName },
    getToDosList: function () { return this.arrToDos },

    setTitle: function (value) { this.strTitle = value },
    setDescription: function (value) { this.strDescription = value },
    setStartDate: function (value) { this.dtStartDate = value },
    setEndDate: function (value) { this.dtEndDate = value },
    setStatusId: function (value) { this.intStatusId = value },

    setToDos: function (value) { this.arrToDos = value },
    addToDo: function (value) { this.arrSubTasks.push(value) },

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
 * @param {string} strOwnerNickName 
 * @param {number} intUserCreatorId 
 * @param {Date} dtCreatedOn 
 * @returns 
 */

export function shapeProject(dblId, strTitle, strDescription, dtStartDate, dtEndDate, intStatusId, intUserOwnerId, strOwnerNickName, intUserCreatorId, dtCreatedOn) {

    const objProject = Object.create(projectActions);

    objProject.dblId = dblId;
    objProject.strTitle = strTitle;
    objProject.strDescription = strDescription;
    objProject.dtStartDate = dtStartDate;
    objProject.dtEndDate = dtEndDate;
    objProject.intStatusId = intStatusId;
    objProject.intUserOwnerId = intUserOwnerId;
    objProject.strOwnerNickName = strOwnerNickName;
    objProject.intUserCreatorId = intUserCreatorId;
    objProject.dtCreatedOn = dtCreatedOn;
    objProject.arrToDos = [];

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
        getOwnerNickName: objProject.getOwnerNickName.bind(objProject),

        /**
         * returns an array with basic information about Todos:
         * * Array< {intId, strTitle, dtDueDate} >
         */
        getToDosList: objProject.getToDosList.bind(objProject),

        setTitle: objProject.setTitle.bind(objProject),
        setDescription: objProject.setDescription.bind(objProject),
        setStartDate: objProject.setStartDate.bind(objProject),
        setEndDate: objProject.setEndDate.bind(objProject),
        setStatusId: objProject.setStatusId.bind(objProject),

        setToDos: objProject.setToDos.bind(objProject),
        addToDo: objProject.addToDo.bind(objProject),
    }
}