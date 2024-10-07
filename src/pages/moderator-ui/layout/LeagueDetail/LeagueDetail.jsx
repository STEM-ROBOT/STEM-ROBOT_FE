import React from "react";
import "./LeagueDetail.css";
import { useParams } from "react-router-dom";
import Header from "../../../system-ui/component/Header/Header";
import DetailBar from "../../component/DetailBar/DetailBar";
const LeagueDetail = () => {
  const { id } = useParams();
  return (
    <div className="league_detail_page">
      <Header />
      <div className="league_detail_container">
        <DetailBar/>
      </div>
    </div>
  );
};

export default LeagueDetail;
