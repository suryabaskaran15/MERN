import { RouterProvider } from "react-router-dom"
import router from "./router/Router"
// import './App.css'
import './styles/form.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import './index.css'
import { ThemeProvider } from "./components/ThemeProvider"

function App() {
  const queryClient = new QueryClient(); // For tan satck query
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
