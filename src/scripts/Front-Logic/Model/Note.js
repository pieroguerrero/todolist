/**
 * @typedef {Object} Note
 * @property {function(): string} getId
 * @property {function(): string} getIdTodo
 * @property {function(): string} getTitle
 * @property {function(): string} getDescription
 * @property {function(): Date} getCreationDate
 * @property {function(): string} getUserAuthorId
 * @property {function(string):void} setTitle
 * @property {function(string):void} setDescription
 */

const noteActions = {
  getId: function () {
    return this.strId;
  },
  getIdTodo: function () {
    return this.strTodoId;
  },
  getTitle: function () {
    return this.strTitle;
  },
  getDescription: function () {
    return this.strDescription;
  },
  getCreationDate: function () {
    return this.dtCreatedOn;
  },
  getUserAuthorId: function () {
    return this.strUserAuthorId;
  },
  setTitle: function (value) {
    this.strTitle = value;
  },
  setDescription: function (value) {
    this.strDescription = value;
  },
};

/**
 *
 * @param {string} strId
 * @param {string} strTodoId
 * @param {string} strTitle
 * @param {string} strDescription
 * @param {string} strUserAuthorId
 * @param {Date} dtCreatedOn
 * @returns {Note}
 */

export function shapeNote(
  strId,
  strTodoId,
  strTitle,
  strDescription,
  strUserAuthorId,
  dtCreatedOn
) {
  const objNote = Object.create(noteActions);

  objNote.strId = strId;
  objNote.strTodoId = strTodoId;
  objNote.strTitle = strTitle;
  objNote.strDescription = strDescription;
  objNote.strUserAuthorId = strUserAuthorId;
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
