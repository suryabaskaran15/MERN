import { createBrowserRouter } from "react-router-dom";
import Registration from "../pages/Registration";
import Home from "../pages/Home";
import Accounts from "@/components/Accounts";
// import Accounts from "@/components/Accounts";
import LoginNew from "@/pages/LoginNew";
import Main from "@/pages/Main";
import Login from "@/pages/Login";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
        index: true
    },
    {
        path: "/signup",
        element: <Registration />,
    },
    {
        path: "/",
        element: <Home/>,
        children: [
            {
                path: '/',
                element: <Accounts />,
            }
        ]
    },
]);

export default router;