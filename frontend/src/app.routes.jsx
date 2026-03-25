import { createBrowserRouter } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";
import Home from "./features/interview/pages/Home";
import Report from "./features/interview/pages/Report";
import Output from "./features/interview/pages/Output";

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
    element:<Protected><Home/></Protected>,
    errorElement:<ErrorPage/>
  },
  {
    path:"/report/:id",
    element:<Protected><Report/></Protected>,
    errorElement:<ErrorPage/>
  },
  {
    path:"/reports",
    element:<Protected><Output/></Protected>
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