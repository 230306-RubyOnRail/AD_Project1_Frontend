import { ReimbursementType} from "../types/types";

const url: string = 'http://127.0.0.1:3000';

export async function postReim(reimbursement: ReimbursementType): Promise<ReimbursementType> {
    try {
        const httpRequest = await fetch(`${url}/reimbursements/create`,{
            method:"POST",
            body: JSON.stringify(reimbursement),
            headers:{
                "Content-Type":"application/json"
            }});

        if(httpRequest.status === 201){
            const reimInfo: ReimbursementType = await httpRequest.json();
            return reimInfo;
        } else {
            throw new Error(`HTTP status ${httpRequest.status} received during reimbursement post request`);
        }

    } catch (error) {
        throw new Error("Error during reimbursement post request");
    }
}
