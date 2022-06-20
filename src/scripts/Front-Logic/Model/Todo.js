/**
 * @typedef {Object} Todo
 * @property {function(): string} getId
 * @property {function(): string} getProjectId
 * @property {function(): number} getStatusId
 * @property {function(): string} getTitle
 * @property {function(): string} getDescription
 * @property {function(): Date} getDueDate
 * @property {function(): number} getPriority
 * @property {function(): string[]} getNotesIdList
 * @property {function(): string[]} getSubTasksIdList
 * @property {function(): string} getTag
 * @property {function(): string} getUserOwnerId
 * @property {function(): string} getUserCreatorId
 * @property {function(): Date} getCreationDate
 * @property {function(number):void} setPriority
 * @property {function(string):void} setTag
 * @property {function(): void} closeToDo
 * @property {function(string):void} setTitle
 * @property {function(string):void} setDescription
 * @property {function(Date):void} setDueDate
 * @property {function(number):void} setStatusId
 *
 */

const todoActions = {
  getId: function () {
    return this.strId;
  },
  getProjectId: function () {
    return this.strProjectId;
  },
  getStatusId: function () {
    return this.intStatusId;
  },
  getTitle: function () {
    return this.strTitle;
  },
  getDescription: function () {
    return this.strDescription;
  },
  getDueDate: function () {
    return this.dtDueDate;
  },
  getPriority: function () {
    return this.intPriority;
  },
  getTag: function () {
    return this.strTag;
  },
  getNotesIdList: function () {
    return this.arrNoteId;
  },
  getSubTasksIdList: function () {
    return this.arrSubTaskId;
  },
  getUserOwnerId: function () {
    return this.strUserOwnerId;
  },
  getUserCreatorId: function () {
    return this.strUserCreatorId;
  },
  getCreationDate: function () {
    return this.dtCreatedOn;
  },
  //getOwnerNickName: function () { return this.strOwnerNickName },

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
    this.intStatusId = value;
  },

  setPriority: function (value) {
    this.intPriority = value;
  },
  setTag: function (value) {
    this.strTag = value;
  },
  //addNote: function (value) { this.arrNotes.push(value) },
  //addSubTask: function (value) { this.arrSubTasks.push(value) },
  closeToDo: function () {
    this.booIsClosed = true;
  },
};

/**
 *
 * @param {string} strId
 * @param {string} strProjectId
 * @param {number} intStatusId
 * @param {string} strTitle
 * @param {string} strDescription
 * @param {Date} dtDueDate
 * @param {number} intPriority
 * @param {string} strTag
 * @param {string} strUserOwnerId
 * @param {string} strUserCreatorId
 * @param {Date} dtCreatedOn
 * @param {boolean} booIsClosed
 * @param {string[]} arrNoteId
 * @param {string[]} arrSubTaskId
 * @returns {Todo}
 */
export function shapeToDo(
  strId,
  strProjectId,
  intStatusId,
  strTitle,
  strDescription,
  dtDueDate,
  intPriority,
  strTag,
  strUserOwnerId,
  strUserCreatorId,
  dtCreatedOn,
  booIsClosed,
  arrNoteId,
  arrSubTaskId
) {
  const objToDo = Object.create(todoActions);

  objToDo.strId = strId;
  objToDo.strProjectId = strProjectId;
  objToDo.intStatusId = intStatusId;
  objToDo.strTitle = strTitle;
  objToDo.strDescription = strDescription;
  objToDo.dtDueDate = dtDueDate;
  objToDo.intPriority = intPriority;
  objToDo.strTag = strTag;
  objToDo.arrNoteId = arrNoteId;
  objToDo.arrSubTaskId = arrSubTaskId;
  objToDo.intUserOwnerId = strUserOwnerId;
  objToDo.intUserCreatorId = strUserCreatorId;
  objToDo.dtCreatedOn = dtCreatedOn;
  //objToDo.strOwnerNickName = strOwnerNickName;
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
    getNotesIdList: objToDo.getNotesIdList.bind(objToDo),
    getSubTasksIdList: objToDo.getSubTasksIdList.bind(objToDo),
    getUserOwnerId: objToDo.getUserOwnerId.bind(objToDo),
    getUserCreatorId: objToDo.getUserOwnerId.bind(objToDo),
    getCreationDate: objToDo.getCreationDate.bind(objToDo),
    //getOwnerNickName: objToDo.getOwnerNickName.bind(objToDo),

    setPriority: objToDo.setPriority.bind(objToDo),
    setTag: objToDo.setTag.bind(objToDo),
    //addNote: objToDo.addNote.bind(objToDo),
    //addSubTask: objToDo.addSubTask.bind(objToDo),
    closeToDo: objToDo.closeToDo.bind(objToDo),
    setTitle: objToDo.setTitle.bind(objToDo),
    setDescription: objToDo.setDescription.bind(objToDo),
    setDueDate: objToDo.setDueDate.bind(objToDo),
    setStatusId: objToDo.setStatusId.bind(objToDo),
  };
}
