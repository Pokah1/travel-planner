// src/utils/logout.ts
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

export const logout = async (navigate) => {
  try {
    await signOut(auth);
     navigate("/");
    console.log("User signed out");
    
  } catch (error) {
    console.error("Error signing out:", error);
  }
};
