// utils/saveTrip.js
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const saveTrip = async (userId, tripData) => {
  if (!userId) throw new Error("User not logged in");

  const docRef = await addDoc(collection(db, "users", userId, "trips"), {
    ...tripData,
    createdAt: new Date().toISOString(),
  });

  return docRef.id;
};
