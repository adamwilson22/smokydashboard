export const AppLogger = (title = "", desc = "") => {
    if (process.env.NODE_ENV == "development") {
        console.log(`======= ${title} ========`, desc);
    }
}