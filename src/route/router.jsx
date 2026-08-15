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

const router = createBrowserRouter([
    {
        path:"/",
        Component:HomeLayout,
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
                path:"/auth/registration",
                Component:Registration
            }
        ]

    },
    {
        path:"/category",
        Component:JobsLayout,
        children :[
            {
                path:"/category/:id",
                Component:CategoriesJobs,
                loader: () => fetch("/jobs.json"),
                hydrateFallbackElement:Loading
            }
        ],
    },
    {
        path:"/details",
        element:<PrivateRoute><DetailsLayout></DetailsLayout></PrivateRoute>,
       
        children:[
           {
             path:"/details/job/:id",
             element:<JobDetails></JobDetails>,
              loader:() => fetch("/jobs.json"),
              hydrateFallbackElement:Loading,
           },
           {
             path:"/details/company/:id",
             element:<CompanyDetails></CompanyDetails>,
              loader:() => fetch("/jobs.json"),
              hydrateFallbackElement:Loading,
           }
        ]
    },
    


])
export default router