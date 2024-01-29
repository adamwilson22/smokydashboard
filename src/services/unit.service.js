import { db } from "../firebase-config";
import { collection, getDocs, addDoc, getCountFromServer, orderBy, query, where } from "firebase/firestore";

const unitCollection = collection(db, 'user');
const eventsCollection = collection(db, 'events');
const storesCollection = collection(db, 'stores');
const productsCollection = collection(db, 'products');
const subpayCollection = collection(db, 'subscriptionPayments');
const superAdminCollect = collection(db, 'superadmin');
const chatsCollect = collection(db, 'conversations');
const postsCollect = collection(db, 'posts');
const feedbackColl = collection(db, 'feedbacks');

class UnitDataService {


    addUnit = (addNewUnit) => {
        return addDoc(unitCollection, addNewUnit);
    }
    getAllUnit = () => { // all users
        const getUsers = query(unitCollection, where("isDeleted", "==", false));
        return getDocs(getUsers);
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

    getAllPostsFrFirebase = () => { // all posts
        return getDocs(postsCollect);
    }

    getAllFeedbacks = () => { // all feedbacks
        return getDocs(feedbackColl);
    }

    getAllChatsFirebase = () => { // all chats
        return getDocs(chatsCollect);
    }

    getSingleChatMessagesFire = (docid) => { // get all messages for a single chat
        const msgCollRef = collection(db, "conversations", docid, "messages")
        const msgQuery = query(msgCollRef, orderBy("createdAt"));
        return getDocs(msgQuery);
    }

    getAllSubsciptionsPayments = () => { // all 
        return getDocs(subpayCollection);
    }
    getSuperAdmins = () => { // super admin 
        return getDocs(superAdminCollect);
    }
    getUserCount = async () => {
        const getUsers = query(unitCollection, where("country", "!=", ""), where("isDeleted", "==", false))
        const snapshot = await getCountFromServer(getUsers);
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

