
const todoActions = {

    getId: function () { return this.dblId },
    getProjectId: function () { return this.dblProjectId },
    getStatusId: function () { return this.intStatusId },
    getTitle: function () { return this.strTitle },
    getDescription: function () { return this.strDescription },
    getDueDate: function () { return this.dtDueDate },
    getPriority: function () { return this.intPriority },
    getTag: function () { return this.strTag },
    getNotesList: function () { return this.arrNotes },
    getSubTasksList: function () { return this.arrSubTasks },
    getUserOwnerId: function () { return this.intUserOwnerId },
    getUserCreatorId: function () { return this.intUserCreatorId },
    getCreationDate: function () { return this.dtCreatedOn },
    getOwnerNickName: function () { return this.strOwnerNickName },

    setTitle: function (value) { this.strTitle = value },
    setDescription: function (value) { this.strDescription = value },
    setDueDate: function (value) { this.dtDueDate = value },
    setStatusId: function (value) { this.intStatusId = value },

    setPriority: function (value) { this.intPriority = value },
    setTag: function (value) { this.strTag = value },
    addNote: function (value) { this.arrNotes.push(value) },
    addSubTask: function (value) { this.arrSubTasks.push(value) },
    closeToDo: function () { this.booIsClosed = true },


};

export function shapeToDo(fltId, dblProjectId, intStatusId, strTitle, strDescription, dtDueDate, intPriority, strTag, arrNotes, arrSubTasks, intUserOwnerId, strOwnerNickName, intUserCreatorId, dtCreatedOn, booIsClosed) {

    const objToDo = Object.create(todoActions);

    objToDo.dblId = fltId;
    objToDo.dblProjectId = dblProjectId;
    objToDo.intStatusId = intStatusId;
    objToDo.strTitle = strTitle;
    objToDo.strDescription = strDescription;
    objToDo.dtDueDate = dtDueDate;
    objToDo.intPriority = intPriority;
    objToDo.strTag = strTag;
    objToDo.arrNotes = arrNotes;
    objToDo.arrSubTasks = arrSubTasks;
    objToDo.intUserOwnerId = intUserOwnerId;
    objToDo.intUserCreatorId = intUserCreatorId;
    objToDo.dtCreatedOn = dtCreatedOn;
    objToDo.strOwnerNickName = strOwnerNickName;
    objToDo.booIsClosed = booIsClosed;

    return {
        getId: objToDo.getId.bind(objToDo),
        getProjectId: objToDo.getProjectId.bind(objToDo),
        getStatusId: objToDo.getStatusId.bind(objToDo),
        getTitle: objToDo.getTitle.bind(objToDo),
        getDescription: objToDo.getDescription.bind(objToDo),
        getDueDate: objToDo.getDueDate.bind(objToDo),
        getPriority: objToDo.getPriority.bind(objToDo),
        getTag: objToDo.getTag.bind(objToDo),
        getNotesList: objToDo.getNotesList.bind(objToDo),
        getSubTasksList: objToDo.getNotesList.bind(objToDo),
        getUserOwnerId: objToDo.getUserOwnerId.bind(objToDo),
        getUserCreatorId: objToDo.getUserOwnerId.bind(objToDo),
        getCreationDate: objToDo.getCreationDate.bind(objToDo),
        getOwnerNickName: objToDo.getOwnerNickName.bind(objToDo),

        setPriority: objToDo.setPriority.bind(objToDo),
        setTag: objToDo.setTag.bind(objToDo),
        addNote: objToDo.addNote.bind(objToDo),
        addSubTask: objToDo.addSubTask.bind(objToDo),
        closeToDo: objToDo.closeToDo.bind(objToDo),
        setTitle: objToDo.setTitle.bind(objToDo),
        setDescription: objToDo.setDescription.bind(objToDo),
        setDueDate: objToDo.setDueDate.bind(objToDo),
        setStatusId: objToDo.setStatusId.bind(objToDo),
    }

}