import { RouterProvider } from "react-router-dom"
import router from "./router/Router"
// import './App.css'
import './styles/form.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

function App() {
  const queryClient = new QueryClient(); // For tan satck query
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  )
}

export default App
