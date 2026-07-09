
import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { db , rtdb } from "../firebase";
import { ref, set, onDisconnect } from "firebase/database";
import { doc, setDoc } from "firebase/firestore";
export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
  try {
    setUser(currentUser);

    if (currentUser) {
      
      await setDoc(
  doc(db, "users", currentUser.uid),
  {
    uid: currentUser.uid,
    name: currentUser.displayName,
    photoURL: currentUser.photoURL,
  },
  { merge: true }
);
      const statusRef = ref(rtdb, `status/${currentUser.uid}`);

      await set(statusRef, {
        state: "online",
        lastChanged: Date.now(),
      });

      await onDisconnect(statusRef).set({
        state: "offline",
        lastChanged: Date.now(),
      });
    }
  } catch (error) {
    console.error(error);
  }

  setLoading(false);
});
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;