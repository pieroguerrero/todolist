import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  getAdditionalUserInfo,
} from "firebase/auth";
import { registerUser } from "../DataAccess/UserDAO";

/**
 *
 * @module User_Controller
 */

const signInUser = () => {
  var provider = new GoogleAuthProvider();
  return signInWithPopup(getAuth(), provider);
};

const signOutUser = () => {
  signOut(getAuth()).then((response) => {
    //todo something to reaload the page and show default values
    console.log("signed out!!!");
  });
};

/**
 *
 * @param {string} strId
 * @param {string} strEmail
 * @param {string} strName
 * @returns {Promise<void>}
 */
const createNewUser = (strId, strEmail, strName) => {
  try {
    return registerUser(strId, strEmail, strName);
  } catch (error) {
    console.error(error);
    return Promise.resolve();
  }
};

export { signInUser, signOutUser, createNewUser };
