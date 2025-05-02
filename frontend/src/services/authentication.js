// frontend/src/services/authentication.js
// ELIMINAR estas líneas:
// import dotenv from 'dotenv'
// dotenv.config({ path: '../../env'})

// USAR directamente:
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAuHIluWG6nBLTG-XUZBPPc2PWlFAtS6q8",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "roomioai.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "roomioai",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "roomioai.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "20135136281",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:20135136281:web:92922178fa5241d7c02e88",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-MC1XER1KEW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);