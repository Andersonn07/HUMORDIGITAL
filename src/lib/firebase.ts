import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

// TODO: Replace with your app's Firebase project configuration
// 1. Go to Firebase Console (https://console.firebase.google.com/)
// 2. Create a new project
// 3. Add a Web App to the project
// 4. Copy the config object below
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:123456:web:0987654321"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
