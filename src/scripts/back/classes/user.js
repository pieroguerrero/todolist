const userActions = {

    getId: function () { return this.id },
    getName: function () { return this.strName },
    getLastName: function () { return this.strLastName },
    getNickName: function () { return this.strNickName },
    getEmail: function () { return this.strEmail },
    getIdUserCreator: function () { return this.idUserCreator },
    getCreationDate: function () { return this.dtCreatedOn },
};

export function createUser(id, strName, strLastName, strNickName, strEmail, idUserCreator, dtCreatedOn) {

    const objUser = Object.create(userActions);

    objUser.id = id;
    objUser.strName = strName;
    objUser.strLastName = strLastName;
    objUser.strNickName = strNickName;
    objUser.strEmail = strEmail;
    objUser.idUserCreator = idUserCreator;
    objUser.dtCreatedOn = dtCreatedOn;

    return {
        getId: objUser.getId.bind(objUser),
        getIdTodo: objNote.getIdTodo.bind(objNote),
        getTitle: objNote.getTitle.bind(objNote),
        getAuthorNickName: objNote.getAuthorNickName.bind(objNote),
        getDescription: objNote.getDescription.bind(objNote),
        getCreationDate: objNote.getCreationDate.bind(objNote)
    }

}

// function bindActionProperties(actions, context) {

//     const bindedActions = {};

//     actions.keys().array.forEach(key => {

//         bindedActions[key] = actions[key].bind(context);
//     });

//     return bindedActions;

// }