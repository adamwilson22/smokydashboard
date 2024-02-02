import { db } from "../firebase-config";
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, where, query, getCountFromServer } from "firebase/firestore";

const unitCollectionRef = collection(db, 'units');
class UnitDataService {

    addUnits = (newUnit) => {
        return addDoc(unitCollectionRef, newUnit);
    };

    updateUnit = (id, updatedUnit) => {
        const unitDoc = doc(db, "units", id);
        return updateDoc(unitDoc, updatedUnit);
    };

    deleteUnit = (id) => {
        const unitDoc = doc(db, "units", id);
        return deleteDoc(unitDoc);
    };

    getAllUnit = () => {

        return getDocs(unitCollectionRef);
    }

    getSelectedUnit = (unitNo) => {
        const selectedUnits = query(collection(db, "units"), where("unitNo", "==", unitNo)); //this needs to be worked on
        return getDocs(selectedUnits);
    }

    getUnit = (id) => {
        const unitDoc = doc(db, "units", id);
        return getDoc(unitDoc);
    }

    getStoresAllProducts = (storeId) => {
        const storeProducts = query(collection(db, "products"), where("storeId", "==", storeId)); //this needs to be worked on
        return getDocs(storeProducts);
    }

    getUserDetails = (userId) => {
        const userObj = query(collection(db, "user"), where("uid", "==", userId));
        return getDocs(userObj);
    }

    getNotificationUsers = () => {
        const usersObj = query(collection(db, "user"), where("isNotification", "==", true));
        return getDocs(usersObj);
    }

    updateUser = (id, userStatus) => {
        const userDoc = doc(db, "user", id);
        return updateDoc(userDoc, { status: userStatus });
    };

    updatePostFirebase = (id, comments) => {
        const postItem = doc(db, "posts", id);
        return updateDoc(postItem, { comments: comments });
    };

    updateProduct = (id, body) => {
        const prodDoc = doc(db, "products", id);
        return updateDoc(prodDoc, body);
    };

    updateEvent = (id, body) => {
        const eventDoc = doc(db, "events", id);
        return updateDoc(eventDoc, body);
    };

    deleteUser = (id) => {
        const userDoc = doc(db, "user", id);
        return deleteDoc(userDoc);
    };

    deleteStore = (id) => {
        const storeDoc = doc(db, "stores", id);
        return deleteDoc(storeDoc);
    };

    deleteProduct = (id) => {
        const prod = doc(db, "products", id);
        return deleteDoc(prod);
    };

    deleteEvent = (id) => {
        const event = doc(db, "events", id);
        return deleteDoc(event);
    };

    deletePost = (id) => {
        const post = doc(db, "posts", id);
        return deleteDoc(post);
    };

    deleteFeedback = (id) => {
        const post = doc(db, "feedbacks", id);
        return deleteDoc(post);
    };

}

export default new UnitDataService();