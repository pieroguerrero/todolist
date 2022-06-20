import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  getAdditionalUserInfo,
} from "firebase/auth";
import {
  createNewUser,
  signInUser,
} from "../Front-Logic/BusinessLogic/User_Controller";
import { header } from "./header";

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

  const onGoogleSignIn = () => {
    signInUser()
      .then((response) => {
        if (getAdditionalUserInfo(response)?.isNewUser) {
          createNewUser(
            response.user.uid,
            response.user.email ?? "",
            response.user.displayName ?? ""
          );
        }

        header.configureUserAvatar(
          response.user.displayName ?? "",
          response.user.photoURL ?? ""
        );

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
