
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8rgY3UO1KMjgNk3Km5zdPPj6zrLciioU",
  authDomain: "outdoor-trader-8acf0.firebaseapp.com",
  projectId: "outdoor-trader-8acf0",
  storageBucket: "outdoor-trader-8acf0.appspot.com",
  messagingSenderId: "125514978099",
  appId: "1:125514978099:web:83731a6b17779fb16f2446",
  measurementId: "G-Q7HEEH2JM4"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
