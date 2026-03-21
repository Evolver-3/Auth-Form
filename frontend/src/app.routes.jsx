import { createBrowserRouter } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";

export const router=createBrowserRouter([
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/register",
    element:<Register/>
    
  },
  {
    path:"/",
    element:<Protected><h1>HomePage</h1></Protected>,
    errorElement:<ErrorPage/>
  }
])

function ErrorPage(){
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <a href="/Register">Go To Registration Page</a>
    </div>
  )
}