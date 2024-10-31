import React, { useEffect } from 'react';
import Header from '../../../system-ui/component/Header/Header';
import { Route, Routes, useParams } from 'react-router-dom';
import TournamentHeader from '../../component/TournamentHeader/TournamentHeader';
import Footer from '../../../system-ui/component/Footer/Footer';
import { competitionChildren } from "../../../../router/ModeratorRouter";
import './Competition.css'
import { useDispatch } from 'react-redux';
import { getListContestant } from '../../../../redux/actions/ContestantAction';

const Competition = () => {
//   const {id}= useParams();
//   const dispatch =useDispatch();
//   useEffect(() => {
//     dispatch(getListContestant(id));
//     dispatch(getCompetitionbyTournament(id));
// }, [dispatch]);
  return (
    <>
      <Header />
      <TournamentHeader />
      
      <div className='competition-content'>
        <Routes>
          {competitionChildren.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>

      <Footer />
    </>
  );
};

export default Competition;
