import React, { useEffect } from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Header from "../../../system-ui/component/Header/Header";
import Footer from "../../../system-ui/component/Footer/Footer";
import { competition_detail_router } from "../../../../router/ModeratorRouter";
import { IoLogoGameControllerB } from "react-icons/io";
import "./CompetitionDetail.css";
const tabs = [
  {
    name: "LUẬT THI ĐẤU",
    path: "game-rule",
  },
  {
    name: "DANH SÁCH ĐỘI",
    path: "team-competition-list",
  },
  {
    name: "LỊCH THI ĐẤU",
    path: "match-schedule",
  },
  {
    name: "VÒNG BẢNG",
    path: "stage-group",
  },
  {
    name: "VÒNG LOẠI TRỰC TIẾP",
    path: "knockout",
  },
];
const CompetitionDetail = () => {
  const path = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const currentSubPath = location.pathname.split("/").pop();
  const name = location.state?.names;
  console.log(name);

  useEffect(() => {
    // Tạo hiệu ứng scroll chậm
    const targetPosition = 245;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 500; // Thời gian (ms) cho hiệu ứng scroll, bạn có thể tăng để làm chậm hơn
    let start = null;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const scrollY = Math.min(
        startPosition + (distance * progress) / duration,
        targetPosition
      );
      window.scrollTo(0, scrollY);
      if (scrollY < targetPosition) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, []);

  const renderRoutes = (routes) =>
    routes.map((route, index) => {
      return <Route key={index} path={route.path} element={route.element} />;
    });
  const handleTabClick = (tab) => {
    navigate(
      `/league/${path.league_id}/competition/${path.competitionId}/${tab.path}`
    );
  };
  return (
    <div className="competition_container">
      <div className="introduction_header">
        <IoLogoGameControllerB className="icon_competition" />
        <span className="header_text">Nội dung thi đấu - {name}</span>
      </div>
      <div className="competition_detail_bar">
        <div className="competition_detail_tab">
          {tabs.map((tab, i) => (
            <div
              key={i}
              className={`competition_tab_item ${
                currentSubPath === tab.path ? "active" : ""
              }`}
              onClick={() => handleTabClick(tab)}
            >
              {tab.name}
              {currentSubPath === tab.path && (
                <div className="competition_indicator"></div>
              )}
            </div>
          ))}
        </div>
        <div className="competition_detail_option">
          <Routes>{renderRoutes(competition_detail_router)}</Routes>
        </div>
      </div>
    </div>
  );
};

export default CompetitionDetail;
