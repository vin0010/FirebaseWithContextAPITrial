import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const appConfiguration = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

export const app = firebase.initializeApp(appConfiguration);
export const auth = app.auth();
export const db = app.firestore();
export const session_type = firebase.auth.Auth.Persistence.LOCAL;
