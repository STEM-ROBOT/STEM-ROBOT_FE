import { Navigate } from "react-router-dom";
import Home from "../pages/system-ui/layout/Home/Home";

const systemRoutes = [
  { path: '/', element:  <Navigate to="/home" /> },
  { path: '/home', element: <Home /> },
 
];

export default systemRoutes;