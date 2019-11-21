import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

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
// Initialize Firebase
const firebaseApp = firebase.initializeApp(config);

export default firebaseApp.firestore();