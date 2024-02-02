import toast from 'react-hot-toast';
import Moment from 'moment';


export const handleTags = (arrayString = []) => {
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

export const DateFormats = {
    dateFormatTimeStamp: "YYYY/MM/DD hh:mm A",
    dateFormatString: "MMM D, YYYY hh:mm A",
}


export const handleDateTime = (timeStamp, format = DateFormats.dateFormatTimeStamp) => {
    return Moment(timeStamp.seconds * 1000).format(format)
}

export const handleDateString = (str = "") => {
    return Moment(str).format(DateFormats.dateFormatString)
}

export const AppConstant = {
    // old key 
    // FCM_SERVER_KEY: "AAAALECX4aw:APA91bGpuV8uBdr1X3Cug7aOTV2zXncVsOAKsazltvr5K9mEhTFzg-j_w_S-02YKaDHYgisYocWi9i8yd2D-oW-gEyelWpsEisi4OW08WoXaT7JgkXFMHWNWMS-_K1YT9fQkut5oVx7n",
    // new key
    FCM_SERVER_KEY: "AAAAHTlGkzM:APA91bHHIpjROdKjCa7L8pC_fRlcivmkX63_bWKkgP1z9gWHFd3iHHAktj1UW3SV-aZjXYSCx_1Fm9YYhkhG2o-JkDESaMCkiLWC_-bqUW1TSYE9vR8Gd9-n0x99Bkm2sLkU3NHps-Ya",
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