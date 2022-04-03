const noteActions = {

    getId: function () { return this.id },
    getIdTodo: function () { return this.idTodo },
    getTitle: function () { return this.strTitle },
    getDescription: function () { return this.strDescription },
    getCreationDate: function () { return this.dtCreatedOn },
    getUserAuthorId: function () { return this.idAuthor },
    setTitle: function (value) { this.strTitle = value },
    setDescription: function (value) { this.strDescription = value },
};

/**
 * 
 * @param {number} id 
 * @param {number} idTodo 
 * @param {string} strTitle 
 * @param {string} strDescription 
 * @param {number} idUserAuthor 
 * @param {Date} dtCreatedOn 
 * @returns {{
 *       getId: function(): number,
 *       getIdTodo: function(): number,
 *       getTitle: function(): string,
 *       getDescription: function(): string,
 *       getCreationDate: function(): Date,
 *       getUserAuthorId: function(): number,
 *       setTitle: function(string):void,
 *       setDescription: function(string):void,
 * }}
 */

export function shapeNote(id, idTodo, strTitle, strDescription, idUserAuthor, dtCreatedOn) {

    const objNote = Object.create(noteActions);

    objNote.id = id;
    objNote.idTodo = idTodo;
    objNote.strTitle = strTitle;
    objNote.strDescription = strDescription;
    objNote.idAuthor = idUserAuthor;
    objNote.dtCreatedOn = dtCreatedOn;

    return {
        getId: objNote.getId.bind(objNote),
        getIdTodo: objNote.getIdTodo.bind(objNote),
        getTitle: objNote.getTitle.bind(objNote),
        getDescription: objNote.getDescription.bind(objNote),
        getCreationDate: objNote.getCreationDate.bind(objNote),
        getUserAuthorId: objNote.getUserAuthorId.bind(objNote),
        setTitle: objNote.setTitle.bind(objNote),
        setDescription: objNote.setDescription.bind(objNote),
    };
}