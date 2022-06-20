import { shapeNote } from "../Model/Note";
import { createTodoDAO } from "./TodoDAO";
import { Note } from "../Model/Note";

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

//LINKS:
//https://firebase.google.com/docs/firestore/manage-data/add-data#web-version-9_4
//https://console.firebase.google.com/u/0/project/to-do-list-fe082/firestore/data/~2Fstatus~2F5
//https://console.firebase.google.com/u/0/project/to-do-list-fe082/authentication/users
//https://firebase.google.com/docs/firestore/query-data/queries
//

/**
 *
 * @param {string} strId
 * @param {string} strTodo
 * @param {string} strTitle
 * @param {string} strDescription
 * @param {string} strIdUserAuthor
 * @returns
 */
const adapt = (
  strId,
  strTodo,
  strTitle,
  strDescription,
  strIdUserAuthor,
  dtCreatedOn
) => {
  return {
    strId,
    strTodo,
    strTitle,
    strDescription,
    strIdUserAuthor,
    dtCreatedOn,
  };
};

/**
 *
 * @param {string} strTodo
 * @param {string} strTitle
 * @param {string} strDescription
 * @param {string} strIdUserAuthor
 * @returns {string}
 */
function dbInsert(strTodo, strTitle, strDescription, strIdUserAuthor) {
  const objNoteData = adapt(
    Number(Date.now() + (Math.random() * 100000).toFixed()).toString(),
    strTodo,
    strTitle,
    strDescription,
    strIdUserAuthor,
    new Date()
  );

  localStorage.setItem(
    "note-" + objNoteData.strId,
    JSON.stringify(objNoteData)
  );

  createTodoDAO().dbAddNoteId(objNoteData.strTodo, objNoteData.strId);

  return objNoteData.strId;
}

/**
 *
 * @param {string} strId
 * @returns
 */
function dbSelect(strId) {
  const objNoteData = JSON.parse(localStorage.getItem("note-" + strId));

  const objNote = shapeNote(
    objNoteData.strId,
    objNoteData.strTodo,
    objNoteData.strTitle,
    objNoteData.strDescription,
    objNoteData.strIdUserAuthor,
    new Date(objNoteData.dtCreatedOn)
  );

  return objNote;
}

/**
 *
 * @param {string} strNoteId
 * @returns
 */
function dbDelete(strNoteId) {
  const objNote = dbSelect(strNoteId);

  createTodoDAO().dbRemoveNoteId(objNote.getIdTodo(), objNote.getId());
  localStorage.removeItem("note-" + objNote.getId());

  return objNote.getId();
}

/**
 *
 * @param {string} strId
 * @param {string} strTitle
 * @param {string} strDescription
 * @returns
 */
function dbUpdate(strId, strTitle, strDescription) {
  const objNote = dbSelect(strId);

  const objNoteData = adapt(
    objNote.getId(),
    objNote.getIdTodo(),
    strTitle,
    strDescription,
    objNote.getUserAuthorId(),
    objNote.getCreationDate()
  );

  localStorage.setItem(
    "note-" + objNoteData.strId,
    JSON.stringify(objNoteData)
  );

  return objNoteData.strId;
}

/**
 *
 * @param {string[]} arrNoteId
 * @returns {Note[]}
 */

function dbSelectAll(arrNoteId) {
  const arrNotes = arrNoteId.map((noteId) => dbSelect(noteId));
  return arrNotes;
}

/**
 *
 * @param {string} strTodoId
 * @returns {Note[]}
 */
function dbSelectByTodo(strTodoId) {
  const arrNotesksId = createTodoDAO().dbSelect(strTodoId).getNotesIdList();

  return dbSelectAll(arrNotesksId);
}

function createNoteDAO() {
  return {
    dbInsert,
    dbSelect,
    dbSelectAll,
    dbUpdate,
    dbSelectByTodo,
    dbDelete,
  };
}

export { createNoteDAO };
