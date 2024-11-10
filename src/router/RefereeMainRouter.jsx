import { Navigate } from "react-router-dom";
import DashboardRefereeMain from "../pages/refereeMain-ui/layout/DashboardRefereeMain/DashboardRefereeMain";
import ScheduleRefereeMain from "../pages/refereeMain-ui/layout/ScheduleRefereeMain/ScheduleRefereeMain";
import RefereeMain from "../pages/refereeMain-ui/layout/RefereeMain/RefereeMain";
import GameRuleScore from "../pages/moderator-ui/component/GameRuleScore/GameRuleScore";
import RuleRefereeMain from "../pages/refereeMain-ui/layout/RuleRefereeMain/RuleRefereeMain";
import ScoreRefereeMain from "../pages/refereeMain-ui/layout/ScoreRefereeMain/ScoreRefereeMain";
import RefereeAssignHome from "../pages/refereeMain-ui/layout/RefereeAssignHome/RefereeAssignHome";

const refereeMainRouter = [
  {
    path: "/referee-main/*",
    element: <RefereeAssignHome />,
  },
  // {
  //   path: "/referee-main/competitionId:/*",
  //   element: <RefereeAssignHome />,
  // },
];

export const refereeMain_page = [
  {
    path: "",
    element: <Navigate to="competition-schedule" />,
  },
  {
    path: "competition-schedule",
    element: <RefereeMain />,
  },
  { path: "competition-schedule/:referee_competition_Id/*", element: <DashboardRefereeMain /> },
];
export const refereeMain_dashboard = [
  {
    path: "",
    element: <Navigate to="schedule" />,
  },
  { path: "schedule", element: <ScheduleRefereeMain /> },
  { path: "rule-competition", element: <RuleRefereeMain /> },
  { path: "score-competition", element: <ScoreRefereeMain /> },
];
export default refereeMainRouter;
