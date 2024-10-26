import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import { adminChildren } from '../../../router/AdminRouter';
import SidebarAdmin from '../component/SidebarAdmin/SidebarAdmin';

const AdminPage = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };
    const renderRoutes = (routes) =>
        routes.map((route, index) => {
            return <Route key={index} path={route.path} element={route.element} />;
        });
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <SidebarAdmin
                openSidebarToggle={openSidebarToggle}
                OpenSidebar={OpenSidebar}
            />
            <div>
                <Routes>{renderRoutes(adminChildren)}</Routes>
            </div>
        </div>
    )
}

export default AdminPage
