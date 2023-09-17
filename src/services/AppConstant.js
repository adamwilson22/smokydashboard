import { AppLogger } from "./AppLogger"
import Moment from 'moment';


export const handleTags = (arrayString = []) => {
    // AppLogger("arrayString", arrayString)
    var finalStr = ""
    arrayString.forEach((element, index) => {
        if (arrayString.length != 1
            && arrayString.length - 1 != index
            && arrayString[index + 1] != ""
        ) {
            finalStr += element + ", "
        } else {
            finalStr += element
        }
    })
    return finalStr
}

export const handleDateTime = (timeStamp) => {
    // AppLogger("timeStamp", timeStamp)
    // AppLogger("date", Moment(timeStamp.seconds * 1000).format("YYYY/MM/DD kk:mm A"))

    return Moment(timeStamp.seconds * 1000).format("YYYY/MM/DD kk:mm A")
}