import React from 'react';
import Header from '../../../system-ui/component/Header/Header';
import Footer from '../../../system-ui/component/Footer/Footer';
import { Route, Routes } from 'react-router-dom';
import InfoTournament from '../../component/InfoTournament/InfoTournament';
import { tournamentRoutes } from '../../../../router/ModeratorRouter'; // Import the correct tournament routes

const Tournament = () => {
  return (
    <>
      <Header />
      <InfoTournament />
      <div className="account-outer">
        <Routes>
          {tournamentRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default Tournament;
