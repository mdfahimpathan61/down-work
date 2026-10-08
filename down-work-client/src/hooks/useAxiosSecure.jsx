import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";

const instace = axios.create({
    baseURL : 'http://localhost:3000'
})

const useAxiosSecure = () =>{
    const {activeUser} = useAuth()


    useEffect(() => {
       const interceptorRequest =  instace.interceptors.request.use((config) =>{
            config.headers.authrization = `Bearer ${activeUser.getIdToken()}`
            return config
        })

        instace.interceptors.response.use((response) =>{
            return response
        },
        error => {
            return Promise.reject(error)
        }
    )

    return () => {
         instace.interceptors.request.eject(interceptorRequest)   
        }
    }, [activeUser])
}

export default useAxiosSecure