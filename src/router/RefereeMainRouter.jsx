import { Navigate } from "react-router-dom";
import DashboardRefereeMain from "../pages/refereeMain-ui/layout/DashboardRefereeMain/DashboardRefereeMain";
import ScheduleRefereeMain from "../pages/refereeMain-ui/layout/ScheduleRefereeMain/ScheduleRefereeMain";
import RefereeMain from "../pages/refereeMain-ui/layout/RefereeMain/RefereeMain";

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
    element: <Navigate to="schedule" />,
  },
  { path: "schedule", element: <ScheduleRefereeMain /> },
];
export default refereeMainRouter;
