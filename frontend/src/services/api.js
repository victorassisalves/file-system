import axios from "axios";

const api = axios.create({
    baseURL: "https://file-system-vic.herokuapp.com",
});

export default api; 