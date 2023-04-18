import axios from "axios";
import { url } from "./app-client";

export const authAppClient = axios.create({
    baseURL: `${url}`,
    headers: {
        'Accept': "application/json",
    }
});

authAppClient.interceptors.request.use(
    (request) => {
        if(request.headers){
            request.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        }

        return request;
    }
)