import { mainLandingAddTaskPoUp_Controller } from "./scripts/Back/BusinessLogic/mainLandingAddTaskPoUp_Controller";
import { mainLandingWelcome_Controller } from "./scripts/Back/BusinessLogic/mainLandingWelcome_Controller";
import { menuTray_Controller } from "./scripts/Back/BusinessLogic/menuTray_Controller";
import { popUpProject_Controller } from "./scripts/Back/BusinessLogic/popUpPoject_Controller";
import { header } from "./scripts/Front/header";
import { mainLanding } from "./scripts/Front/mainLanding";
import { popUpEditTask } from "./scripts/Front/popUpEditTask";
import { popUpProject } from "./scripts/Front/popUpProject";
import "./styles.css";



console.log("its alive!");
//headerListener.onPageLoad();

const dblUserId = 1;
//localStorage.clear();

//#region subscriptions from business objects

popUpProject_Controller.subscribeEvents(dblUserId);
mainLandingWelcome_Controller.createDefatultProject();
menuTray_Controller.subscribeEvents(dblUserId);
mainLandingAddTaskPoUp_Controller.subscribeEvents(dblUserId);

//#endregion

//#region subscriptions from ui modules

//#endregion


header.onPageLoad(dblUserId);
mainLanding.onPageLoad(dblUserId);
popUpProject.close();


//popUpEditTask.load();

console.log("its alive 2!");