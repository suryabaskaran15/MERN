import { RouterProvider } from "react-router-dom"
import router from "./router/Router"
// import './App.css'
import './styles/form.css'
import './index.css'
import { ThemeProvider } from "./components/ThemeProvider"

function App() {

  return (
    <>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  )
}

export default App
