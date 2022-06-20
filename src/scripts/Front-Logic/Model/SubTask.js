/**
 * @typedef {Object} SubTask
 * @property {function(): string} getId
 * @property {function(): string} getIdTodo
 * @property {function(): string} getTitle
 * @property {function(): string} getUserOwnerId
 * @property {function(): string} getUserCreatorId
 * @property {function(): string} getDescription
 * @property {function(): Date} getCreationDate
 * @property {function(): Date} getDueDate
 * @property {function(): number} getStatusId
 * @property {function(string):void} setTitle
 * @property {function(string):void} setDescription
 * @property {function(Date):void} setDueDate
 * @property {function(number):void} setStatusId
 */

const subTaskActions = {
  getId: function () {
    return this.id;
  },
  getIdTodo: function () {
    return this.intTodoId;
  },
  getTitle: function () {
    return this.strTitle;
  },
  //getOwnerNickName: function () { return this.strOwnerNickName },
  getUserOwnerId: function () {
    return this.idUserOwner;
  },
  getUserCreatorId: function () {
    return this.idUserCreator;
  },
  getDescription: function () {
    return this.strDescription;
  },
  getCreationDate: function () {
    return this.dtCreatedOn;
  },
  getDueDate: function () {
    return this.dtDueDate;
  },
  getStatusId: function () {
    return this.idStatus;
  },

  setTitle: function (value) {
    this.strTitle = value;
  },
  setDescription: function (value) {
    this.strDescription = value;
  },
  setDueDate: function (value) {
    this.dtDueDate = value;
  },
  setStatusId: function (value) {
    this.idStatus = value;
  },
};

/**
 *
 * @param {string} strId
 * @param {Date} dtCreatedOn
 * @param {string} strTodoId
 * @param {string} strTitle
 * @param {string} strDescription
 * @param {Date} dtDueDate
 * @param {string} strIdUserOwner
 * @param {string} strIdUserCreator
 * @param {number} idStatus
 * @returns {SubTask}
 */

export function shapeSubTask(
  strId,
  dtCreatedOn,
  strTodoId,
  strTitle,
  strDescription,
  dtDueDate,
  strIdUserOwner,
  strIdUserCreator,
  idStatus
) {
  const objSubTask = Object.create(subTaskActions);

  objSubTask.id = strId;
  objSubTask.intTodoId = strTodoId;
  objSubTask.strTitle = strTitle;
  objSubTask.strDescription = strDescription;
  objSubTask.dtDueDate = dtDueDate;
  objSubTask.idUserOwner = strIdUserOwner;
  objSubTask.idUserCreator = strIdUserCreator;
  objSubTask.idStatus = idStatus;
  objSubTask.dtCreatedOn = dtCreatedOn;

  return {
    getId: objSubTask.getId.bind(objSubTask),
    getIdTodo: objSubTask.getIdTodo.bind(objSubTask),
    getTitle: objSubTask.getTitle.bind(objSubTask),
    getUserOwnerId: objSubTask.getUserOwnerId.bind(objSubTask),
    getUserCreatorId: objSubTask.getUserCreatorId.bind(objSubTask),
    getDescription: objSubTask.getDescription.bind(objSubTask),
    getCreationDate: objSubTask.getCreationDate.bind(objSubTask),
    getDueDate: objSubTask.getDueDate.bind(objSubTask),
    getStatusId: objSubTask.getStatusId.bind(objSubTask),

    setTitle: objSubTask.setTitle.bind(objSubTask),
    setDescription: objSubTask.setDescription.bind(objSubTask),
    setDueDate: objSubTask.setDueDate.bind(objSubTask),
    setStatusId: objSubTask.setStatusId.bind(objSubTask),
  };
}
