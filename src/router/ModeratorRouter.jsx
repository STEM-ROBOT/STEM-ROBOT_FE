import League from "../pages/moderator-ui/layout/League/League";
import LeagueDetail from "../pages/moderator-ui/layout/LeagueDetail/LeagueDetail";



const moderatorRouter = [
  { path: '/league', element: <League /> },
  { path: '/league/:id', element: <LeagueDetail /> },
 
];

export default moderatorRouter;