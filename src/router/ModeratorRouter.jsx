import { Navigate } from "react-router-dom";
import CompetitionList from "../pages/moderator-ui/component/CompetitionList/CompetitionList";
import Countdown from "../pages/moderator-ui/component/Countdown/Countdown";
import League from "../pages/moderator-ui/layout/League/League";
import LeagueDetail from "../pages/moderator-ui/layout/LeagueDetail/LeagueDetail";
import TeamList from "../pages/moderator-ui/component/TeamList/TeamList";
export const children = [
  { path: "", element: <Navigate to="register-time" /> },
  { path: "register-time", element: <Countdown /> },
  { path: "competition", element: <CompetitionList /> },
  { path: "team-list", element: <TeamList /> },
];
const moderatorRouter = [
  { path: "/league", element: <League /> },
  {
    path: "/league/:id/*",
    element: <LeagueDetail />,
  },
  {
    path: "/league/:id",
    element: <LeagueDetail />,
  },
];

export default moderatorRouter;
