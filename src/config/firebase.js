
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage"
const firebaseConfig = {
    apiKey: "AIzaSyD1xDgDjgYNgXi7XAzmjfUVBZ9d5L0rCDE",
    authDomain: "fir-tut-f4382.firebaseapp.com",
    projectId: "fir-tut-f4382",
    storageBucket: "fir-tut-f4382.appspot.com",
    messagingSenderId: "635506210054",
    appId: "1:635506210054:web:25e031abf70bffd0acda87",
    measurementId: "G-F897CP6YN8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)