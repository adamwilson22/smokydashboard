
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";



// const firebaseConfig = {
//   apiKey: "AIzaSyCKQ76VlGDlvbbGdMmjkbikk6WGFOjSga4",
//   authDomain: "ashley-jenkins-5131c.firebaseapp.com",
//   databaseURL: "https://ashley-jenkins-5131c-default-rtdb.firebaseio.com",
//   projectId: "ashley-jenkins-5131c",
//   storageBucket: "ashley-jenkins-5131c.appspot.com",
//   messagingSenderId: "536268297942",
//   appId: "1:536268297942:web:6e427ff5e4d4a8f6e39b77"
// };
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4G2LPBhl5R-OMx-RnWYf5yDDhxUYDeWw",
  authDomain: "smokersclub-e39db.firebaseapp.com",
  databaseURL: "https://smokersclub-e39db.firebaseio.com",
  projectId: "smokersclub-e39db",
  storageBucket: "smokersclub-e39db.appspot.com",
  messagingSenderId: "190062256556",
  appId: "1:190062256556:web:35120a69516fd3202f5a09"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const firebaseMessaging = getMessaging(app);
export default app;
