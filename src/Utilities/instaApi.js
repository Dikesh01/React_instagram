import axios from "axios";

// It is a kind of instance of base api url
const instaApi = axios.create({
    baseURL:"https://instagram-express-app.vercel.app/api"
})

export default instaApi;