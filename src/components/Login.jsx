import { useContext } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { AuthContext } from "../context/AuthContext";
function Login() {
    const { setUser } = useContext(AuthContext);

const handleLogin = async () => {
    console.log("Button clicked!");
  try {
    const result = await signInWithPopup(auth, provider);

    setUser(result.user);

    console.log(result.user);
  } catch (error) {
    console.log(error);
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