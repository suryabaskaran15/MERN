import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import Home from "../pages/Home";

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
        element: <Home />,
    },
]);

export default router;