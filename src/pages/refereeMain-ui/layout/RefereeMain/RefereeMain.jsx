import React from "react";
import { Route, Routes } from "react-router-dom";
import { refereeMain_page } from "../../../../router/RefereeMainRouter";

const RefereeMain = () => {
  const renderRoutes = (routes) =>
    routes.map((route, index) => {
      return <Route key={index} path={route.path} element={route.element} />;
    });
  return <Routes>{renderRoutes(refereeMain_page)}</Routes>;
};

export default RefereeMain;
