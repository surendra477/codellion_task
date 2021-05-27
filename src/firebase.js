import firebase from 'firebase';

export let fbConfig = {
  apiKey: "AIzaSyA5xgu1XSc_hEyrw3OlKRU7aG8HOWyaaTQ",
  authDomain: "codellion-job-task.firebaseapp.com",
  databaseURL: "https://codellion-job-task-default-rtdb.firebaseio.com",
  projectId: "codellion-job-task",
  storageBucket: "codellion-job-task.appspot.com",
  messagingSenderId: "111300890464",
  appId: "1:111300890464:web:1e97c9b4ce6179eec4d805",
  measurementId: "G-5S8L0FXJ6N"
};
firebase.initializeApp(fbConfig);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const storageRef = firebase.storage().ref();

export default firebase;

