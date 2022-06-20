//https://dev.to/j471n/how-to-use-web-storage-api-3o28

import { shapeProject } from "../Model/Project";
import { Project } from "../Model/Project";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

/**
 *
 * @param {string} strId
 * @param {number} intStatusId
 * @param {string} strTitle
 * @param {string} strDescription
 * @param {Date} dtStartDate
 * @param {Date} dtEndDate
 * @param {string} strUserOwnerId
 * @param {string} strUserCreatorId
 * @param {Date} dtCreatedOn
 * @param {string[]} arrToDoIds
 * @returns
 */
const adapt = (
  strId,
  intStatusId,
  strTitle,
  strDescription,
  dtStartDate,
  dtEndDate,
  strUserOwnerId,
  strUserCreatorId,
  dtCreatedOn,
  arrToDoIds
) => {
  return {
    strId,
    intStatusId,
    strTitle,
    strDescription,
    dtStartDate,
    dtEndDate,
    strUserOwnerId,
    strUserCreatorId,
    dtCreatedOn,
    arrToDoIds,
  };
};

/**
 *
 * @param {string} strTitle
 * @param {string} strDescription
 * @param {Date} dtStartDate
 * @param {Date} dtEndDate
 * @param {number} intStatusId
 * @param {string} strUserOwnerId
 * @param {string} strUserCreatorId
 * @returns {string} The Id of the recently registered Project, otherwhise returns -1.
 */
function dbInsert(
  strTitle,
  strDescription,
  dtStartDate,
  dtEndDate,
  intStatusId,
  strUserOwnerId,
  strUserCreatorId
) {
  const objProjectData = {
    strId: Number(Date.now() + (Math.random() * 100000).toFixed()).toString(),
    intStatusId: intStatusId,
    strTitle: strTitle,
    strDescription: strDescription,
    dtStartDate: dtStartDate,
    dtEndDate: dtEndDate,
    strUserOwnerId: strUserOwnerId,
    strUserCreatorId: strUserCreatorId,
    dtCreatedOn: new Date(),
    arrToDoIds: [],
  };

  localStorage.setItem(
    "project-" + objProjectData.strId,
    JSON.stringify(objProjectData)
  );

  const projectsListRaw = localStorage.getItem("projects-list");
  const arrProjectsList = projectsListRaw ? JSON.parse(projectsListRaw) : [];
  arrProjectsList.push(objProjectData.strId);
  localStorage.setItem("projects-list", JSON.stringify(arrProjectsList));

  return objProjectData.strId;
}

/**
 *
 * @param {string} strProjectId
 * @param {string} strTodoId
 * @param {string} strUserOwnerId
 * @returns {boolean}
 */
function dbAddTodoIdToProject(strProjectId, strTodoId, strUserOwnerId) {
  const objProject = createProjectDAO().dbSelect(strProjectId, strUserOwnerId);

  objProject?.getToDosIdList().push(strTodoId);

  const objProjectData = {
    strId: objProject?.getId(),
    intStatusId: objProject?.getStatusId(),
    strTitle: objProject?.getTitle(),
    strDescription: objProject?.getDescription(),
    dtStartDate: objProject?.getStartDate(),
    dtEndDate: objProject?.getEndDate(),
    strUserOwnerId: objProject?.getUserOwnerId(),
    strUserCreatorId: objProject?.getUserCreatorId(),
    dtCreatedOn: objProject?.getCreationDate(),
    arrToDoIds: objProject?.getToDosIdList(),
  };

  localStorage.setItem(
    "project-" + objProjectData.strId,
    JSON.stringify(objProjectData)
  );

  return true;
}

/**
 *
 * @param {string} strId
 * @param {string} strTitle
 * @param {string} strDescription
 * @param {number} intStatusId
 * @param {string} strUserOwnerId
 * @param {string} strUserCreatorId
 * @returns {string}
 */
function dbInsertDefaultProject(
  strId,
  strTitle,
  strDescription,
  intStatusId,
  strUserOwnerId,
  strUserCreatorId
) {
  const objProjectData = {
    strId: strId,
    intStatusId: intStatusId,
    strTitle: strTitle,
    strDescription: strDescription,
    dtStartDate: new Date(),
    dtEndDate: new Date(8640000000000000),
    strUserOwnerId: strUserOwnerId,
    strUserCreatorId: strUserCreatorId,
    dtCreatedOn: new Date(),
    arrToDoIds: [],
  };

  localStorage.setItem(
    "project-" + objProjectData.strId,
    JSON.stringify(objProjectData)
  );

  const projectsListRaw = localStorage.getItem("projects-list");
  const arrProjectsList = projectsListRaw ? JSON.parse(projectsListRaw) : [];
  arrProjectsList.push(objProjectData.strId);
  localStorage.setItem("projects-list", JSON.stringify(arrProjectsList));

  return objProjectData.strId;
}

/**
 *
 * @param {string} strId
 * @param {string} strTitle
 * @param {string} strDescription
 * @param {Date} dtStartDate
 * @param {Date} dtEndDate
 * @param {number} intStatusId
 * @param {string} strUserOwnerId
 * @returns {string} The Id of the recently updated Project, otherwhise returns -1.
 */
function dbUpdate(
  strId,
  strTitle,
  strDescription,
  dtStartDate,
  dtEndDate,
  intStatusId,
  strUserOwnerId
) {
  const objProject = dbSelect(strId, strUserOwnerId);

  const objProjectData = {
    strId: strId,
    intStatusId: intStatusId,
    strTitle: strTitle,
    strDescription: strDescription,
    dtStartDate: dtStartDate,
    dtEndDate: dtEndDate,
    strUserOwnerId: strUserOwnerId,
    strUserCreatorId: objProject?.getUserCreatorId(),
    dtCreatedOn: objProject?.getCreationDate(),
    arrToDoIds: objProject?.getToDosIdList(),
  };

  localStorage.setItem(
    "project-" + objProjectData.strId,
    JSON.stringify(objProjectData)
  );

  return objProjectData.strId;
}
/**
 *
 * @param {string} strProjectId
 * @param {string} strOWnerUserId
 * @returns {Project | null}
 */
function dbSelect(strProjectId, strOWnerUserId) {
  const objProjectData = JSON.parse(
    localStorage.getItem("project-" + strProjectId)
  );

  if (objProjectData) {
    const objProject = shapeProject(
      objProjectData.strId,
      objProjectData.strTitle,
      objProjectData.strDescription,
      new Date(objProjectData.dtStartDate),
      new Date(objProjectData.dtEndDate),
      objProjectData.intStatusId,
      objProjectData.strUserOwnerId,
      objProjectData.strUserCreatorId,
      new Date(objProjectData.dtCreatedOn),
      objProjectData.arrToDoIds
    );

    return objProject;
  }

  return null;
}

/**
 * @param {string} strOWnerUserId
 * @returns {Project[]}
 */
function dbSelectAll(strOWnerUserId) {
  const arrProjectsId = JSON.parse(localStorage.getItem("projects-list"));

  const arrProjects = arrProjectsId.map((projectId) =>
    dbSelect(projectId, strOWnerUserId)
  );
  return arrProjects;
}

// const objData = {
//   dbInsert: null,
//   dbUpdate: null,
//   dbSelect: null,
//   dbSelectAll: null,
//   dbInsertDefaultProject: null,
//   dbAddTodoIdToProject: null,
// };

export function createProjectDAO() {
  return {
    dbInsert,
    dbSelect,
    dbSelectAll,
    dbUpdate,
    dbInsertDefaultProject,
    dbAddTodoIdToProject,
  };
}
