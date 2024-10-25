import { Navigate } from "react-router-dom";
import Home from "../pages/system-ui/layout/Home/Home";
import Packages from "../pages/system-ui/layout/Packages/Packages";
import ErrorPage from "../pages/system-ui/component/ErrorPage/ErrorPage";

const systemRoutes = [
  { path: "/", element: <Navigate to="/home" /> },
  { path: "/home", element: <Home /> },
  { path: "/pricing", element: <Packages /> },
  { path: "/404error", element: <ErrorPage /> },
];

export default systemRoutes;
