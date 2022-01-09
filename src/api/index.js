import axios from "axios";
import { API_KEY, BASE_URL } from "../assects/strings";

export const API = ({method,endpoint,limit,search,token}) =>{
    return axios({method:method,url:`${BASE_URL}/${endpoint}?api_key=${API_KEY}&limit=${limit}&q=${search}`})
    .then((res)=>{return res.data})
    .catch((err)=>{ throw err});
}

