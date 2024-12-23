import React, { useEffect, useState } from "react";
import "./LeagueDetail.css";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import Header from "../../../system-ui/component/Header/Header";
import DetailBar from "../../component/DetailBar/DetailBar";
import Footer from "../../../system-ui/component/Footer/Footer";
import CompetitionList from "../../component/CompetitionList/CompetitionList";
import Countdown from "../../component/Countdown/Countdown";
import TeamList from "../../component/TeamList/TeamList";
import { league_detail } from "../../../../router/ModeratorRouter";
import api from "../../../../config";
import { tournament_view } from "../../api/ApiFlowView/ApiFlowView";
import LoadingComponent from "../../../system-ui/component/Loading/LoadingComponent";

const LeagueDetail = () => {
  const id = useParams();
  const [league, setLeague] = useState();
  const [loadApi, setLoadApi] = useState(true);
  const [tabActive, setTabActive] = useState("competition");
  useEffect(() => {
    api
      .get(tournament_view + id.league_id)
      .then((response) => {
        setLeague(response.data.data);
        setLoadApi(false);
      })
      .catch((error) => {
        setLoadApi(false);
        alert("Đã xảy ra sự cố", error);
      });
  }, []);

  const renderRoutes = (routes) =>
    routes.map((route, index) => {
      return <Route key={index} path={route.path} element={route.element} />;
    });
  return (
    <div className="league_detail_container">
      {loadApi ? (
        <LoadingComponent position={"fixed"} />
      ) : (
        <>
          <DetailBar
            league={league}
            tabActive={tabActive}
            setTabActive={setTabActive}
          />
          <div className="league_detail_option">
            <Routes>{renderRoutes(league_detail)}</Routes>
          </div>
        </>
      )}
    </div>
  );
};

export default LeagueDetail;
