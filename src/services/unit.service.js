import { db } from "../firebase-config";
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

const unitCollection = collection(db, 'user');
const eventsCollection = collection(db, 'events');
const storesCollection = collection(db, 'stores');
const productsCollection = collection(db, 'products');
const subpayCollection = collection(db, 'subscriptionPayments');

class UnitDataService {


    addUnit = (addNewUnit) => {
        return addDoc(unitCollection, addNewUnit);
    }
    getAllUnit = () => { // all users
        return getDocs(unitCollection);
    }
    getAllEvents = () => { // all events
        return getDocs(eventsCollection);
    }
    getAllStores = () => { // all stores
        return getDocs(storesCollection);
    }
    getAllProducts = () => { // all 
        return getDocs(productsCollection);
    }
    getAllSubsciptionsPayments = () => { // all 
        return getDocs(subpayCollection);
    }

}

export default new UnitDataService();
