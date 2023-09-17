import { db } from "../firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";

const unitCollection = collection(db, 'color');
class UnitDataService{
   

    addColor = (addNewColor) => {
        return addDoc(unitCollection, addNewColor);
    }
    getAllColor = () => {
        return getDocs(unitCollection);
    }

}

export default new UnitDataService();
