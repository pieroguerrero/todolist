import { shapeNote } from "../Model/Note";
import { createTodoDAO } from "./TodoDAO";

/**
 * 
 * @param {number} idTodo 
 * @param {string} strTitle 
 * @param {string} strDescription 
 * @param {number} idUserAuthor 
 * @returns {number}
 */
function dbInsert(idTodo, strTitle, strDescription, idUserAuthor) {

    const objNoteData = {

        dblId: Number(Date.now() + ((Math.random() * 100000).toFixed())),
        idTodo: idTodo,
        strTitle: strTitle,
        strDescription: strDescription,
        idAuthor: idUserAuthor,
        dtCreatedOn: new Date()
    };

    localStorage.setItem("note-" + objNoteData.dblId, JSON.stringify(objNoteData));

    createTodoDAO().dbAddNoteId(objNoteData.idTodo, objNoteData.dblId);

    return objNoteData.dblId;

}

function dbSelect(dblId) {

    const objNoteData = JSON.parse(localStorage.getItem("note-" + dblId));

    const objNote = shapeNote(
        objNoteData.dblId,
        objNoteData.idTodo,
        objNoteData.strTitle,
        objNoteData.strDescription,
        objNoteData.idUserAuthor,
        new Date(objNoteData.dtCreatedOn)
    );

    return objNote;
}

function dbUpdate(dblId, strTitle, strDescription) {

    const objNote = dbSelect(dblId);

    const objNoteData = {

        dblId: objNote.getId(),
        idTodo: objNote.getIdTodo(),
        strTitle: strTitle,
        strDescription: strDescription,
        idAuthor: objNote.getUserAuthorId(),
        dtCreatedOn: objNote.getCreationDate()
    };

    localStorage.setItem("note-" + objNoteData.dblId, JSON.stringify(objNoteData));

    return objNoteData.dblId;
}

/**
 * 
 * @param {number[]} arrNoteId 
 * @returns 
 */

function dbSelectAll(arrNoteId) {

    const arrNotes = arrNoteId.map(noteId => dbSelect(noteId));
    return arrNotes;
}

function dbSelectByTodo(dblTodoId) {

    const arrNotesksId = createTodoDAO().dbSelect(dblTodoId).getNotesIdList();

    return dbSelectAll(arrNotesksId);
}

const objData = { dbInsert: null, dbUpdate: null, dbSelect: null, dbSelectAll: null, dbSelectByTodo: null };

/**
 * 
 * @returns {{
 * dbInsert: dbInsert, 
 * dbSelect: dbSelect,
 * dbSelectAll: dbSelectAll,
 * dbUpdate: dbUpdate,
 * dbSelectByTodo:dbSelectByTodo
 * }}
 */
function createNoteDAO() {

    if (!objData.dbInsert) {

        objData.dbInsert = dbInsert;
        objData.dbSelect = dbSelect;
        objData.dbSelectAll = dbSelectAll;
        objData.dbUpdate = dbUpdate;
        objData.dbSelectByTodo = dbSelectByTodo;
    }

    return objData;
}

export { createNoteDAO };