

// lib/firebase.js
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA68DGCmdc8H-Iz25cOg7CR32Dvo-1P4Yw",
    authDomain: "fpl24-d322c.firebaseapp.com",
    projectId: "fpl24-d322c",
    storageBucket: "fpl24-d322c.appspot.com",
    messagingSenderId: "716709670888",
    appId: "1:716709670888:web:1d435bb8114885f6d93e5d"
};

// Check if Firebase is already initialized, to avoid initializing multiple times
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
