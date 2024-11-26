import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../../component/Sidebar/Sidebar';
import { tournamentChildren } from '../../../../router/ModeratorRouter';
import './TournamentConfiguration.css';
import Header from '../../../system-ui/component/Header/Header';
import InfoTournament from '../../component/InfoTournament/InfoTournament';
import Footer from '../../../system-ui/component/Footer/Footer';
import TournamentHeader from '../../component/TournamentHeader/TournamentHeader';
import GroupMatch from '../../component/GroupMatchDraw/GroupMatch';
import KnockoutTournament from '../../component/KnockoutTournament/KnockoutTournament';
import PrivateRoute from '../../../../router/PrivateRoute';
import TokenService from '../../../../config/tokenservice';



const TournamentConfiguration = () => {
    // const [activeItem, setActiveItem] = useState("format");
    const [activeItem, setActiveItem] = useState("settings/format");
    const [formatId, setFormatId] = useState(1); 
    const fetchedFormatId = TokenService.getFormatId();
    useEffect(() => {
        setFormatId(fetchedFormatId); 
    }, [fetchedFormatId]);
    console.log(formatId)

    const tournamentChildrenWithFormatId = tournamentChildren.map((route) => {
        if (route.path === "matchups") {
            return {
                ...route,
                element: (
                    <PrivateRoute 
                        element={formatId === 2 ? <GroupMatch /> : <KnockoutTournament />} 
                        requiredRole="MD" 
                    />
                ),
            };
        }
        return route;
    });

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
                    <Sidebar activeItem={activeItem} onMenuClick={setActiveItem} isGroupStage={formatId} />
                    <div className="config-content">
                        <Routes>{renderRoutes(tournamentChildrenWithFormatId)}</Routes>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default TournamentConfiguration;
