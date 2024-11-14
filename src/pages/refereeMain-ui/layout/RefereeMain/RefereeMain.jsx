import React, { useState } from "react";
import "./RefereeMain.css";
import SidebarTournamentReferee from "../../component/SidebarTournamentReferee/SidebarTounamentReferee";
import ContentTournamentReferee from "../../component/ContentTournamentReferee/ContentTournamentReferee";
const RefereeMain = () => {
  const [schedules, setSchedules] = useState();
  return (
    <div className="competition_referee_container">
      <div className="competition_referee_view">
        <div className="competition_referee_sidebar">
          <SidebarTournamentReferee setSchedules={setSchedules} />
        </div>
        <div className="competition_referee_content">
          <ContentTournamentReferee schedules={schedules} />
        </div>
      </div>
    </div>
  );
};
export default RefereeMain;
