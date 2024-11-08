import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import './ManageAdminTournament.css';
import NavbarAdmin from '../../component/NavbarAdmin/NavbarAdmin';
import { tournamentAdminChildren } from '../../../../router/AdminRouter';

const ManageAdminTournament = () => {
  const renderRoutes = (routes) =>
    routes.map((route, index) => {
        return <Route key={index} path={route.path} element={route.element} />;
    });
  return (
    <div className="manage-admin-tournament-container">    
      <NavbarAdmin />     
      <div className="manage-admin-tournament-content">
         <Routes>{renderRoutes(tournamentAdminChildren)}</Routes>
      </div>
    </div>
  );
};

export default ManageAdminTournament;
