import axios from "axios";

const instace = axios.create({
    baseURL : 'https://down-work-backend.vercel.app'
})

const useAxios = () =>{
    return instace
}

export default useAxios