import React from "react";
import { moderatorRouterLeagues } from "../../../../router/ModeratorRouter";
import { Route, Routes } from "react-router-dom";
import Header from "../../../system-ui/component/Header/Header";
import Footer from "../../../system-ui/component/Footer/Footer";

const LeagueRouter = () => {
  const renderRoutes = (routes) =>
    routes.map((route, index) => {
      return <Route key={index} path={route.path} element={route.element} />;
    });
  return (
    <div className="league_page">
      <Header />
      <Routes>{renderRoutes(moderatorRouterLeagues)}</Routes>
      <Footer />
    </div>
  );
};

export default LeagueRouter;
