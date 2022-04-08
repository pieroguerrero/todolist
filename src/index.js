import { mainLandingWelcome_Controller } from "./scripts/Back/BusinessLogic/mainLandingWelcome_Controller";
import { menuTray_Controller } from "./scripts/Back/BusinessLogic/menuTray_Controller";
import { popUpProject_Controller } from "./scripts/Back/BusinessLogic/popUpPoject_Controller";
import { header } from "./scripts/Front/header";
import { mainLanding } from "./scripts/Front/mainLanding";
import { popUpProject } from "./scripts/Front/popUpProject";
import "./styles.css";



console.log("its alive!");
//headerListener.onPageLoad();

const dblUserId = 1;
localStorage.clear();

//#region subscriptions from business objects

popUpProject_Controller.subscribeEvents(dblUserId);
mainLandingWelcome_Controller.subscribeEvents(dblUserId);
menuTray_Controller.subscribeEvents(dblUserId);

//#endregion

//#region subscriptions from ui modules

popUpProject.subscribeEvents();

//#endregion

header.onPageLoad();
mainLanding.onPageLoad();
popUpProject.close();


console.log("its alive 2!");






// const para = document.createElement("p");
// para.textContent = "from js gree";
// para.classList.add("text-green-500", "font-bold");

// const main = document.querySelector("main");
// main.appendChild(para);

// const objNote = createNote("titulo", "descripcion", 100, "piero182");
// console.log(objNote);
// console.log("getTitle()= " + objNote.getTitle());
// console.log("getDescription()= " + objNote.getDescription());

// console.log("Changing description...");
// objNote.setDescription("new desc");
// console.log("getDescription()= " + objNote.getDescription());


// const objSubTask = shapeSubTask(null, null, 10, "Tarea 1", "Descripcion de la tarea 1", new Date(), 1, 1, STATUS.PENDING.id);

// console.log(objSubTask);
// console.log("getTitle()= " + objSubTask.getTitle());
// console.log("getDescription()= " + objSubTask.getDescription());
// objSubTask.setDescription("new desc");
// console.log("getDescription()= " + objSubTask.getDescription());

// console.log("----------------------");
// console.log("----------------------");

// const objProject = shapeProject(null, "Proyecto 1", "Descripcion del Proyecto jaja :)", new Date(2020, 10, 11), new Date(2022, 10, 30), STATUS.INPROGRESS.id, 1, 1, null);

// const objProjectData = createProjectDAO();
// const intProjectId = objProjectData.dbInsert("Proyecto 1", "Descripcion del Proyecto jaja :)", new Date(2020, 10, 11), new Date(2022, 10, 30), STATUS.INPROGRESS.id, 1, 1);
// console.log(intProjectId);

// if (intProjectId) {
//     const objProject2 = objProjectData.dbSelect(intProjectId);
//     console.log(objProject2);
//     console.log("from database...");
//     console.log("objProject2.getTitle()= " + objProject2.getTitle());
//     //console.log("objProject2.getToDosList()= " + objProject2.getToDosList());
//     console.log("objProject2.getStartDate()= " + objProject2.getStartDate());
// }