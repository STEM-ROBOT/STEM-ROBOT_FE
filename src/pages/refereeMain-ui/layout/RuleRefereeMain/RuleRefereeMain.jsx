import React from "react";
import "./RuleRefereeMain.css";
const ruleCompetition =
  "https://storage.cloud.google.com/stem-system-storage/mau-hop-dong-dat-coc.pdf?authuser=1";
const RuleRefereeMain = () => {
  return (
    <div className="rule_competition_referee">
      <div className="rule_competition_referee_layout">
        <div className="rule_competition_referee_head">
          <div className="rule_referee_head">Quy định của nội dung thi đấu</div>
        </div>
        <div
          className="rule_description"
          style={{ width: "100%", height: "90%" }}
        >
          <embed
            src={ruleCompetition}
            type="application/pdf"
            border-radius="13px"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default RuleRefereeMain;
