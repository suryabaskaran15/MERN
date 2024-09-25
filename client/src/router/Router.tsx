import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import Home from "../pages/Home";
import Accounts from "@/components/Accounts";
// import Accounts from "@/components/Accounts";
import LoginNew from "@/pages/LoginNew";
import Main from "@/pages/Main";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginNew />,
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