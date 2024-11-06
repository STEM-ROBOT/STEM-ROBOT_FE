import React from "react";
import "./RefereeMain.css";
import SidebarTournamentReferee from "../../component/SidebarTournamentReferee/SidebarTounamentReferee";
import ContentTournamentReferee from "../../component/ContentTournamentReferee/ContentTournamentReferee";
const RefereeMain = () => {
  return (
    <div className="competition_referee_container">
      <div className="competition_referee_view">
        <div className="competition_referee_sidebar">
          <SidebarTournamentReferee />
        </div>
        <div className="competition_referee_content">
          <ContentTournamentReferee />
        </div>
      </div>
    </div>
  );
};

export default RefereeMain;
