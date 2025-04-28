import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAuHIluWG6nBLTG-XUZBPPc2PWlFAtS6q8",
  authDomain: "roomioai.firebaseapp.com",
  projectId: "roomioai",
  storageBucket: "roomioai.firebasestorage.app",
  messagingSenderId: "20135136281",
  appId: "1:20135136281:web:92922178fa5241d7c02e88",
  measurementId: "G-MC1XER1KEW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);