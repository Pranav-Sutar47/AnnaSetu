import axios from "axios";

export default async function apiRequest(url,method='GET',headers={},body=null){
    try{
        const response = await axios({
            url,
            method,
            headers,
            data:body
        });
        return{
            resStatus : response.status,
            message: response.message,
            error : null,
            data : response.data
        };
    }catch(error){
        return{
            resStatus: error.response ? error.response.status : 500,
            message: error.response ? error.response.statusText : 'Server Error',
            error: error.message,
            data: null,
        }
    }
}