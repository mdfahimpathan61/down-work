import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const instace = axios.create({
  baseURL: "https://down-work-backend.vercel.app",
});

const useAxiosSecure = () => {
  const { activeUser,setLoading } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    const interceptorRequest = instace.interceptors.request.use(
      
      async (config) => {
        
        if (activeUser) {
          const token = await activeUser.getIdToken();

          config.headers.authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
       
        return Promise.reject(error);
      }
    );

    const interceptorResponse = instace.interceptors.response.use(
      (response) => {
        
        return response;
      },
      (error) => {
        
        if (error.response?.status === 404) {
          navigate("/notfound");
        }
        
        return Promise.reject(error);
      }
    );

    return () => {
      instace.interceptors.request.eject(interceptorRequest);
      instace.interceptors.response.eject(interceptorResponse);
    };
  }, [activeUser]);


  return instace;
};

export default useAxiosSecure;