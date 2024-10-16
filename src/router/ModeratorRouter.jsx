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


export const tournamentRoutes = [
  { path: "mycompetition", element: <ManageCompetition/> },
  { path: "contestant", element: <ListContestant/> },
];


export const competitionChildren = [
  { path: "dashboard", element: <div>Tournament Dashboard</div> },  
  { path: "schedule", element: <div>Lịch Thi Đấu</div> },           
  { path: "ranking", element: <div>Bảng Xếp Hạng</div> },           
  { path: "customize", element: <TournamentConfiguration/> },             
];

export const children = [
  { path: "", element: <Navigate to="register-time" /> },
  { path: "register-time", element: <Countdown /> },
  { path: "competition", element: <CompetitionList /> },
  { path: "team-list", element: <TeamList /> },
];

export const profileChildren = [
  { path: "mytournament", element: <TournamentList /> },
  { path: "mytournament/:id", element: <TournamentDetail /> },
  { path: "mycompetitor", element: <></> },
  { path: "myinvoice", element: <></> },
];

const moderatorRouter = [
  { path: '/account/*', element: <Account /> },
  {
    path: '/account/*/:id',
    element: <Account />
  },
  { path: "/league", element: <League /> },
  {
    path: "/league/:id/*",
    element: <LeagueDetail />,
  },
  {
    path: "/league/:id",
    element: <LeagueDetail />,
  },
  {
    path: "/competition/:id/*", element: <Competition />
  },
  {
    path: "/mytournament/:id/*", element: <Tournament />
  }
];

export default moderatorRouter;
