import { createBrowserRouter } from "react-router-dom";
import Registration from "../pages/Registration";
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
]);

export default router;