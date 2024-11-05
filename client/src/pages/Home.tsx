import NavBar from "@/components/NavBar";
import { Toaster } from "@/components/ui/toaster";
import CLIENT from "@/libs/axios";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, } from "react-router-dom";


const Home = () => {
  const [user, setUser] = useState<object | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {    
    CLIENT.get('/accounts/me').then((res) => {
      if (!res.data) {
        navigate("/login")
      }
      setUser(res.data)
    }).catch(() => {
      navigate('/login')
    })
  },[])

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