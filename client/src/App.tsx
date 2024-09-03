import { RouterProvider } from "react-router-dom"
import router from "./router/Router"
// import './App.css'
import './styles/form.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import './index.css'
import { ThemeProvider } from "./components/ThemeProvider"
import { ToastProvider } from "./components/ui/toast"

function App() {
  const queryClient = new QueryClient(); // For tan satck query
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <ToastProvider>
            <RouterProvider router={router} />
          </ToastProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
