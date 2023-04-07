import { LoginRequest } from "../types/types";

const url: string = 'http://127.0.0.1:3000';

export type UserDetails = {
    userId: number
    name: string
    email: string
    role: string
}

export async function logInRequest(loginRequest: LoginRequest){
    try {
        const httpRequest = await fetch(`${url}/auth/login`,{
            method:"POST",
            body: JSON.stringify(loginRequest),
            headers:{
            "Content-Type":"application/json"
            }});
        
        const userInfo:UserDetails = await httpRequest.json();
        return userInfo;
      } catch (error) {
        throw new Error("Error during login request");
      }
    }

export async function postUser(userInfoForm: UserDetails):Promise<UserDetails>{
    const httpRequest = await fetch(`${url}/login`,{
    method:"POST",
    body: JSON.stringify(userInfoForm),
    headers:{
    "Content-Type":"application/json"
    }});

    const userInfo:UserDetails = await httpRequest.json();
    return userInfo;
}