// function bindActionProperties(actions, context) {

//     const bindedActions = {};

//     Object.keys(actions).forEach(key => {

//         bindedActions[key] = actions[key].bind(context);
//     });

//     return bindedActions;

// }



const subTaskActions = {

    getId: function () { return this.id },
    getIdTodo: function () { return this.intTodoId },
    getTitle: function () { return this.strTitle },
    //getOwnerNickName: function () { return this.strOwnerNickName },
    getUserOwnerId: function () { return this.idUserOwner },
    getUserCreatorId: function () { return this.idUserCreator },
    getDescription: function () { return this.strDescription },
    getCreationDate: function () { return this.dtCreatedOn },
    getDueDate: function () { return this.dtDueDate },
    getStatusId: function () { return this.idStatus },
    //getStatusName: function () { return Object.values(STATUS).filter(element => element.id === this.idStatus)[0].name },

    setTitle: function (value) { this.strTitle = value },
    setDescription: function (value) { this.strDescription = value },
    setDueDate: function (value) { this.dtDueDate = value },
    setStatusId: function (value) { this.idStatus = value },

};

//Object.defineProperty(subTaskActions, 'getUserOwnerId', { enumerable: false });

/**
 * 
 * @param {number} dblId 
 * @param {Date} dtCreatedOn 
 * @param {number} intTodoId 
 * @param {string} strTitle 
 * @param {string} strDescription 
 * @param {Date} dtDueDate 
 * @param {number} idUserOwner 
 * @param {number} idUserCreator 
 * @param {number} idStatus 
 * @returns {{
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
 * }}
  */

export function shapeSubTask(dblId, dtCreatedOn, intTodoId, strTitle, strDescription, dtDueDate, idUserOwner, idUserCreator, idStatus) {

    const objSubTask = Object.create(subTaskActions);

    objSubTask.id = dblId;
    objSubTask.intTodoId = intTodoId;
    objSubTask.strTitle = strTitle;
    objSubTask.strDescription = strDescription;
    objSubTask.dtDueDate = dtDueDate;
    objSubTask.idUserOwner = idUserOwner;
    //objSubTask.strOwnerNickName = strOwnerNickName;
    objSubTask.idUserCreator = idUserCreator;
    //objSubTask.strCreatorNickName = strCreatorNickName;
    objSubTask.idStatus = idStatus;
    objSubTask.dtCreatedOn = dtCreatedOn;

    //return Object.assign({}, bindActionProperties(subTaskActions, objSubTask))

    return {

        getId: objSubTask.getId.bind(objSubTask),
        //get hola() { return "hola"; },
        getIdTodo: objSubTask.getIdTodo.bind(objSubTask),
        getTitle: objSubTask.getTitle.bind(objSubTask),
        //getOwnerNickName: objSubTask.getOwnerNickName.bind(objSubTask),
        getUserOwnerId: objSubTask.getUserOwnerId.bind(objSubTask),
        getUserCreatorId: objSubTask.getUserCreatorId.bind(objSubTask),
        getDescription: objSubTask.getDescription.bind(objSubTask),
        getCreationDate: objSubTask.getCreationDate.bind(objSubTask),
        getDueDate: objSubTask.getDueDate.bind(objSubTask),
        getStatusId: objSubTask.getStatusId.bind(objSubTask),
        //getStatusName: objSubTask.getStatusName.bind(objSubTask),

        setTitle: objSubTask.setTitle.bind(objSubTask),
        setDescription: objSubTask.setDescription.bind(objSubTask),
        setDueDate: objSubTask.setDueDate.bind(objSubTask),
        setStatusId: objSubTask.setStatusId.bind(objSubTask),
    }

}