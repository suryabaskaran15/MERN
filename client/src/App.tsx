import { RouterProvider } from "react-router-dom"
import router from "./router/Router"
// import './App.css'
import './styles/form.css'

function App() {

  return (
    <>
     <RouterProvider router={router}/>
    </>
  )
}

export default App
