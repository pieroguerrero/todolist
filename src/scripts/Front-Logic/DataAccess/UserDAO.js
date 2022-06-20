import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

/**
 * @module UserDAO
 */

/**
 *
 * @param {string} strId
 * @param {string} strEmail
 * @param {string} strName
 * @returns {Promise<void>}
 */
const registerUser = async (strId, strEmail, strName) => {
  const response = setDoc(doc(getFirestore(), "users", strId), {
    strEmail,
    strName,
    datCreatedOn: serverTimestamp(),
  });
  console.log("Document written with ID: ", strId);
  return response;
};

export { registerUser };
