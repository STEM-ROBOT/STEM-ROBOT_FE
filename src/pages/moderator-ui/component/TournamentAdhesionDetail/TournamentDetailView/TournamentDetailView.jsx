import React, { useEffect, useState } from "react";
import "./TournamentDetailView.css";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";

import api from "../../../../../config";
import { tournament_view } from "../../../api/ApiFlowView/ApiFlowView";
import DetailBar from "../../DetailBar/DetailBar";
import DetailBarAdhesion from "../DetailBarAdhesion/DetailBarAdhesion";
import Header from "../../../../system-ui/component/Header/Header";
import Footer from "../../../../system-ui/component/Footer/Footer";
import { competitions_adhesion_detail } from "../../../../../router/ModeratorRouter";

const TournamentDetailView = () => {
  const { tournamentAdhesionId } = useParams();
  const [league, setLeague] = useState();
  const [tabActive, setTabActive] = useState("competitions-adhesion");
  useEffect(() => {
    api.get(tournament_view + tournamentAdhesionId).then((response) => {
      setLeague(response.data.data);
    });
  }, []);

  const renderRoutes = (routes) =>
    routes.map((route, index) => {
      return <Route key={index} path={route.path} element={route.element} />;
    });
  return (
    <div className="league_detail_container">
      <Header />
      <DetailBarAdhesion
        league={league}
        tabActive={tabActive}
        setTabActive={setTabActive}
      />
      <div
        className="league_detail_option"
        style={{
          minHeight: "80vh",
        }}
      >
        <Routes>{renderRoutes(competitions_adhesion_detail)}</Routes>
      </div>
      <Footer />
    </div>
  );
};

export default TournamentDetailView;
