import "./styles.css";
//import { createNote } from "./scripts/back/note.js";
import { shapeSubTask } from "./scripts/back/classes/subtask.js";
import { STATUS } from "./scripts/back/classes/status.js";
import { shapeProject } from "./scripts/back/classes/project";
import { createProjectDataConnexion } from "./scripts/back/data-access/project-data";

console.log("its alive!");
const para = document.createElement("p");
para.textContent = "from js gree";
para.classList.add("text-green-500", "font-bold");

const main = document.querySelector("main");
main.appendChild(para);

// const objNote = createNote("titulo", "descripcion", 100, "piero182");
// console.log(objNote);
// console.log("getTitle()= " + objNote.getTitle());
// console.log("getDescription()= " + objNote.getDescription());

// console.log("Changing description...");
// objNote.setDescription("new desc");
// console.log("getDescription()= " + objNote.getDescription());


const objSubTask = shapeSubTask(null, null, 10, "Tarea 1", "Descripcion de la tarea 1", new Date(), 1, "pepigue", 1, "pepigue", STATUS.PENDING.id);

console.log(objSubTask);
console.log("getTitle()= " + objSubTask.getTitle());
console.log("getDescription()= " + objSubTask.getDescription());
//console.log("getStatusName()= " + objSubTask.getStatusName());

objSubTask.setDescription("new desc");
console.log("getDescription()= " + objSubTask.getDescription());

console.log("----------------------");
console.log("----------------------");

const objProject = shapeProject(null, "Proyecto 1", "Descripcion del Proyecto jaja :)", new Date(2020, 10, 11), new Date(2022, 10, 30), STATUS.INPROGRESS.id, 1, "pepigue", 1, null);

objProject.setToDos([
    { intId: 111, strTitle: "Primer todo", dtDueDate: new Date(2019, 10, 10) },
    { intId: 222, strTitle: "Segundo todo", dtDueDate: new Date(2021, 11, 11) }
]);

const objProjectData = createProjectDataConnexion();
const intProjectId = objProjectData.insertObj(objProject);
console.log(intProjectId);

if (intProjectId) {
    const objProject2 = objProjectData.readObj(intProjectId);
    console.log(objProject2);

    console.log("objProject2.getTitle()= " + objProject2.getTitle());
    console.log("objProject2.getToDosList()= " + objProject2.getToDosList());
}