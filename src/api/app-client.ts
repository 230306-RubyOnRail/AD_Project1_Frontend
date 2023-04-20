import axios from "axios"

export const url = "http://3.134.85.143:3000"

export const appClient = axios.create({
    baseURL: `${url}`,
    headers: {
        'Content-Type': 'application/json'
    }
})