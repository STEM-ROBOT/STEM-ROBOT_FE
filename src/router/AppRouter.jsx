/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import systemRoutes from "./SystemRouter";
import moderatorRouter from "./ModeratorRouter";
import adminRouter from "./AdminRouter";

import refereeMainRouter from "./RefereeMainRouter";
function AppRouter() {
  const renderRoutes = (routes) =>
    routes.map((route, index) => {
      return <Route key={index} path={route.path} element={route.element} />;
    });
  return (
    <Router>
      <Routes>
        {renderRoutes(refereeMainRouter)}
        {renderRoutes(systemRoutes)}
        {renderRoutes(moderatorRouter)}
        {renderRoutes(adminRouter)}
      </Routes>
    </Router>
  );
}

export default AppRouter;
