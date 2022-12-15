import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCkOrcbmyi5JHToz1dL71dXGva9OPlhijQ",
  authDomain: "netflix-34efe.firebaseapp.com",
  projectId: "netflix-34efe",
  storageBucket: "netflix-34efe.appspot.com",
  messagingSenderId: "424862539158",
  appId: "1:424862539158:web:11af0af2061768f3ac91b7",

  // apiKey: import.meta.env.VITE_FIREBASE_API_KEY, authDomain:
  // import.meta.env.VITE_AUTH_DOMAIN, projectId:
  // import.meta.env.VITE_PROJECTID, storageBucket:
  // import.meta.env.VITE_STORAGE_BUCKET, messagingSenderId:
  // import.meta.env.VITE_MESSAGE_ID, appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
