// utils/saveTrip.js
import { db } from "../firebase/firebase";
import { 
  collection, 
  doc, 
  setDoc, 
  addDoc,
  getDoc,
  getDocs, 
  deleteDoc, 
  serverTimestamp 
} from "firebase/firestore";

// Create or update a trip
export const saveTrip = async (userId, tripData, tripId = null) => {
  if (!userId) throw new Error("User not logged in");

  try {
    if (tripId) {
      // Update existing trip (only update fields + updatedAt)
      const tripRef = doc(db, "users", userId, "trips", tripId);
      await setDoc(
        tripRef, 
        { ...tripData, updatedAt: serverTimestamp() }, 
        { merge: true }
      );
      return tripId;
    } else {
      // Create new trip with createdAt
      const docRef = await addDoc(
        collection(db, "users", userId, "trips"), 
        { ...tripData, createdAt: serverTimestamp() }
      );
      return docRef.id;
    }
  } catch (error) {
    console.error("Error saving trip:", error);
    throw error; // bubble up so UI can handle it
  }
};

// Fetch a single trip by ID
export const getTrip = async (userId, tripId) => {
  if (!userId || !tripId) throw new Error("Missing userId or tripId");
  try {
    const tripRef = doc(db, "users", userId, "trips", tripId);
    const snap = await getDoc(tripRef);
    return snap.exists() ? { id: snap.id, ...snap.data() } : null;
  } catch (error) {
    console.error("Error fetching trip:", error);
    throw error;
  }
};


// Delete a trip
export const deleteTrip = async (userId, tripId) => {
  if (!userId) throw new Error("User not logged in");
  try {
    const tripRef = doc(db, "users", userId, "trips", tripId);
    await deleteDoc(tripRef);
  } catch (error) {
    console.error("Error deleting trip:", error);
    throw error;
  }
};

// Fetch all trips for a user
export const getUserTrips = async (userId) => {
  if (!userId) throw new Error("User not logged in");
  try {
    const snap = await getDocs(collection(db, "users", userId, "trips"));
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching trips:", error);
    throw error;
  }
};
