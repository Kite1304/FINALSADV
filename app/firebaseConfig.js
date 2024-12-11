// Import necessary Firebase SDKs
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase app configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA00tAxBJ3Fa-zoH8F66ogY6W1JjqmGcPs',
  authDomain: 'coffeenazure.firebaseapp.com',
  projectId: 'coffeenazure',
  storageBucket: 'coffeenazure.appspot.com',
  messagingSenderId: '905767876742',
  appId: '1:905767876742:web:168a800d46b25e49acf907',
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);  // Firebase Authentication
const db = getFirestore(app);  // Firestore Database

// Export the auth and db to use them in other parts of your app
export { auth, db };
