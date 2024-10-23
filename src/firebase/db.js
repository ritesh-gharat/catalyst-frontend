import { app } from "./config.js";
import {
  getFirestore,
  doc,
  setDoc,
  query,
  orderBy,
  updateDoc,
  deleteDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

export class DBService {
  constructor() {
    this.userId = localStorage.getItem("authUser")
      ? JSON.parse(localStorage.getItem("authUser"))._id
      : ""; // Get the user ID from local storage
    this.database = getFirestore(app);
  }

  // Firestore services
  // create a new session
  async createSession(sessionData) {
    try {
      const docRef = doc(collection(this.database, this.userId)); // Automatically generates a unique ID

      // Add createdAt and updatedAt timestamps to the session data
      sessionData.createdAt = serverTimestamp();

      await setDoc(docRef, sessionData); // Set the data
      return docRef; // Return the generated ID
    } catch (error) {
      console.error("Create Session :: error", error);
      return false;
    }
  }

  // get a session
  getSession(sessionId, callback) {
    try {
      const docRef = doc(this.database, this.userId, sessionId); // Reference to the specific document
      onSnapshot(
        docRef,
        (docSnap) => {
          if (docSnap.exists()) {
            callback(docSnap.data());
          } else {
            callback(null);
          }
        },
        (error) => {
          console.error("Get Session :: error", error);
          callback(false);
        }
      );
    } catch (error) {
      console.error("Get Session :: error", error);
      callback(false);
    }
  }

  // get all sessions
  getSessions(userId, callback) {
    try {
      const collectionRef = collection(this.database, userId); // Reference to the user's collection
      const orderedQuery = query(collectionRef, orderBy("createdAt", "desc")); // Order by 'asc' field in descending order

      onSnapshot(
        orderedQuery, // Use the ordered query instead of the collection reference
        (querySnapshot) => {
          const sessions = querySnapshot.docs.map((doc) => {
            let data = doc.data();
            data.id = doc.id; // Add the document ID to the data
            return data;
          });
          callback(sessions); // Return the array of session data
        },
        (error) => {
          console.error("Get Sessions :: error", error);
          callback(false);
        }
      );
    } catch (error) {
      console.error("Get Sessions :: error", error);
      callback(false);
    }
  }

  // update a session
  async updateSession(sessionId, updatedData) {
    try {
      await updateDoc(doc(this.database, this.userId, sessionId), updatedData);
      return true;
    } catch (error) {
      console.error("Update Session :: error", error);
      return false;
    }
  }

  // delete a session
  async deleteSession(sessionId) {
    try {
      await deleteDoc(doc(this.database, this.userId, sessionId));
      return true;
    } catch (error) {
      console.error("Delete Session :: error", error);
      return false;
    }
  }
}

const firebaseDB = new DBService();
export default firebaseDB;
