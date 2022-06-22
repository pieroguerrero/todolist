import { mainLandingAddTaskPoUp_Controller } from "./scripts/Front-Logic/BusinessLogic/mainLandingAddTaskPoUp_Controller";
import { mainLandingWelcome_Controller } from "./scripts/Front-Logic/BusinessLogic/mainLandingWelcome_Controller";
import { menuTray_Controller } from "./scripts/Front-Logic/BusinessLogic/menuTray_Controller";
import { popUpProject_Controller } from "./scripts/Front-Logic/BusinessLogic/popUpPoject_Controller";
import { header } from "./scripts/Front/header";
import { mainLanding } from "./scripts/Front/mainLanding";
import { popUpProject } from "./scripts/Front/popUpProject";
import "./styles.css";
import { getFirebaseConfig } from "./scripts/Services/firebase-config";
import { initializeApp } from "firebase/app";
import { PopUpSignIn } from "./scripts/Front/popupSignIn";

const strUserId = "1";

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);

//#region subscriptions from business objects

popUpProject_Controller.subscribeEvents(strUserId);
menuTray_Controller.subscribeEvents(strUserId);
mainLandingAddTaskPoUp_Controller.subscribeEvents(strUserId);

//#endregion
header.onPageLoad(strUserId);
mainLanding.onPageLoad(strUserId);

//#region PopUpsignIn
PopUpSignIn.load();

//#endregion

popUpProject.close();
