import NavBar from "@/components/NavBar";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";


const Home = () => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token") ?? null);
  return (<>
    {token ? (
      <>
        <NavBar />
        <Outlet />
      </>
    ) : <Navigate to={"/login"} />}</>);

};

export default Home;