import NavBar from "@/components/NavBar";
import { Toaster } from "@/components/ui/toaster";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";


const Home = () => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token") ?? null);
  return (<>
    {token ? (
      <>
        <NavBar />
        <Outlet />
        <Toaster />
      </>
    ) : <Navigate to={"/login"} />}</>);

};

export default Home;