/**
 * @typedef {Object} Project
 * @property {function(): string} getId,
 * @property {function(): number} getStatusId,
 * @property {function(): string} getTitle,
 * @property {function(): string} getDescription
 * @property {function(): Date} getStartDate
 * @property {function(): Date} getEndDate
 * @property {function(): string} getUserOwnerId
 * @property {function(): string} getUserCreatorId
 * @property {function(): Date} getCreationDate
 * @property {function(): string[]} getToDosIdList
 * @property {function(string):void} setTitle
 * @property {function(string):void} setDescription
 * @property {function(Date):void} setStartDate
 * @property {function(Date):void} setEndDate
 * @property {function(number):void} setStatusId
 */

const projectActions = {
  getId: function () {
    return this.strId;
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
  getStartDate: function () {
    return this.dtStartDate;
  },
  getEndDate: function () {
    return this.dtEndDate;
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
  getToDosIdList: function () {
    return this.arrToDoIds;
  },

  setTitle: function (value) {
    this.strTitle = value;
  },
  setDescription: function (value) {
    this.strDescription = value;
  },
  setStartDate: function (value) {
    this.dtStartDate = value;
  },
  setEndDate: function (value) {
    this.dtEndDate = value;
  },
  setStatusId: function (value) {
    this.intStatusId = value;
  },

  //setToDos: function (value) { this.arrToDos = value },
  //addToDo: function (value) { this.arrSubTasks.push(value) },
};

/**
 *
 * @param {string} strId
 * @param {string} strTitle
 * @param {string} strDescription
 * @param {Date} dtStartDate
 * @param {Date} dtEndDate
 * @param {number} intStatusId
 * @param {string} strUserOwnerId
 * @param {string} strUserCreatorId
 * @param {Date} dtCreatedOn
 * @param {number[]} arrToDoIds
 * @returns {{
 * getId: function(): string,
 * getStatusId: function(): number,
 * getTitle: function(): string,
 * getDescription: function(): string,
 * getStartDate: function(): Date,
 * getEndDate: function(): Date,
 * getUserOwnerId: function(): string,
 * getUserCreatorId: function(): string,
 * getCreationDate: function(): Date,
 * getToDosIdList: function(): string[],
 * setTitle: function(string):void,
 * setDescription: function(string):void,
 * setStartDate: function(Date):void,
 * setEndDate: function(Date):void,
 * setStatusId: function(number):void
 * }}
 */

export function shapeProject(
  strId,
  strTitle,
  strDescription,
  dtStartDate,
  dtEndDate,
  intStatusId,
  strUserOwnerId,
  strUserCreatorId,
  dtCreatedOn,
  arrToDoIds
) {
  const objProject = Object.create(projectActions);

  objProject.strId = strId;
  objProject.strTitle = strTitle;
  objProject.strDescription = strDescription;
  objProject.dtStartDate = dtStartDate;
  objProject.dtEndDate = dtEndDate;
  objProject.intStatusId = intStatusId;
  objProject.strUserOwnerId = strUserOwnerId;
  objProject.strUserCreatorId = strUserCreatorId;
  objProject.dtCreatedOn = dtCreatedOn;
  objProject.arrToDoIds = arrToDoIds;

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
    getToDosIdList: objProject.getToDosIdList.bind(objProject),

    setTitle: objProject.setTitle.bind(objProject),
    setDescription: objProject.setDescription.bind(objProject),
    setStartDate: objProject.setStartDate.bind(objProject),
    setEndDate: objProject.setEndDate.bind(objProject),
    setStatusId: objProject.setStatusId.bind(objProject),

    //setToDos: objProject.setToDos.bind(objProject),
    //addToDo: objProject.addToDo.bind(objProject),
  };
}
