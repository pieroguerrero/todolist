import "./styles.css";
//import { createNote } from "./scripts/back/note.js";
import { shapeSubTask } from "./scripts/back/classes/subtask.js";
import { STATUS } from "./scripts/back/classes/status.js";

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
console.log("getStatusName()= " + objSubTask.getStatusName());

objSubTask.setDescription("new desc");
console.log("getDescription()= " + objSubTask.getDescription());