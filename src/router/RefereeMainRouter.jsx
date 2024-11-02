import { Navigate } from "react-router-dom";
import DashboardRefereeMain from "../pages/refereeMain-ui/layout/DashboardRefereeMain/DashboardRefereeMain";
import ScheduleRefereeMain from "../pages/refereeMain-ui/layout/ScheduleRefereeMain/ScheduleRefereeMain";
import RefereeMain from "../pages/refereeMain-ui/layout/RefereeMain/RefereeMain";
import GameRuleScore from "../pages/moderator-ui/component/GameRuleScore/GameRuleScore";
import RuleRefereeMain from "../pages/refereeMain-ui/layout/RuleRefereeMain/RuleRefereeMain";
import ScoreRefereeMain from "../pages/refereeMain-ui/layout/ScoreRefereeMain/ScoreRefereeMain";

const refereeMainRouter = [
  {
    path: "/referee-main/*",
    element: <RefereeMain />,
  },
];
export const refereeMain_page = [
  {
    path: "",
    element: <Navigate to="dashboard" />,
  },
  { path: "dashboard/*", element: <DashboardRefereeMain /> },
];
export const refereeMain_dashboard = [
  {
    path: "",
    element: <Navigate to="rule-competition" />,
  },
  { path: "schedule", element: <ScheduleRefereeMain /> },
  { path: "rule-competition", element: <RuleRefereeMain /> },
  { path: "score-competition", element: <ScoreRefereeMain /> },
];
export default refereeMainRouter;
