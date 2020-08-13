import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyB1Z-GWuspS5THrMtfR38XzK9YuBi-nO90',
  authDomain: 'instagram-clone-react-b6b97.firebaseapp.com',
  databaseURL: 'https://instagram-clone-react-b6b97.firebaseio.com',
  projectId: 'instagram-clone-react-b6b97',
  storageBucket: 'instagram-clone-react-b6b97.appspot.com',
  messagingSenderId: '556151744789',
  appId: '1:556151744789:web:195dd6b5342bb52b1e611c',
  measurementId: 'G-1D6Y9LSM02',
}

// Initialize Firebase with a "default" Firebase project
var firebaseApp = firebase.initializeApp(firebaseConfig)

console.log(firebaseApp.name) // "[DEFAULT]"

const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { db, auth, storage }
