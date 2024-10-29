import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { adminChildren } from '../../../router/AdminRouter';
import SidebarAdmin from '../component/SidebarAdmin/SidebarAdmin';
import './AdminPage.css'

const AdminPage = () => {
    const renderRoutes = (routes) =>
        routes.map((route, index) => {
            return <Route key={index} path={route.path} element={route.element} />;
        });

    return (
        <div className="admin_dashboard_container_full_page">
            <div className="admin_dashboard_content_full_page">
                <div className="admin_dashboard_sidebar_section">
                    <SidebarAdmin />
                </div>
                <div className="admin_dashboard_main_content_section">
                    <div className="admin_dashboard_main_content_section_one">
                        <div className="admin_dashboard_main_content_section_two">
                            <Routes>{renderRoutes(adminChildren)}</Routes>
                        </div>
                    </div>

                </div>
            </div>

        </div>

    );
};

export default AdminPage;
