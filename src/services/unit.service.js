import { db } from "../firebase-config";
import { collection, getDocs, getDoc, addDoc, getCountFromServer } from "firebase/firestore";

const unitCollection = collection(db, 'user');
const eventsCollection = collection(db, 'events');
const storesCollection = collection(db, 'stores');
const productsCollection = collection(db, 'products');
const subpayCollection = collection(db, 'subscriptionPayments');
const superAdminCollect = collection(db, 'superadmin');

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
    getAllProducts = () => { // all products
        return getDocs(productsCollection);
    }
    getAllSubsciptionsPayments = () => { // all 
        return getDocs(subpayCollection);
    }
    getSuperAdmins = () => { // super admin 
        return getDocs(superAdminCollect);
    }
    getUserCount = async () => {
        const snapshot = await getCountFromServer(unitCollection);
        // console.log('user list count: ', snapshot.data().count);
        return snapshot.data().count
    }
    getEventsCount = async () => {
        const snapshot = await getCountFromServer(eventsCollection);
        return snapshot.data().count
    }
    getSubsPaymentCount = async () => {
        const snapshot = await getCountFromServer(subpayCollection);
        return snapshot.data().count
    }
    getStoresCount = async () => {
        const snapshot = await getCountFromServer(storesCollection);
        return snapshot.data().count
    }
    getProductsCount = async () => {
        const snapshot = await getCountFromServer(productsCollection);
        return snapshot.data().count
    }

}

export default new UnitDataService();

