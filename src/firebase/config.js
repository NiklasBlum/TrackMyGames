import firebase from "firebase/app";
import "firebase/firestore";
import store from "@/store/index.js";

var config = {
  apiKey: "AIzaSyBkw_f2Tz82QiOPgz-lk4LGGqm_Dxufqg8",
  authDomain: "trackmygames97.firebaseapp.com",
  databaseURL: "https://trackmygames97.firebaseio.com",
  projectId: "trackmygames97",
  storageBucket: "trackmygames97.appspot.com",
  messagingSenderId: "847550259729",
  appId: "1:847550259729:web:ae12f6aadc1fd01d2387b0",
  measurementId: "G-NS7MJEJD19"
};

firebase.initializeApp(config);

firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(user => {
      store.commit("setUser", user);
      resolve(user);
    }, reject);
  });
};

const firestore = firebase.firestore();
const fsTimestamp = firebase.firestore.FieldValue.serverTimestamp;

//this exports two objects. When importing, the names must be the same
export { firestore, fsTimestamp }

// this is a default export. It exports the value, so when importing the variable name can be named differently
// export default firestore
