import "./styles.css";
//import { createNote } from "./scripts/back/note.js";
import { createSubTask } from "./scripts/back/subtask";
import { STATUS } from "./scripts/back/status";

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


const objSubTask = createSubTask("Tarea 1", "Descripcion de la tarea 1", new Date(), 11, "pepigue", 11, "pepigue", STATUS.PENDING.id);
console.log(objSubTask);
console.log("getTitle()= " + objSubTask.getTitle());
console.log("getDescription()= " + objSubTask.getDescription());
console.log("getStatusName()= " + objSubTask.getStatusName());
