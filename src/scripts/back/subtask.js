import { STATUS } from "./status.js";

const subTaskActions = {

    getId: function () { return this.id },
    getIdTodo: function () { return this.idTodo },
    getTitle: function () { return this.strTitle },
    getOwnerNickName: function () { return this.strOwnerNickName },
    getUserOwnerId: function () { return this.idUserOwner },
    getDescription: function () { return this.strDescription },
    getCreationDate: function () { return this.dtCreatedOn },
    getDueDate: function () { return this.dtDueDate },
    getStatusId: function () { return this.idStatus },
    getStatusName: function () { return Object.values(STATUS).filter(element => element.id === this.idStatus)[0].name },

    setTitle: function (value) { this.strTitle = value },
    setDescription: function (value) { this.strDescription = value },
    setDueDate: function (value) { this.dtDueDate = value },
    setStatusId: function (value) { this.idStatus = value },

};

export function createSubTask(idTodo, strTitle, strDescription, dtDueDate, idUserOwner, strOwnerNickName, idUserCreator, strCreatorNickName, idStatus) {

    const objSubTask = Object.create(subTaskActions);

    objSubTask.id = Date.now() + ((Math.random() * 100000).toFixed());
    objSubTask.idTodo = idTodo;
    objSubTask.strTitle = strTitle;
    objSubTask.strDescription = strDescription;
    objSubTask.dtDueDate = dtDueDate;
    objSubTask.idUserOwner = idUserOwner;
    objSubTask.strOwnerNickName = strOwnerNickName;
    objSubTask.idUserCreator = idUserCreator;
    objSubTask.strCreatorNickName = strCreatorNickName;
    objSubTask.idStatus = idStatus;
    objSubTask.dtCreatedOn = new Date();

    return {
        getId: objSubTask.getId.bind(objSubTask),
        getIdTodo: objSubTask.idTodo.bind(objSubTask),
        getTitle: objSubTask.getTitle.bind(objSubTask),
        getOwnerNickName: objSubTask.getOwnerNickName.bind(objSubTask),
        getUserOwnerId: objSubTask.getUserOwnerId.bind(objSubTask),
        getDescription: objSubTask.getDescription.bind(objSubTask),
        getCreationDate: objSubTask.getCreationDate.bind(objSubTask),
        getDueDate: objSubTask.getDueDate.bind(objSubTask),
        getStatusId: objSubTask.getStatusId.bind(objSubTask),
        getStatusName: objSubTask.getStatusName.bind(objSubTask),

        setTitle: objSubTask.setTitle.bind(objSubTask),
        setDescription: objSubTask.setDescription.bind(objSubTask),
        setDueDate: objSubTask.setDueDate.bind(objSubTask),
        setStatusId: objSubTask.setStatusId.bind(objSubTask),
    }

}