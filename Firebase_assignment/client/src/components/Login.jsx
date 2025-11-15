import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../firebase/firebase.init";
import { useEffect, useState } from "react";

export default function Login() {
  const [user, setUser] = useState();
  const [secretData, setSeceretData] = useState();

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
      console.log("User signed out successfully");
      setUser(null);
      setSeceretData(null);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  useEffect(() => {
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
          setSeceretData(data);
        } else {
          console.log("Failed to fetch secure data".response.status);
        }
      } catch (error) {
        console.log("Error fetching secure data", error.message);
      }
    };
    if (user) {
      fetchSecureData();
    }
  }, [auth, user]);
  //console.log(secretData);

  return (
    <div>
      {user ? (
        <>
          <button onClick={handleSignOut}>Sign Out</button>
          {/* <button onClick={fetchSecureData}>Fetch secure Data</button> */}
        </>
      ) : (
        <div>
          <button onClick={handleGoogleSignIn}>Google Login</button>
        </div>
      )}
      {user && (
        <div>
          <h3>Welcome {user.email}</h3>
        </div>
      )}
      {secretData && (
        <div>
          <p>
            {secretData.message} {secretData.firstName}
          </p>
        </div>
      )}
    </div>
  );
}
