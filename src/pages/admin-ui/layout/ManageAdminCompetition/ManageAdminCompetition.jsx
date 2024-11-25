import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import SidebarCompetition from '../../component/SidebarCompetition/SidebarCompetition';
import { adminCompetitionChildren } from '../../../../router/AdminRouter';
import './ManageAdminCompetition.css';
import TokenService from '../../../../config/tokenservice';
import GroupMatch from '../../../moderator-ui/component/GroupMatchDraw/GroupMatch';
import KnockoutTournament from '../../../moderator-ui/component/KnockoutTournament/KnockoutTournament';
import PrivateRoute from '../../../../router/PrivateRoute';
import LoadingComponent from '../../../system-ui/component/Loading/LoadingComponent';
import { useSelector } from 'react-redux';

const ManageAdminCompetition = () => {
    const [formatId, setFormatId] = useState(null); // Ban đầu set là null
    const [loading, setLoading] = useState(true); // Trạng thái loading ban đầu

    const fetchedFormatId = TokenService.getFormatId(); // Lấy giá trị formatId từ TokenService
    const isFormat = useSelector((state) => state.getActiveFormat.data?.data?.isFormat); // Lấy giá trị isFormat từ Redux

    useEffect(() => {
      
        if (fetchedFormatId !== null) {
            setFormatId(fetchedFormatId); // Cập nhật formatId
        }
    }, [fetchedFormatId]);

    useEffect(() => {
      
        if (formatId !== null) {
            setLoading(false); 
        }
    }, [formatId]);

   
    // if (loading) {
    //     return <LoadingComponent position="fixed" borderRadius="8px" backgroundColor="rgba(0, 0, 0, 0.0)" />;
    // }

    const tournamentChildrenWithFormatId = adminCompetitionChildren.map((route) => {
        if (route.path === "create-matchups") {
            return {
                ...route,
                element: (
                    <PrivateRoute
                        element={(formatId !== null && formatId === 2 )? <GroupMatch /> : <KnockoutTournament />}
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
    );
};

export default ManageAdminCompetition;
