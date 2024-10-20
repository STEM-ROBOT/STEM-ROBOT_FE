import Account from "../pages/moderator-ui/layout/Account/Account";
import { Navigate } from "react-router-dom";
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
import ListContestant from "../pages/moderator-ui/ListContestant/ListContestant";
import CompetitionDetail from "../pages/moderator-ui/layout/CompetitionDetail/CompetitionDetail";
import GameRuleComponent from "../pages/moderator-ui/component/GameRule/GameRuleComponent";
import TeamCompetition from "../pages/moderator-ui/component/TeamCompetition/TeamCompetition";
import RoundCompetition from "../pages/moderator-ui/component/RoundCompetition/RoundCompetition";
import CreateTournament from "../pages/moderator-ui/layout/CreateTournament/CreateTournament";
import MatchScheduleComponent from "../pages/moderator-ui/component/MatchScheduleComponent/MatchScheduleComponent";
import CreateTournamentCompetition from "../pages/moderator-ui/component/CreateTournamentCompetition/CreateTournamentCompetition";
import RegisterContestant from "../pages/moderator-ui/component/RegisterContestant/RegisterContestant";


export const tournamentRoutes = [
  { path: "mycompetition", element: <ManageCompetition /> },
  { path: "contestant", element: <ListContestant /> },
  { path: "settings", element: <CreateTournament/> },
];

export const competitionChildren = [
  { path: "dashboard", element: <div>Tournament Dashboard</div> },
  { path: "schedule", element: <div>Lịch Thi Đấu</div> },
  { path: "ranking", element: <div>Bảng Xếp Hạng</div> },
  { path: "customize", element: <TournamentConfiguration /> },
];

export const league_detail = [
  { path: "", element: <Navigate to="competition" /> },
  { path: "team-list", element: <TeamList /> },
  { path: "competition", element: <CompetitionList /> },
  { path: "register-contestant", element: <RegisterContestant /> },
  { path: "competition/:competitionId/*", element: <CompetitionDetail /> },
];
export const competition_detail_router = [
  { path: "", element: <Navigate to="game-rule" /> },
  { path: "register-time", element: <Countdown /> },
  { path: "game-rule", element: <GameRuleComponent /> },
  { path: "team-competition-list", element: <TeamCompetition /> },
  { path: "match-schedule", element: <MatchScheduleComponent /> },
  { path: "stage-group", element: <RoundCompetition /> },
  { path: "knockout", element: <MatchScheduleComponent /> },
];

export const profileChildren = [
  { path: "mytournament", element: <TournamentList /> },
  { path: "mytournament/:id", element: <TournamentDetail /> },
  { path: "mycompetitor", element: <></> },
  { path: "myinvoice", element: <></> },
];

const moderatorRouter = [
  { path: "/account/*", element: <Account /> },
  {
    path: "/account/*/:id",
    element: <Account />,
  },
  { path: "/league/create-tournament", element: <CreateTournament /> },
  { path: "/league", element: <League /> },
  {
    path: "/league/:league_id/*",
    element: <LeagueDetail />,
  },
  {
    path: "/mytournament/:tournamentId/mycompetition/:competitionId/*",
    element: <Competition />,
  },
  {
    path: "/mytournament/:id/*",
    element: <Tournament />,
  },
];

export default moderatorRouter;
