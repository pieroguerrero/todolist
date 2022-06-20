/**
 * To find your Firebase config object:
 *
 * 1. Go to your [Project settings in the Firebase console](https://console.firebase.google.com/project/_/settings/general/)
 * 2. In the "Your apps" card, select the nickname of the app for which you need a config object.
 * 3. Select Config from the Firebase SDK snippet pane.
 * 4. Copy the config object snippet, then add it here.
 */
const config = {
  apiKey: "AIzaSyB93D7mUypdk5w824v7faFlB3q7MSS1yqk",
  authDomain: "to-do-list-fe082.firebaseapp.com",
  projectId: "to-do-list-fe082",
  storageBucket: "to-do-list-fe082.appspot.com",
  messagingSenderId: "157105643862",
  appId: "1:157105643862:web:6c5f02161b52a2efa536f7",
};

export function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error(
      "No Firebase configuration object provided." +
        "\n" +
        "Add your web app's configuration object to firebase-config.js"
    );
  } else {
    return config;
  }
}
