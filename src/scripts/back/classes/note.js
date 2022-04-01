const noteActions = {

    getId: function () { return this.id },
    getIdTodo: function () { return this.idTodo },
    getTitle: function () { return this.strTitle },
    getAuthorNickName: function () { return this.strAuthorNickName },
    getDescription: function () { return this.strDescription },
    getCreationDate: function () { return this.dtCreatedOn },

    setTitle: function (value) { this.strTitle = value },
    setDescription: function (value) { this.strDescription = value },
};

export function shapeNote(id, idTodo, strTitle, strDescription, idUserAuthor, strAuthorNickName, dtCreatedOn) {

    const objNote = Object.create(noteActions);

    objNote.id = id;
    objNote.idTodo = idTodo;
    objNote.strTitle = strTitle;
    objNote.strDescription = strDescription;
    objNote.idAuthor = idUserAuthor;
    objNote.strAuthorNickName = strAuthorNickName;
    objNote.dtCreatedOn = dtCreatedOn;

    return {
        getId: objNote.getId.bind(objNote),
        getIdTodo: objNote.getIdTodo.bind(objNote),
        getTitle: objNote.getTitle.bind(objNote),
        getAuthorNickName: objNote.getAuthorNickName.bind(objNote),
        getDescription: objNote.getDescription.bind(objNote),
        getCreationDate: objNote.getCreationDate.bind(objNote),

        setTitle: objNote.setTitle.bind(objNote),
        setDescription: objNote.setDescription.bind(objNote),
    };
}