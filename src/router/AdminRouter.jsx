import React from 'react'
import AdminPage from '../pages/admin-ui/layout/AdminPage';
import DashBoard from '../pages/admin-ui/component/DashBoard/DashBoard';
import CustomerTable from '../pages/admin-ui/component/CustomerTable/CustomerTable';
import OrderTable from '../pages/admin-ui/component/OrderTable/OrderTable';
import GerneManage from '../pages/admin-ui/component/GerneManage/GerneManage';


export const adminChildren = [
    { path: "dashboard", element: <DashBoard /> },
    { path: "manage-user", element: <CustomerTable /> },
    { path: "manage-order", element: <OrderTable /> },
    { path: "manage-genre", element: <GerneManage /> },
];
const adminRouter = [
    { path: "/admin/*", element: <AdminPage /> },
];


export default adminRouter;
