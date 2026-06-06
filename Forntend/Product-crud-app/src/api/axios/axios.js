import axios from "axios"

export const baseURL =`http://localhost:3005/api`
export const AxiosInstance= axios.create ({
    baseURL
    
})

export default AxiosInstance;


