import React from "react";

const MatchWaitStart = ({timeLeft}) => {
  return (
    <div className="match_display_match_play">
      Trận đấu sắp bắt đầu
      <div className="countdown_display_match_play">
        <div className="time_block match_action">
          <div className="time_value">{timeLeft?.minutes || 0}</div>
          <div className="time_label match_action">Phút</div>
        </div>
        <div className="time_block match_action">
          <div className="time_value">{timeLeft?.seconds || 0}</div>
          <div className="time_label match_action">Giây</div>
        </div>
      </div>
    </div>
  );
};

export default MatchWaitStart;
