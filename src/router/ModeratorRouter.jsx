import Account from "../pages/moderator-ui/layout/Account/Account";
import League from "../pages/moderator-ui/layout/League/League";
import LeagueDetail from "../pages/moderator-ui/layout/LeagueDetail/LeagueDetail";



const moderatorRouter = [
  { path: '/league', element: <League /> },
  { path: '/account/mytournament', element: <Account /> },
  { path: '/league/:id', element: <LeagueDetail /> },
 
];

export default moderatorRouter;