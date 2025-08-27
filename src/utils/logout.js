// src/utils/logout.js
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

export const logout = async (navigate) => {
  
  const confirmed = window.confirm("Are you sure you want to log out?")


  if (!confirmed) return

  try {
    await signOut(auth);
     navigate("/");
    console.log("User signed out");
    
  } catch (error) {
    console.error("Error signing out:", error);
  }
};
