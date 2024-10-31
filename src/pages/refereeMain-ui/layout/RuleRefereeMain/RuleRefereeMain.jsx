import React from "react";
import "./RuleRefereeMain.css";
const ruleCompetition =
  "https://storage.googleapis.com/stem-system-storage/asdasdsa?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=stem-system-storage-upload%40stem-system.iam.gserviceaccount.com%2F20241029%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20241029T115911Z&X-Goog-Expires=86400&X-Goog-SignedHeaders=host&X-Goog-Signature=cf02c3ef1784d560ef3e8c0e4fd493c8029161c4e5d9a5aea01eb8b0ef845ba7588a697294fc3f63344982277361b4cdad2da744095b729d597ff475eceb56d3543856a44b2e9fcea2c8fa43ea32d44ebfe19bd5eb2c1f264758c583d5d340f81731e657754721fb50d75ff52221f76f826026ee653eff4f18bfa9b7bf1872c3c3286bc7bbccb2d35739a799991e31926403fd8412ee947cc336c9c83a67164dca535cea00624c28559c729469f3538a5b78f0f331a088c7b30d12f8f4d88a35ffe931e9a6363e58a7a8884a80b1804046e3c1dc54960360a4bc84a7f14ee5d238ed4f2a74d64f8ee9e9400a4985ac428728654c8588bd5afe9a34bcc2a4e7dd";
const RuleRefereeMain = () => {
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
