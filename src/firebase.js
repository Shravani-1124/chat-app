import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCusFes7Mn3S45T8jwvP7lHAimPGU4Ohq0",
  authDomain: "chat-app-1e027.firebaseapp.com",
  projectId: "chat-app-1e027",
  storageBucket: "chat-app-1e027.firebasestorage.app",
  messagingSenderId: "697040374330",
  databaseURL: "https://chat-app-1e027-default-rtdb.asia-southeast1.firebasedatabase.app",
  appId: "1:697040374330:web:78891be8b1e47c4b704303"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const rtdb = getDatabase(app);
const provider = new GoogleAuthProvider();
export { auth, provider, db,  rtdb  };




export default app;