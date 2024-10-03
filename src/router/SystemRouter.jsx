import { Navigate } from "react-router-dom";
import HomePage from "../pages/system-ui/layout/Home/Home";


const systemRoutes = [
  { path: '/', element:  <Navigate to="/home" /> },
  { path: '/home', element: <HomePage /> },
 
];

export default systemRoutes;