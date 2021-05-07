import firebase from 'firebase/app'
import 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyBZU2xflW1LgMv50yswoWtRXWNUJXCmfz4",
  authDomain: "erratic-verse.firebaseapp.com",
  databaseURL: "https://erratic-verse-default-rtdb.firebaseio.com",
  projectId: "erratic-verse",
  storageBucket: "erratic-verse.appspot.com",
  messagingSenderId: "672298196306",
  appId: "1:672298196306:web:4087c9c86211b89d8dae8b",
  measurementId: "G-P5TQ3HT44M"
}

firebase.initializeApp(firebaseConfig)