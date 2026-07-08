import { useContext } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider, } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
function Login() {
    const { setUser } = useContext(AuthContext);
    const handleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    console.log("User:", user);

    await setDoc(
      doc(db, "users", user.uid),
      {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        lastSeen: serverTimestamp(),
      },
      { merge: true }
    );

    console.log("Firestore document created!");

    setUser(user);
  } catch (error) {
    console.error("ERROR:", error);
  }
};


  return (
    <div className="login-page">
      <h1>Real Time Chat App</h1>

      <button onClick={handleLogin}>
  Sign in with Google
</button>
    </div>
  );
}

export default Login;