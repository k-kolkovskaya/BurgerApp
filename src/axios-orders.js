import axios from "axios";

const instance = axios.create({
    baseUrl: "https://react-burger-app-8dfbd.firebaseio.com"
});

export default instance;