import axios from "axios"

export const url = "http://3.133.89.242:3000"

export const appClient = axios.create({
    baseURL: `${url}`,
    headers: {
        'Content-Type': 'application/json'
    }
})