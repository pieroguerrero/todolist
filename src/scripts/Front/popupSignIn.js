import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  getAdditionalUserInfo,
} from "firebase/auth";
import { mainLandingAddTaskPoUp_Controller } from "../Front-Logic/BusinessLogic/mainLandingAddTaskPoUp_Controller";
import { menuTray_Controller } from "../Front-Logic/BusinessLogic/menuTray_Controller";
import { popUpProject_Controller } from "../Front-Logic/BusinessLogic/popUpPoject_Controller";
import { PopUpSignIn_Controllers } from "../Front-Logic/BusinessLogic/popUpSignIn_Controllers";
import {
  createNewUser,
  signInUser,
} from "../Front-Logic/BusinessLogic/User_Controller";
import { header } from "./header";
import { mainLanding } from "./mainLanding";

const PopUpSignIn = (() => {
  const showPopUp = () => {
    const divPopUpSignIn = document.getElementById("div-popup-choose-login");
    if (divPopUpSignIn) {
      divPopUpSignIn.classList.remove("hidden");
    }
  };

  const hidePopUp = () => {
    const divPopUpSignIn = document.getElementById("div-popup-choose-login");
    if (divPopUpSignIn) {
      divPopUpSignIn.classList.add("hidden");
    }
  };

  /**
   *
   * @param {string} strUserId
   */
  const subscribeToEvents = (strUserId) => {
    popUpProject_Controller.subscribeEvents(strUserId);
    menuTray_Controller.subscribeEvents(strUserId);
    mainLandingAddTaskPoUp_Controller.subscribeEvents(strUserId);

    header.onPageLoad(strUserId);
  };

  const onGoogleSignIn = () => {
    signInUser()
      .then((response) => {
        subscribeToEvents(response.user.uid);
        header.configureUserAvatar(
          response.user.displayName ?? "",
          response.user.photoURL ?? ""
        );

        if (getAdditionalUserInfo(response)?.isNewUser) {
          createNewUser(
            response.user.uid,
            response.user.email ?? "",
            response.user.displayName ?? ""
          ).then(() => {
            PopUpSignIn_Controllers.createDefatultProject(response.user.uid)
              .then(() => {
                //TODO: this is the method we have to update to work with promises
                //https://firebase.google.com/docs/firestore/manage-data/add-data
                //https://console.firebase.google.com/u/0/project/to-do-list-fe082/firestore/data
                //https://console.firebase.google.com/u/0/project/to-do-list-fe082/authentication/users
                //https://firebase.google.com/docs/firestore/query-data/queries
                mainLanding.onPageLoad(response.user.uid);
              })
              .catch((error) => console.error(error));
          });
        } else {
          mainLanding.onPageLoad(response.user.uid);
        }

        hidePopUp();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onGuestSignIn = () => {};

  const subscribeEvents = () => {
    const btnSignInGoogle = document.getElementById("button-sigin-google");
    const btnSignInGuest = document.getElementById("button-sigin-guest");

    btnSignInGoogle.onclick = onGoogleSignIn;
    btnSignInGuest.onclick = onGuestSignIn;
  };
  return {
    load() {
      subscribeEvents();
    },
  };
})();

export { PopUpSignIn };
