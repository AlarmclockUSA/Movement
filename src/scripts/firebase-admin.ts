import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables
config({
  path: resolve(process.cwd(), '.env.local')
});

// Import service account from root directory
const serviceAccount = require(resolve(process.cwd(), 'service-account.json'));

// Initialize Firebase Admin if not already initialized
const app = !getApps().length 
  ? initializeApp({
      credential: cert(serviceAccount),
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
    })
  : getApps()[0];

const db = getFirestore(app);

export { db }; 