import React, { useEffect, useState } from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { competition_adhesion_detail_router, competition_detail_router } from "../../../../../router/ModeratorRouter";
import { IoLogoGameControllerB } from "react-icons/io";
import "./CompetitionAdhesionDetail.css";
import api from "/src/config";

const allTabs = [
  {
    name: "LUẬT THI ĐẤU",
    path: "game-rule",
  },
  {
    name: "DANH SÁCH ĐỘI ĐƯỢC THAM GIA",
    path: "team-competition-adhesion",
  },
];

const CompetitionAdhesionDetail = () => {
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [formatId, setFormatId] = useState(null);
  const path = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const currentSubPath = location.pathname.split("/").pop();

  useEffect(() => {
    api
      .get(
        `/api/competitions/register-config?competitionID=${path.competitionId}`
      )
      .then((response) => {
        const { status, formatId, image, name } = response.data;
        sessionStorage.setItem("ImageCompetition", image);
        setName(name);
        setStatus(status);
        setFormatId(formatId);
      })
      .catch((error) => {
        console.log(error);
      });

    const targetPosition = 285;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 500;
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
  }, [path.competitionId]);

  const renderRoutes = (routes) =>
    routes.map((route, index) => {
      return <Route key={index} path={route.path} element={route.element} />;
    });

  const handleTabClick = (tab) => {
    navigate(`${tab.path}`);
  };

  // Filter tabs based on status and formatId
  const filteredTabs = allTabs.filter((tab) => {
    if (
      tab.path === "register-time" &&
      status.toLocaleLowerCase() === "private"
    )
      return false;
    if (tab.path === "match-schedule" && formatId !== 1) return false;
    if (
      (tab.path === "stage-group" || tab.path === "knockout") &&
      formatId !== 2
    )
      return false;
    return true;
  });

  return (
    <div className="competition_container">
      <div className="introduction_header">
        <IoLogoGameControllerB className="icon_competition" />
        <span className="header_text">Nội dung thi đấu - {name}</span>
      </div>
      <div className="competition_detail_bar">
        <div className="competition_detail_tab">
          {filteredTabs.map((tab, i) => (
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
          <Routes>{renderRoutes(competition_adhesion_detail_router)}</Routes>
        </div>
      </div>
    </div>
  );
};

export default CompetitionAdhesionDetail;
