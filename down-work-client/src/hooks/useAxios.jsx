import axios from "axios";

const instace = axios.create({
    baseURL : 'http://localhost:3000'
})

const useAxios = () =>{
    return instace
}

export default useAxios