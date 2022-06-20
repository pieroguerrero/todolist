import { mainLanding } from "./mainLanding";
import { mainLandingWelcome } from "./mainLandingWelcome";
import { menuTray } from "./menuTray";
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
  signOutUser,
} from "../Front-Logic/BusinessLogic/User_Controller";

const header = (function () {
  let strOWnerUserIdkeep = "";
  const headerElement = document.getElementById("header-options");

  const onClickHamburguerMenu = function () {
    const btnHamburguerMenu = document.getElementById("button-hamburguer-menu");
    const svgMenuIcon = btnHamburguerMenu?.querySelector(".menu_icon");
    const svgCloseIcon = btnHamburguerMenu?.querySelector(".close_icon");

    if (svgCloseIcon?.classList.contains("hidden")) {
      menuTray.load(strOWnerUserIdkeep);
    } else {
      menuTray.hide();
    }

    svgMenuIcon?.classList.toggle("hidden");
    svgCloseIcon?.classList.toggle("hidden");
  };

  const loadHamburguerMenuButton = function () {
    const btnHamburguerMenu = headerElement?.querySelector(
      "#button-hamburguer-menu"
    );
    btnHamburguerMenu.onclick = onClickHamburguerMenu;
  };

  const loadHomeButton = function () {
    const btnHome = headerElement?.querySelector("#button-header-home");
    btnHome.onclick = menuTray.goHome;
  };

  const onKeyDownBoxContent = function () {
    if (this.value.length >= 3) {
      mainLandingWelcome.load(
        strOWnerUserIdkeep,
        new Date(1970, 1, 1),
        "-1",
        false,
        true,
        this.value
      );
      mainLanding.setTitle("Search", "results");
    } else if (this.value.length === 0) {
      menuTray.goHome();
    }
  };

  const loadSearchButton = function () {
    const btnSearch = headerElement?.querySelector("#button-header-search");
    btnSearch.onclick = function () {
      this.classList.add("hidden");
      const divHeaderSearchbox = headerElement?.querySelector(
        "#div-header-searchbox"
      );
      divHeaderSearchbox.classList.remove("hidden");

      const btnCloseSearchBox = headerElement?.querySelector(
        "#button-header-search-close"
      );
      btnCloseSearchBox.onclick = function (btnSearchButton) {
        this.parentElement.classList.add("hidden");
        btnSearchButton.classList.remove("hidden");
      }.bind(btnCloseSearchBox, this);

      const inputSearchBox = headerElement?.querySelector(
        "#input-header-search-text"
      );
      inputSearchBox.onkeyup = onKeyDownBoxContent.bind(inputSearchBox);
    }.bind(btnSearch);
  };

  /**
   *
   * @param {string} strUserName
   * @param {string} strImagePath
   */
  const setUserInformationAvatar = (strUserName, strImagePath) => {
    const pUserName = document.getElementById("p-button-user-name");
    pUserName.textContent = strUserName;

    const imgUserImage = document.getElementById("img-button-user-image");
    imgUserImage?.setAttribute("src", strImagePath);
    imgUserImage?.setAttribute("alt", strUserName);
  };

  const prepareUserAvatarUI = () => {
    const buttonUserMenuIn = document.getElementById(
      "button-user-signin-menu-in"
    );
    buttonUserMenuIn?.classList.toggle("hidden");

    const divUserMenuOut = document.querySelector(".div-user-signin-menu-out");
    divUserMenuOut.classList.toggle("hidden");

    headerElement
      ?.querySelector(".svg-header-user-avatar-default")
      ?.classList.toggle("hidden");
    headerElement
      ?.querySelector(".div-header-user-info")
      ?.classList.toggle("hidden");
  };

  const onSignOutClick = () => {
    signOutUser();
    prepareUserAvatarUI();

    const divUserMenu = document.querySelector(".div-user-signin-menu");
    divUserMenu.classList.toggle("hidden");
  };

  const onSignInClick = () => {
    signInUser()
      .then((response) => {
        if (getAdditionalUserInfo(response)?.isNewUser) {
          createNewUser(
            response.user.uid,
            response.user.email ?? "",
            response.user.displayName ?? ""
          );
        }

        const buttonUserMenuOut = document.getElementById(
          "button-user-signin-menu-out"
        );
        buttonUserMenuOut.onclick = onSignOutClick;

        prepareUserAvatarUI();
        setUserInformationAvatar(
          response.user.displayName ?? "",
          response.user.photoURL ?? ""
        );

        const divUserMenu = document.querySelector(".div-user-signin-menu");
        divUserMenu.classList.toggle("hidden");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const loadUserAvatarButton = () => {
    const btnUserAvatar = headerElement?.querySelector(
      "#button-header-user-avatar"
    );

    btnUserAvatar.onclick = () => {
      const divUserMenu = document.querySelector(".div-user-signin-menu");
      divUserMenu.classList.toggle("hidden");
    };

    const divUserMenuIn = document.getElementById("button-user-signin-menu-in");
    divUserMenuIn.onclick = onSignInClick;
  };

  return {
    /**
     *
     * @param {string} strOWnerUserId
     */
    onPageLoad: function (strOWnerUserId) {
      strOWnerUserIdkeep = strOWnerUserId;
      loadHamburguerMenuButton();
      loadHomeButton();
      loadSearchButton();
      loadUserAvatarButton();
      //load other buttons
      //pubsub.notify(it's headers loading time)
    },
    onClickHamburguerMenu: onClickHamburguerMenu,
  };
})();

export { header };
