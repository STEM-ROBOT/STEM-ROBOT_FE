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
import PrivateRoute from "./PrivateRoute";
import LeagueRouter from "../pages/moderator-ui/layout/LeagueRouter/LeagueRouter";
import TeamRegister from "../pages/moderator-ui/component/TeamRegister/TeamRegister";
import TournamentAdhesion from "../pages/moderator-ui/component/TournamentAdhesion/TournamentAdhesion";
import TournamentDetailView from "../pages/moderator-ui/component/TournamentAdhesionDetail/TournamentDetailView/TournamentDetailView";
import ViewCompetitions from "../pages/moderator-ui/component/TournamentAdhesionDetail/ViewCompetitions/ViewCompetitions";
import CompetitionAdhesionDetail from "../pages/moderator-ui/component/TournamentAdhesionDetail/CompetitionAdhesionDetail/CompetitionAdhesionDetail";
import TeamCompetitionAdhesion from "../pages/moderator-ui/component/TournamentAdhesionDetail/TeamCompetitionAdhesion/TeamCompetitionAdhesion";
import TeamAdhesionView from "../pages/moderator-ui/component/TournamentAdhesionDetail/TeamAdhesionView/TeamAdhesionView";
import TeamSchedule from "../pages/moderator-ui/component/TournamentAdhesionDetail/TeamSchedule/TeamSchedule";

export const tournamentChildren = [
  {
    path: "format",
    element: <PrivateRoute element={<ConfigTournament />} requiredRole="MD" />,
  },
  {
    path: "permissions",
    element: <PrivateRoute element={<RoleAssignment />} requiredRole="MD" />,
  },
  {
    path: "teams",
    element: <PrivateRoute element={<ManageTeam />} requiredRole="MD" />,
  },
  {
    path: "matchups",
    element: <PrivateRoute element={<GroupMatch />} requiredRole="MD" />,
  },
  {
    path: "schedule",
    element: <PrivateRoute element={<MatchManagement />} requiredRole="MD" />,
  },
  {
    path: "referee",
    element: <PrivateRoute element={<RefereeAssignment />} requiredRole="MD" />,
  },
  {
    path: "arena",
    element: <PrivateRoute element={<ManageArena />} requiredRole="MD" />,
  },
  {
    path: "groupstage",
    element: <PrivateRoute element={<GroupAllocation />} requiredRole="MD" />,
  },
];

export const tournamentRoutes = [
  {
    path: "mycompetition",
    element: <PrivateRoute element={<ManageCompetition />} requiredRole="MD" />,
  },
  {
    path: "contestant",
    element: <PrivateRoute element={<ListContestant />} requiredRole="MD" />,
  },
  {
    path: "refee",
    element: <PrivateRoute element={<ListReferee />} requiredRole="MD" />,
  },
  {
    path: "create",
    element: (
      <PrivateRoute element={<CreateTournamentInfo />} requiredRole="MD" />
    ),
  },
];

export const competitionChildren = [
  {
    path: "settings",
    element: (
      <PrivateRoute element={<TournamentConfiguration />} requiredRole="MD" />
    ),
  },
  {
    path: "team-register",
    element: <PrivateRoute element={<TeamRegister />} requiredRole="MD" />,
  },
];

export const profileChildren = [
  {
    path: "my-tournament",
    element: <PrivateRoute element={<TournamentList />} requiredRole="MD" />,
  },
  {
    path: "my-tournament/:id",
    element: <PrivateRoute element={<TournamentDetail />} requiredRole="MD" />,
  },
  {
    path: "tournament-adhesion",
    element: (
      <PrivateRoute element={<TournamentAdhesion />} requiredRole="MD" />
    ),
  },

  {
    path: "my-invoice",
    element: <PrivateRoute element={<></>} requiredRole="MD" />,
  },
];

const moderatorRouter = [
  {
    path: "/account/*",
    element: <PrivateRoute element={<Account />} requiredRole="MD" />,
  },
  {
    path: "/profile",
    element: <PrivateRoute element={<InforAccount />} requiredRole="MD" />,
  },
  {
    path: "/account/*/:tournamentId",
    element: <PrivateRoute element={<Account />} requiredRole="MD" />,
  },
  {
    path: "/league/*",
    element: <LeagueRouter />,
  },
  {
    path: "tournament-adhesion/:tournamentAdhesionId/*",
    element: (
      <PrivateRoute element={<TournamentDetailView />} requiredRole="MD" />
    ),
  },
  {
    path: "/my-tournament/:tournamentId/mycompetition/:competitionId/*",
    element: <PrivateRoute element={<Competition />} requiredRole="MD" />,
  },
  {
    path: "/my-tournament/:tournamentId/*",
    element: <PrivateRoute element={<Tournament />} requiredRole="MD" />,
  },
  {
    path: "/my-tournament/:tournamentId/mycompetition/:competitionId/settings/*",
    element: (
      <PrivateRoute element={<TournamentConfiguration />} requiredRole="MD" />
    ),
  },
];
export const moderatorRouterLeagues = [
  {
    path: "",
    element: <League />,
  },
  { path: "create-tournament", element: <CreateTournament /> },
  {
    path: ":league_id/*",
    element: <LeagueDetail />,
  },
];
export const league_detail = [
  {
    path: "",
    element: <Navigate to="competition" />,
  },
  {
    path: "competition",
    element: <CompetitionList />,
  },
  {
    path: "competition/:competitionId/*",
    element: <CompetitionDetail />,
  },
  {
    path: "team-list",
    element: <TeamList />,
  },
  {
    path: "register-contestant",
    element: <RegisterContestant />,
  },
];
export const competitions_adhesion_detail = [
  {
    path: "",
    element: <Navigate to="competitions-adhesion" />,
  },
  {
    path: "competitions-adhesion",
    element: <ViewCompetitions />,
  },
  {
    path: "competitions-adhesion/:competitionId/*",
    element: <CompetitionAdhesionDetail />,
  },
  {
    path: "team-competition-adhesion/:teamId/*",
    element: <TeamAdhesionView />,
  },
];
export const team_adhesion_detail_router = [
  {
    path: "",
    element: <Navigate to="schedule-team" />,
  },
  {
    path: "game-rule",
    element: <TeamSchedule />,
  },
];
export const competition_adhesion_detail_router = [
  {
    path: "",
    element: <Navigate to="game-rule" />,
  },
  {
    path: "game-rule",
    element: <GameRuleComponent />,
  },
  {
    path: "team-competition-adhesion",
    element: <TeamCompetitionAdhesion />,
  },
];
export const competition_detail_router = [
  {
    path: "",
    element: <Navigate to="game-rule" />,
  },
  {
    path: "register-time",
    element: <Countdown />,
  },
  {
    path: "game-rule",
    element: <GameRuleComponent />,
  },
  {
    path: "team-competition-list",
    element: <TeamCompetition />,
  },
  {
    path: "match-schedule",
    element: <MatchScheduleComponent />,
  },
  {
    path: "stage-group",
    element: <MatchGroupStageComponent />,
  },
  {
    path: "knockout",
    element: <MatchScheduleComponent />,
  },
];
export default moderatorRouter;
