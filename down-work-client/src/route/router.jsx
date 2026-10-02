import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layout/HomeLayout";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Page/Login";
import Registration from "../Page/Registration";
import JobsLayout from "../Layout/JobsLayout";

import CategoriesJobs from "../Page/CategoriesJobs";
import JobDetails from "../Page/JobDetails";
import Loading from "../Component/Loading";

import PrivateRoute from "./PrivateRoute";
import Error from "../Page/Error";
import DetailsLayout from "../Layout/DetailsLayout";
import CompanyDetails from "../Page/CompanyDetails";
import BrowseService from "../Page/BrowseService";
import ForgotPassword from "../Page/ForgotPassword";
import Role from "../Page/Role";
import RoleGuard from "./RoleGuard";
import ClientLayout from "../Layout/ClientLayout";
import Postjob from "../Page/Postjob"
import MyJobs from "../Page/Myjobs";

const router = createBrowserRouter([
    {
        path:"/",
        element:<RoleGuard><HomeLayout></HomeLayout></RoleGuard>,
        errorElement:<Error></Error>
    },
    {
        path:"/auth",
        Component:AuthLayout,
        children:[
            {
                path:"/auth/login",
                Component:Login
            },
            {
                path:"/auth/role",
                Component:Role
            },
            {
                path:"/auth/forgotpassword",
                element:<ForgotPassword></ForgotPassword>
            },
            {
                 path:"/auth/registration/:role",
                 Component:Registration,
                 
            }
        ]

    },
    {
        path:"/category",
        element:<RoleGuard><JobsLayout></JobsLayout></RoleGuard>,
        children :[
            {
                path:"/category/:id",
                Component:CategoriesJobs,
                loader: () => fetch("http://localhost:3000/jobs"),
                hydrateFallbackElement:Loading
            }
        ],
    },
    {
        path:"/details",
        element:<RoleGuard><PrivateRoute><DetailsLayout></DetailsLayout></PrivateRoute></RoleGuard>,
       
        children:[
           {
             path:"/details/job/:id",
             element:<JobDetails></JobDetails>,
              loader:({params}) => fetch(`http://localhost:3000/jobs?id=${params.id}`),
              hydrateFallbackElement:Loading,
           },
           {
             path:"/details/company/:id",
             element:<CompanyDetails></CompanyDetails>,
              loader:() => fetch("http://localhost:3000/jobs"),
              hydrateFallbackElement:Loading,
           }
        ]
    },
    {
        path:"/client",
        element:<RoleGuard><ClientLayout></ClientLayout></RoleGuard>,
        children:[
            {
                path:'/client/postjob',
                element:<Postjob mode="create"></Postjob>
            },
            {
                path:'/client/mypostedjobs',
                element: <MyJobs></MyJobs>
            },
            {
                path:'/client/update/job/:id',
                element:<Postjob mode="update"></Postjob>
            }
        ]
    },
    {
        path:"/browseservice",
        element:<BrowseService></BrowseService>
    },
    
    


])
export default router