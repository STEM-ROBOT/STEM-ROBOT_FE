import React, { useEffect, useState } from "react";
import "./RuleRefereeMain.css";
import api from "/src/config";

const RuleRefereeMain = () => {
  const [ruleCompetition, setRuleCompetition] = useState(null);
  useEffect(() => {
    const RuleApi = () => {
      api
        .get(`/api/competitions/score-competition?competitionID=${22}`)
        .then((response) => {
          console.log(response.data.data.data.regulation);
          
          setRuleCompetition(response.data.data.data.regulation)
        })
        .catch((error) => {
          console.log(error);
        });
    };
    if (ruleCompetition == null) {
      RuleApi();
    }
  }, []);
  return (
    <div className="rule_competition_referee">
      <div className="score_competition_referee_layout">
        <div className="score_competition_referee_item_layout">
          <div className="rule_competition_referee_head">
            <div className="rule_referee_head">
              Quy định của nội dung thi đấu
            </div>
          </div>
          <div className="rule_score_referee_container">
            <div className="rule_score_referee_view">
              <div
                className="rule_description"
                style={{
                  width: "100%",
                  height: "99%",
                  padding: "5px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <embed
                  src={ruleCompetition}
                  type="application/pdf"
                  border-radius="13px"
                  width="98%"
                  height="99%"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RuleRefereeMain;
