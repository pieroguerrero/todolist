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
  where,
  getDocs,
  DocumentData,
  SnapshotOptions,
  QueryDocumentSnapshot,
} from "firebase/firestore";

/**
 *
 * @param {Object} projectLite
 * @param {number} projectLite.intStatusId
 * @param {string} projectLite.strTitle
 * @param {string} projectLite.strDescription
 * @param {Date} projectLite.dtStartDate
 * @param {Date | null} projectLite.dtEndDate
 * @param {string} projectLite.strUserOwnerId
 * @param {string} projectLite.strUserCreatorId
 * @param {Date} projectLite.dtCreatedOn
 * @returns
 */
const adaptProject = ({
  intStatusId,
  strTitle,
  strDescription,
  dtStartDate,
  dtEndDate,
  strUserOwnerId,
  strUserCreatorId,
  dtCreatedOn,
}) => {
  return {
    intStatusId,
    strTitle,
    strDescription,
    dtStartDate,
    dtEndDate,
    strUserOwnerId,
    strUserCreatorId,
    dtCreatedOn,
  };
};

/**
 *
 * @param {Project} objProject
 * @returns {DocumentData}
 */
const toFirestore = (objProject) => {
  return {};
};

/**
 * More information about the converters at: https://firebase.google.com/docs/reference/node/firebase.firestore.FirestoreDataConverter
 * @param {string} strDocId
 * @param { DocumentData} docData
 * @returns {Project}
 */
const fromFirestore = (strDocId, docData) => {
  return shapeProject(
    strDocId,
    docData.strTitle,
    docData.strDescription,
    docData.dtStartDate,
    docData.dtEndDate,
    docData.intStatusId,
    docData.strUserOwnerId,
    docData.strUserCreatorId,
    docData.dtCreatedOn,
    []
  );
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
 * @returns {Promise<string>} The Id of the recently registered Project, otherwhise returns -1.
 */
async function dbInsert(
  strTitle,
  strDescription,
  dtStartDate,
  dtEndDate,
  intStatusId,
  strUserOwnerId,
  strUserCreatorId
) {
  const objProjectData = adaptProject({
    intStatusId,
    strTitle,
    strDescription,
    dtStartDate,
    dtEndDate,
    strUserOwnerId,
    strUserCreatorId,
    dtCreatedOn: new Date(),
  });

  let docRef;

  try {
    docRef = await addDoc(
      collection(getFirestore(), "users", strUserOwnerId, "projects"),
      objProjectData
    );
  } catch (error) {
    console.error("ProjectDAO.dbInsert:", error);
  }

  return docRef?.id ?? "";
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
 * @param {number} intStatusId
 * @param {string} strUserOwnerId
 * @param {string} strUserCreatorId
 * @returns {Promise<void>}
 */
function fbInsertDefaultProject(
  strId,
  strTitle,
  strDescription,
  intStatusId,
  strUserOwnerId,
  strUserCreatorId
) {
  const objProjectData = adaptProject({
    intStatusId,
    strTitle,
    strDescription,
    dtStartDate: new Date(),
    dtEndDate: null,
    strUserOwnerId,
    strUserCreatorId,
    dtCreatedOn: new Date(),
  });

  const response = setDoc(
    doc(getFirestore(), "users", strUserOwnerId, "projects", strId),
    objProjectData
  );
  return response;
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
 * @returns {Promise<string>} The Id of the recently updated Project, otherwhise returns -1.
 */
async function dbUpdate(
  strId,
  strTitle,
  strDescription,
  dtStartDate,
  dtEndDate,
  intStatusId,
  strUserOwnerId
) {
  const objProjectData = {
    intStatusId: intStatusId,
    strTitle: strTitle,
    strDescription: strDescription,
    dtStartDate: dtStartDate,
    dtEndDate: dtEndDate,
  };

  let strResultId = "";

  try {
    const docRef = doc(
      getFirestore(),
      "users",
      strUserOwnerId,
      "projects",
      strId
    );

    await updateDoc(docRef, { objProjectData });

    strResultId = strId;
  } catch (error) {
    console.error("ProjectDAO.dbUpdate:", error);
  }

  return strResultId;
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
 * @returns {Promise<Project[]>}
 */
async function dbSelectAll(strOWnerUserId) {
  let querySnapshot;

  try {
    const projectsRef = collection(
      getFirestore(),
      "users",
      strOWnerUserId,
      "projects"
    );
    const queryDoc = query(projectsRef, where("intStatusId", "not-in", [2, 4]));
    querySnapshot = await getDocs(queryDoc);

    return querySnapshot.docs.map((doc) => fromFirestore(doc.id, doc.data()));
  } catch (error) {
    console.error("ProjectDAO.dbSelectAll:", error);
  }

  return [];
}

export function createProjectDAO() {
  return {
    dbInsert,
    dbSelect,
    dbSelectAll,
    dbUpdate,
    dbInsertDefaultProject,
    dbAddTodoIdToProject,
    fbInsertDefaultProject,
  };
}
