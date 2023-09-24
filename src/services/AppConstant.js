import { AppLogger } from "./AppLogger"
import toast from 'react-hot-toast';
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

export const handleDateString = (str = "") => {
    return Moment(str).format("MMM D, YYYY kk:mm A")
}

export const AppConstant = {
    FCM_SERVER_KEY: "AAAALECX4aw:APA91bGpuV8uBdr1X3Cug7aOTV2zXncVsOAKsazltvr5K9mEhTFzg-j_w_S-02YKaDHYgisYocWi9i8yd2D-oW-gEyelWpsEisi4OW08WoXaT7JgkXFMHWNWMS-_K1YT9fQkut5oVx7n",
}

export const showErrorToast = (desc = "") => {
    toast.dismiss()
    toast.error(desc)
}

export const showSuccessToast = (desc = "") => {
    toast.dismiss()
    toast.success(desc)
}

export const showToast = (desc = "") => {
    toast.dismiss()
    toast(desc)
}