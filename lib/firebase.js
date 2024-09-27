import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWtxcn8xru2L5fBxXCi_77TZG2bG2dBG8",
  authDomain: "email-collector-b67d9.firebaseapp.com",
  projectId: "email-collector-b67d9",
  storageBucket: "email-collector-b67d9.appspot.com",
  messagingSenderId: "451805349130",
  appId: "1:451805349130:web:675f9de57ce7f48e58e6f3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
