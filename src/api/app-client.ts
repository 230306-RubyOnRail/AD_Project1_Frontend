import axios from "axios"

export const url = "3.131.160.133:3000"

export const appClient = axios.create({
    baseURL: `${url}`,
    headers: {
        'Content-Type': 'application/json'
    }
})