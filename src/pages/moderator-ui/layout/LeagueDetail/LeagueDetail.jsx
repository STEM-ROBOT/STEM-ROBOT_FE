import React, { useState } from "react";
import "./LeagueDetail.css";
import { useParams } from "react-router-dom";
import Header from "../../../system-ui/component/Header/Header";
import DetailBar from "../../component/DetailBar/DetailBar";
import Footer from "../../../system-ui/component/Footer/Footer";
const LeagueDetail = () => {
  const { id } = useParams();
  const [pageView, setPageView] = useState();
  return (
    <div className="league_detail_page">
      <Header />
      <div className="league_detail_container">
        <DetailBar setPageView={setPageView} />
        <div className="league_detail_option">{pageView}</div>
      </div>
      <Footer />
    </div>
  );
};

export default LeagueDetail;
