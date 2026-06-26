import axios from "axios"

export const baseURL =`http://localhost:3005/api`
export const AxiosInstance= axios.create ({
    baseURL
    
});

AxiosInstance.interceptors.request.use((config)=>{
    const token=localStorage.getItem("token");
    if(token){
        config.headers.Authorization=`Bearer ${token}`;
       
    }
     return config;
   

},
(error)=>Promise.reject(error)

);
export default AxiosInstance;


