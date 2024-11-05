import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../../component/Sidebar/Sidebar';
import { tournamentChildren } from '../../../../router/ModeratorRouter';
import './TournamentConfiguration.css';
import Header from '../../../system-ui/component/Header/Header';
import InfoTournament from '../../component/InfoTournament/InfoTournament';
import Footer from '../../../system-ui/component/Footer/Footer';
import TournamentHeader from '../../component/TournamentHeader/TournamentHeader';

const TournamentConfiguration = () => {
    const [activeItem, setActiveItem] = useState("format");

    const renderRoutes = (routes) =>
        routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
        ));

    return (
        <>
            <Header />
            <TournamentHeader />
            <div className='tournament-configuration-main'>
                <div className="tournament-configuration">
                    <Sidebar activeItem={activeItem} onMenuClick={setActiveItem} isGroupStage={true} />
                    <div className="config-content">
                        <Routes>{renderRoutes(tournamentChildren)}</Routes>
                    </div>
                </div>

            </div>

            <Footer />
        </>
    );
};

export default TournamentConfiguration;
