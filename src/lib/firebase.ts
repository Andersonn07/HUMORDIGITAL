import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

const env = import.meta.env;

export const isFirebaseConfigured = Boolean(
  env.VITE_FIREBASE_API_KEY &&
  env.VITE_FIREBASE_API_KEY !== 'AIzaSyXXXXXXXXXXXXXXX' &&
  !env.VITE_FIREBASE_API_KEY.includes('XXXXX')
);

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || "AIzaSyXXXXXXXXXXXXXXX",
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || "humor-digital.firebaseapp.com",
  projectId: env.VITE_FIREBASE_PROJECT_ID || "humor-digital",
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || "humor-digital.appspot.com",
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: env.VITE_FIREBASE_APP_ID || "1:123456:web:0987654321"
};

// Initialize Firebase safely
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
