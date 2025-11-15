import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../firebase/firebase.init";
import { useState } from "react";

export default function Login() {
  const [user, setUser] = useState();

  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const loggedInUser = result.user;
      console.log("User:", loggedInUser);

      const token = await loggedInUser.getIdToken(true);
      console.log("Token:", token);

      localStorage.setItem("token", token);

      setUser(loggedInUser);
    } catch (error) {
      console.error("Error during sign-in", error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed otu successfully");
      setUser(null);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const fetchSecureData = async () => {
    try {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        console.log("No user signed in");
        return;
      }

      const token = await currentUser.getIdToken(true);

      localStorage.setItem("token", token);

      const response = await fetch("http://localhost:5001/secure-data", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Secure data", data);
      } else {
        console.log("Failed to fetch secure data".response.status);
      }
    } catch (error) {
      console.log("Error fetching secure data", error.message);
    }
  };

  return (
    <div>
      {user ? (
        <>
          <button onClick={handleSignOut}>Sign Out</button>
          <button onClick={fetchSecureData}>Fetch secure Data</button>
        </>
      ) : (
        <div>
          <button onClick={handleGoogleSignIn}>Google Login</button>
        </div>
      )}
      {user && (
        <div>
          <h3>User: {user.displayName}</h3>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
}
