import axios from "axios";

const api = axios.create({
    baseURL: "https://lcv-86w3.onrender.com/api",
    headers: {
        'Content-Type': 'application/json',
    },
})

export default api;