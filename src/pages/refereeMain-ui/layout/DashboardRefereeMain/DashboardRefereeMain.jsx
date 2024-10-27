import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardBarReferee from "../../component/DashboardBarReferee/DashboardBarReferee";
import { refereeMain_dashboard } from "../../../../router/RefereeMainRouter";
import "./DashboardRefereeMain.css";
const DashboardRefereeMain = () => {
  const renderRoutes = (routes) =>
    routes.map((route, index) => {
      return <Route key={index} path={route.path} element={route.element} />;
    });
  return (
    <div className="dashboard_referee_container">
      <div className="dashboard_referee_sidebar">
        <DashboardBarReferee />
      </div>
      <div className="dashboard_referee_content">
        <Routes>{renderRoutes(refereeMain_dashboard)}</Routes>
      </div>
    </div>
  );
};

export default DashboardRefereeMain;
