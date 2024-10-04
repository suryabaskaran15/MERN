import NavBar from "@/components/NavBar";
import { Toaster } from "@/components/ui/toaster";
import axios from "axios";
import { useState } from "react";
import { Outlet, useNavigate, } from "react-router-dom";


const Home = () => {
  const [user, setUser] = useState<object | null>(null);
  const navigate = useNavigate();

  axios.get("http://localhost:3016/api/auth/me", { withCredentials: true }).then((res) => {
    if (!res.data) {
      navigate("/login")
    }
    setUser(res.data)
  }).catch(() => {
    navigate('/login')
  })

  return (<>
    {user && (
      <>
        <NavBar />
        <Outlet />
        <Toaster />
      </>
    )}
  </>);

};

export default Home;