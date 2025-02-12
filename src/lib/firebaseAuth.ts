import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

if (!process.env.NEXT_PUBLIC_AUTH_FIREBASE_API_KEY) {
  throw new Error('Missing Auth Firebase configuration environment variables');
}

const authConfig = {
  apiKey: process.env.NEXT_PUBLIC_AUTH_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_AUTH_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_AUTH_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_AUTH_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_AUTH_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_AUTH_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase for Auth
const authApp = getApps().find(app => app.name === 'auth') || 
                initializeApp(authConfig, 'auth');
const auth = getAuth(authApp);

export { authApp, auth }; 