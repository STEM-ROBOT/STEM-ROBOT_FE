
import Account from "../pages/moderator-ui/layout/Account/Account";
import { Navigate, useParams } from "react-router-dom";
import CompetitionList from "../pages/moderator-ui/component/CompetitionList/CompetitionList";
import Countdown from "../pages/moderator-ui/component/Countdown/Countdown";
import League from "../pages/moderator-ui/layout/League/League";
import LeagueDetail from "../pages/moderator-ui/layout/LeagueDetail/LeagueDetail";
import TeamList from "../pages/moderator-ui/component/TeamList/TeamList";
import TournamentDetail from "../pages/moderator-ui/layout/TournamentDetail/TournamentDetail";
import ManageTournament from "../pages/moderator-ui/component/ManageTournament/ManageTournament";
import TournamentList from "../pages/moderator-ui/component/TournamentList/TournamentList";
import Competition from "../pages/moderator-ui/layout/Competition/Competition";
import TournamentConfiguration from "../pages/moderator-ui/layout/TournamentConfiguration/TournamentConfiguration";
import Tournament from "../pages/moderator-ui/layout/Tournament/Tournament";
import ManageCompetition from "../pages/moderator-ui/component/ManageCompetition/ManageCompetition";
import CompetitionDetail from "../pages/moderator-ui/layout/CompetitionDetail/CompetitionDetail";
import GameRuleComponent from "../pages/moderator-ui/component/GameRule/GameRuleComponent";
import TeamCompetition from "../pages/moderator-ui/component/TeamCompetition/TeamCompetition";
import RoundCompetition from "../pages/moderator-ui/component/RoundCompetition/RoundCompetition";
import CreateTournament from "../pages/moderator-ui/layout/CreateTournament/CreateTournament";
import MatchScheduleComponent from "../pages/moderator-ui/component/MatchScheduleComponent/MatchScheduleComponent";
import CreateTournamentCompetition from "../pages/moderator-ui/component/CreateTournamentCompetition/CreateTournamentCompetition";
import RegisterContestant from "../pages/moderator-ui/component/RegisterContestant/RegisterContestant";
import MatchGroupStageComponent from "../pages/moderator-ui/component/MatchGroupStageComponent/MatchGroupStageComponent";
import ListContestant from "../pages/moderator-ui/component/ListContestant/ListContestant";
import ListReferee from "../pages/moderator-ui/component/ListReferee/ListReferee";
import InfoTournament from "../pages/moderator-ui/component/InfoTournament/InfoTournament";
import CreateTournamentInfo from "../pages/moderator-ui/component/CreateTournamentInfo/CreateTournamentInfo";
import ConfigTournament from "../pages/moderator-ui/component/ConfigTournament/ConfigTournament";
import RoleAssignment from "../pages/moderator-ui/component/RoleAssignment/RoleAssignment";
import ManageTeam from "../pages/moderator-ui/component/ManageTeam/ManageTeam";
import KnockoutTournament from "../pages/moderator-ui/component/KnockoutTournament/KnockoutTournament";
import MatchManagement from "../pages/moderator-ui/component/MatchManagement/MatchManagement";
import RefereeAssignment from "../pages/moderator-ui/component/RefereeAssignment/RefereeAssignment";
import ManageArena from "../pages/moderator-ui/component/ManageArena/ManageArena";
import GroupAllocation from "../pages/moderator-ui/component/GroupAllocation/GroupAllocation";
import GroupMatch from "../pages/moderator-ui/component/GroupMatchDraw/GroupMatch";
import InforAccount from "../pages/moderator-ui/component/InfoAccount/InforAccount";
import PrivateRoute from './PrivateRoute';  


export const tournamentChildren = [
  { path: "format", element: <PrivateRoute element={<ConfigTournament />} requiredRole="MD" /> },
  { path: "permissions", element: <PrivateRoute element={<RoleAssignment />} requiredRole="MD" /> },
  { path: "teams", element: <PrivateRoute element={<ManageTeam />} requiredRole="MD" /> },
  { 
    path: "matchups", 
    element: <PrivateRoute element={<GroupMatch/>} requiredRole="MD" /> 
  },
  { path: "schedule", element: <PrivateRoute element={<MatchManagement />} requiredRole="MD" /> },
  { path: "referee", element: <PrivateRoute element={<RefereeAssignment />} requiredRole="MD" /> },
  { path: "arena", element: <PrivateRoute element={<ManageArena />} requiredRole="MD" /> },
  { path: "groupstage", element: <PrivateRoute element={<GroupAllocation />} requiredRole="MD" /> },
];

export const tournamentRoutes = [
  { path: "mycompetition", element: <PrivateRoute element={<ManageCompetition />} requiredRole="MD" /> },
  { path: "contestant", element: <PrivateRoute element={<ListContestant />} requiredRole="MD" /> },
  { path: "refee", element: <PrivateRoute element={<ListReferee />} requiredRole="MD" /> },
  { path: "create", element: <PrivateRoute element={<CreateTournamentInfo />} requiredRole="MD" /> },
];

export const competitionChildren = [
  { path: "settings", element: <PrivateRoute element={<TournamentConfiguration />} requiredRole="MD" /> },
];

export const league_detail = [
  { path: "", element: <PrivateRoute element={<Navigate to="competition" />} requiredRole="MD" /> },
  { path: "team-list", element: <PrivateRoute element={<TeamList />} requiredRole="MD" /> },
  { path: "competition", element: <PrivateRoute element={<CompetitionList />} requiredRole="MD" /> },
  { path: "register-contestant", element: <PrivateRoute element={<RegisterContestant />} requiredRole="MD" /> },
  { path: "competition/:competitionId/*", element: <PrivateRoute element={<CompetitionDetail />} requiredRole="MD" /> },
];

export const competition_detail_router = [
  { path: "", element: <PrivateRoute element={<Navigate to="game-rule" />} requiredRole="MD" /> },
  { path: "register-time", element: <PrivateRoute element={<Countdown />} requiredRole="MD" /> },
  { path: "game-rule", element: <PrivateRoute element={<GameRuleComponent />} requiredRole="MD" /> },
  { path: "team-competition-list", element: <PrivateRoute element={<TeamCompetition />} requiredRole="MD" /> },
  { path: "match-schedule", element: <PrivateRoute element={<MatchScheduleComponent />} requiredRole="MD" /> },
  { path: "stage-group", element: <PrivateRoute element={<MatchGroupStageComponent />} requiredRole="MD" /> },
  { path: "knockout", element: <PrivateRoute element={<MatchScheduleComponent />} requiredRole="MD" /> },
];

export const profileChildren = [
  { path: "mytournament", element: <PrivateRoute element={<TournamentList />} requiredRole="MD" /> },
  { path: "mytournament/:id", element: <PrivateRoute element={<TournamentDetail />} requiredRole="MD" /> },
  { path: "myinvoice", element: <PrivateRoute element={<></>} requiredRole="MD" /> },
];

const moderatorRouter = [
  { path: "/account/*", element: <PrivateRoute element={<Account />} requiredRole="MD" /> },
  { path: "profile", element: <PrivateRoute element={<InforAccount />} requiredRole="MD" /> },
  {
    path: "/account/*/:id",
    element: <PrivateRoute element={<Account />} requiredRole="MD" />,
  },
  { path: "/league/create-tournament", element: <PrivateRoute element={<CreateTournament />} requiredRole="MD" /> },
  { path: "/league", element: <PrivateRoute element={<League />} requiredRole="MD" /> },
  {
    path: "/league/:league_id/*",
    element: <PrivateRoute element={<LeagueDetail />} requiredRole="MD" />,
  },
  {
    path: "/mytournament/:tournamentId/mycompetition/:competitionId/*",
    element: <PrivateRoute element={<Competition />} requiredRole="MD" />,
  },
  {
    path: "/mytournament/:id/*",
    element: <PrivateRoute element={<Tournament />} requiredRole="MD" />,
  },
  {
    path: "/mytournament/:tournamentId/mycompetition/:competitionId/settings/*",
    element: <PrivateRoute element={<TournamentConfiguration />} requiredRole="MD" />,
  },
];

export default moderatorRouter;
