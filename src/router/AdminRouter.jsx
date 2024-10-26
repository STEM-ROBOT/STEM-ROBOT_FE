import React from 'react'
import AdminPage from '../pages/admin-ui/layout/AdminPage';
import DashBoard from '../pages/admin-ui/component/DashBoard/DashBoard';


export const adminChildren = [
    { path: "dashboard", element: <DashBoard /> },
];
const adminRouter = [
    { path: "/admin/*", element: <AdminPage /> },
];


export default adminRouter;
