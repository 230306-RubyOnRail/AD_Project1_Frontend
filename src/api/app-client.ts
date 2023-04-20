import axios from "axios"

export const url = "http://18.220.151.85:3000"

export const appClient = axios.create({
    baseURL: `${url}`,
    headers: {
        'Content-Type': 'application/json'
    }
})