import { LoginRequest } from "../types/types";
import { url } from "./app-client";

export type UserDetails = {
    userId: number
    name: string
    email: string
    role: string
    token: string
}

export async function logInRequest(loginRequest: LoginRequest){
    try {
        const httpRequest = await fetch(`${url}/auth/login`,{
            method:"POST",
            body: JSON.stringify(loginRequest),
            headers:{
            "Content-Type":"application/json"
            }});

        if(httpRequest.status === 201){
            const userInfo:UserDetails = await httpRequest.json();
            return userInfo;
        } else {
            throw new Error(`HTTP status ${httpRequest.status} received during login request`);
        }

      } catch (error) {
        throw new Error("Error during login request");
      }
    }