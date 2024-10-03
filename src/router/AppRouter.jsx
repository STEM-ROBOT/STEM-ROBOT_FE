import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import systemRoutes from "./SystemRouter";
import moderatorRouter from "./ModeratorRouter";

function AppRouter() {
  return (
    <Router>
      <Routes>
        {systemRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
        {moderatorRouter.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  );
}

export default AppRouter;
