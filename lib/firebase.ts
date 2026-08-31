import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyA06tk1KcJSdHrExChtNIcPJrbs5gF0BCk",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "careerwithmohit-3cf30.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "careerwithmohit-3cf30",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "careerwithmohit-3cf30.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "450546959932",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:450546959932:web:ee41b0211cd6e0a1702539",
  measurementId: "G-HG217SM8ZS"
};

// Initialize Firebase app
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = typeof window !== 'undefined' ? getAuth(app) : null;
export default app;
