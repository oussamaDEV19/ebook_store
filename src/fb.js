import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCX3_R9ZO92pXlxN9G_PsIs3IUboiByOBw",
    authDomain: "e-book-store-4231c.firebaseapp.com",
    databaseURL: "https://e-book-store-4231c.firebaseio.com",
    projectId: "e-book-store-4231c",
    storageBucket: "e-book-store-4231c.appspot.com",
    messagingSenderId: "481633287881",
    appId: "1:481633287881:web:82354b3d07e73857849718"
  };
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();


export default db;