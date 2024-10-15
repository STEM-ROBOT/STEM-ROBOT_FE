
import Account from "../pages/moderator-ui/layout/Account/Account";
import { Navigate } from "react-router-dom";
import CompetitionList from "../pages/moderator-ui/component/CompetitionList/CompetitionList";
import Countdown from "../pages/moderator-ui/component/Countdown/Countdown";

import League from "../pages/moderator-ui/layout/League/League";
import LeagueDetail from "../pages/moderator-ui/layout/LeagueDetail/LeagueDetail";
import TeamList from "../pages/moderator-ui/component/TeamList/TeamList";
import CompetitionDetail from "../pages/moderator-ui/layout/CompetitionDetail/CompetitionDetail";
import GameRuleComponent from "../pages/moderator-ui/component/GameRule/GameRuleComponent";
import TeamCompetition from "../pages/moderator-ui/component/TeamCompetition/TeamCompetition";
import RoundCompetition from "../pages/moderator-ui/component/RoundCompetition/RoundCompetition";

export const league_detail = [
  { path: "", element: <Navigate to="register-time" /> },
  { path: "register-time", element: <Countdown /> },
  { path: "team-list", element: <TeamList /> },
  { path: "competition", element: <CompetitionList /> },
  { path: "competition/:competitionId/*", element: <CompetitionDetail /> },
];
export const competition_detail_router = [
  { path: "", element: <Navigate to="game-rule" /> },
  { path: "game-rule", element: <GameRuleComponent /> },
  { path: "team-competition-list", element: <TeamCompetition /> },
  { path: "match-schedule", element: <RoundCompetition /> },
  { path: "stage-group", element: <RoundCompetition /> },
  { path: "knockout", element: <RoundCompetition /> },
];
const moderatorRouter = [

  { path: '/account/mytournament', element: <Account /> },

  { path: "/league", element: <League /> },
  {
    path: "/league/:league_id/*",
    element: <LeagueDetail />,
  },
];

export default moderatorRouter;
