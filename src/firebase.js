// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBSbhnSaUVscbm-FYQBKTSsFfVW8AAzTkg',
  authDomain: 'netflix-clone-9f7e5.firebaseapp.com',
  projectId: 'netflix-clone-9f7e5',
  storageBucket: 'netflix-clone-9f7e5.appspot.com',
  messagingSenderId: '100151042060',
  appId: '1:100151042060:web:67809fc672cda272f90e29',
  measurementId: 'G-H3SCTR1JLR'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
