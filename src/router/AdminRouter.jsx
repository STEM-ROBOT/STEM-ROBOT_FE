import React from 'react'
import AdminPage from '../pages/admin-ui/layout/AdminPage/AdminPage';
import DashBoard from '../pages/admin-ui/component/DashBoard/DashBoard';
import CustomerTable from '../pages/admin-ui/component/CustomerTable/CustomerTable';
import OrderTable from '../pages/admin-ui/component/OrderTable/OrderTable';
import GerneManage from '../pages/admin-ui/component/GerneManage/GerneManage';
import PackageManage from '../pages/admin-ui/component/ManagePackage/PackageManage';
import CreateTournamentAdmin from '../pages/admin-ui/component/CreateTournamentAdmin/CreateTournamentAdmin';
import TournamentList from '../pages/moderator-ui/component/TournamentList/TournamentList';
import ManageAdminCompetition from '../pages/admin-ui/layout/ManageAdminCompetition/ManageAdminCompetition';
import ListTournamentAdmin from '../pages/admin-ui/component/ListTournamentAdmin/ListTournamentAdmin';
import ManageAdminTournament from '../pages/admin-ui/layout/ManageAdminTournament/ManageAdminTournament';
import ListCompetitionAdmin from '../pages/admin-ui/component/ListCompetitionAdmin/ListCompetitionAdmin';
import ListContestant from '../pages/moderator-ui/component/ListContestant/ListContestant';
import ListReferee from '../pages/moderator-ui/component/ListReferee/ListReferee';
import ManageTeam from '../pages/moderator-ui/component/ManageTeam/ManageTeam';
import ConfigTournament from '../pages/moderator-ui/component/ConfigTournament/ConfigTournament';
import RoleAssignment from '../pages/moderator-ui/component/RoleAssignment/RoleAssignment';
import GroupMatch from '../pages/moderator-ui/component/GroupMatchDraw/GroupMatch';
import MatchManagement from '../pages/moderator-ui/component/MatchManagement/MatchManagement';
import RefereeAssignment from '../pages/moderator-ui/component/RefereeAssignment/RefereeAssignment';
import GroupAllocation from '../pages/moderator-ui/component/GroupAllocation/GroupAllocation';
import PrivateRoute from './PrivateRoute';
import ManageArena from '../pages/moderator-ui/component/ManageArena/ManageArena';

export const adminChildren = [
    { path: "dashboard", element: <DashBoard /> },
    { path: "manage-user", element: <CustomerTable /> },
    { path: "manage-order", element: <OrderTable /> },
    { path: "manage-genre", element: <GerneManage /> },
    { path: "manage-package", element: <PackageManage /> },
    { path: "create-tournaments-admin", element: <CreateTournamentAdmin/> },
    { path: "tournaments-admin", element: <ListTournamentAdmin/> },
    { path: "tournament/:tournamentId/*", element: <ManageAdminTournament /> },   
];

// export const tournamentChildren = [
//     { path: "format", element: <PrivateRoute element={<ConfigTournament />} requiredRole="MD" /> },
//     { path: "permissions", element: <PrivateRoute element={<RoleAssignment />} requiredRole="MD" /> },
//     { path: "teams", element: <PrivateRoute element={<ManageTeam />} requiredRole="MD" /> },
//     { 
//       path: "matchups", 
//       element: <PrivateRoute element={<GroupMatch/>} requiredRole="MD" /> 
//     },
//     { path: "schedule", element: <PrivateRoute element={<MatchManagement />} requiredRole="MD" /> },
//     { path: "referee", element: <PrivateRoute element={<RefereeAssignment />} requiredRole="MD" /> },
//     { path: "arena", element: <PrivateRoute element={<ManageArena />} requiredRole="MD" /> },
//     { path: "groupstage", element: <PrivateRoute element={<GroupAllocation />} requiredRole="MD" /> },
//   ];
export const tournamentAdminChildren = [
    { path: "competitions", element: <ListCompetitionAdmin /> },
    { path: "contestants", element: <ListContestant /> },
    { path: "referees", element: <ListReferee /> },
];

export const adminCompetitionChildren =[
    { path: "create-format", element: <PrivateRoute element={<ConfigTournament />} requiredRole="AD" /> },
    { path: "create-rolereferee", element: <PrivateRoute element={<RoleAssignment />} requiredRole="AD" /> },
    { path: "create-team", element: <PrivateRoute element={<ManageTeam />} requiredRole="AD" /> },
    { 
      path: "create-matchups", 
      element: <PrivateRoute element={<GroupMatch/>} requiredRole="AD" /> 
    },
    { path: "create-schedule", element: <PrivateRoute element={<MatchManagement />} requiredRole="AD" /> },
    { path: "create-referee", element: <PrivateRoute element={<RefereeAssignment />} requiredRole="AD" /> },
    { path: "create-location", element: <PrivateRoute element={<ManageArena />} requiredRole="AD" /> },
    { path: "create-table", element: <PrivateRoute element={<GroupAllocation />} requiredRole="AD" /> },

]


const adminRouter = [
    { path: "/admin/*", element: <AdminPage />},   
    { path: "/admin/tournament/:tournamentId/competition/:competitionId/*", element: <ManageAdminCompetition /> },

];


export default adminRouter;
