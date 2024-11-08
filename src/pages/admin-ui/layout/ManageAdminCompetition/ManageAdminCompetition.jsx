import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import SidebarCompetition from '../../component/SidebarCompetition/SidebarCompetition';
import { adminCompetitionChildren } from '../../../../router/AdminRouter';
import './ManageAdminCompetition.css'
import TokenService from '../../../../Config/tokenservice';
import GroupMatch from '../../../moderator-ui/component/GroupMatchDraw/GroupMatch';
import KnockoutTournament from '../../../moderator-ui/component/KnockoutTournament/KnockoutTournament';
import PrivateRoute from '../../../../router/PrivateRoute';
const ManageAdminCompetition = () => {
    const [formatId, setFormatId] = useState(1); 
    const fetchedFormatId = TokenService.getFormatId();
    useEffect(() => {
        setFormatId(fetchedFormatId); 
    }, [fetchedFormatId]);

    const tournamentChildrenWithFormatId = adminCompetitionChildren.map((route) => {
        if (route.path === "create-matchups") {
            return {
                ...route,
                element: (
                    <PrivateRoute 
                        element={formatId === 2 ? <GroupMatch /> : <KnockoutTournament />} 
                        requiredRole="AD" 
                    />
                ),
            };
        }
        return route;
    });
    const renderRoutes = (routes) =>
        routes.map((route, index) => {
            return <Route key={index} path={route.path} element={route.element} />;
        });
    return (
        <div className="admin_competition_container_full_page">
            <div className="admin_competition_content_full_page">
                <div className="admin_competition_sidebar_section">
                    <SidebarCompetition />
                </div>
                <div className="admin_competition_main_content_section">
                    <div className="admin_competition_main_content_section_one">
                        <div className="admin_competition_main_content_section_two">
                            <Routes>{renderRoutes(tournamentChildrenWithFormatId)}</Routes>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default ManageAdminCompetition