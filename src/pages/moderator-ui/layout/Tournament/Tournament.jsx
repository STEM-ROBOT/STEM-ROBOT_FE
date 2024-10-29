import React, { useEffect } from 'react';
import Header from '../../../system-ui/component/Header/Header';
import Footer from '../../../system-ui/component/Footer/Footer';
import { Route, Routes, useParams } from 'react-router-dom';
import InfoTournament from '../../component/InfoTournament/InfoTournament';
import { tournamentRoutes } from '../../../../router/ModeratorRouter'; // Import the correct tournament routes
import { useDispatch } from 'react-redux';
import { getListTournament } from '../../../../redux/actions/TournamentAction';

const Tournament = () => {
 
  const dispatch =useDispatch();
  useEffect(() => {
    dispatch(getListTournament());
}, [dispatch]);
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
