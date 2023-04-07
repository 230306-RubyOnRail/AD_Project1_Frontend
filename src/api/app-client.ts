import axios from "axios"

export const appClient = axios.create({
    baseURL: 'httpp://localhost:3000',
    headers: {
        'Content-Type': 'application/json'
    }
})