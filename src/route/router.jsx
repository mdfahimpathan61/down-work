import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layout/HomeLayout";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Page/Login";
import Registration from "../Page/Registration";
import JobsLayout from "../Layout/JobsLayout";

import CategoriesJobs from "../Page/CategoriesJobs";

const router = createBrowserRouter([
    {
        path:"/",
        Component:HomeLayout
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
        path:"/jobs",
        Component:JobsLayout,
        children :[
            {
                path:"/jobs/:id",
                Component:CategoriesJobs,
                loader: () => fetch("/jobs.json")
            }
        ],
    }

])
export default router