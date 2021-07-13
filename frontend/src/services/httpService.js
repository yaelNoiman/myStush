import axios from "axios";
import { toast } from "react-toastify";
import {getJwt} from "./userService"

axios.defaults.headers.common["x-auth-token"]=getJwt()

axios.interceptors.response.use(null,(error)=>{
  if(error.response && error.response.status<=403){
    toast("An unexpected error occurred");
  }
return Promise.reject(error);
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};