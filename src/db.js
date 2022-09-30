import firebase from 'firebase/compat/app';
// import store from "./store";
import 'firebase/compat/auth';
import 'firebase/compat/database';

const config = {
  // API Keys
  apiKey: "AIzaSyBWMW8hNPzSdwfU26bljDfLUbtXjYWNG6o",
  authDomain: "firevuechat-13118.firebaseapp.com",
  projectId: "firevuechat-13118",
  storageBucket: "firevuechat-13118.appspot.com",
  messagingSenderId: "520831830495",
  appId: "1:520831830495:web:ab9d32da64ba753a9ddc6a"
}

// var database = firebase.database();

const db = firebase.initializeApp(config);
export default db;