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

const LeagueDetail = () => {
  const id = useParams();
  const storedLeague = sessionStorage.getItem("leagueData");
  const [league, setLeague] = useState(JSON.parse(storedLeague));
  // useEffect(() => {
  //   if (!league) {
  //     const storedLeague = sessionStorage.getItem("leagueData");
  //     if (storedLeague) {
  //       setLeague(JSON.parse(storedLeague));
  //     }
  //   }
  // }, [league]);
  // console.log(league);

  const renderRoutes = (routes) =>
    routes.map((route, index) => {
      return <Route key={index} path={route.path} element={route.element} />;
    });
  return (
    <div className="league_detail_page">
      <Header />
      <div className="league_detail_container">
        <DetailBar league={league} />
        <div className="league_detail_option">
          <Routes>{renderRoutes(league_detail)}</Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LeagueDetail;
