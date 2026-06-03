import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// Firestore may not be enabled for the configured project. Try to initialize
// it but fall back to `null` so the app can continue working (e.g. auth).
let _db: Firestore | null = null;
try {
  _db = getFirestore(app);
} catch (err) {
  // Keep this non-fatal — higher-level code can decide how to proceed.
  // eslint-disable-next-line no-console
  console.warn('@firebase/firestore: failed to initialize Firestore', err);
}

export const db = _db;
