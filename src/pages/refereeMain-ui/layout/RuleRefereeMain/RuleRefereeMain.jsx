import React from "react";
import "./RuleRefereeMain.css";
const ruleCompetition =
  "https://storage.googleapis.com/stem-system-storage/mhghjgj?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=stem-system-storage-upload%40stem-system.iam.gserviceaccount.com%2F20241028%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20241028T130321Z&X-Goog-Expires=86400&X-Goog-SignedHeaders=host&X-Goog-Signature=851d946971f6fc901350eb53fd2c05f2968683d2bb80346a85ab33c9e0cb1c4ba0cff4393dac982ef7952df72ff4de700e697f10c777e2eb7cf85a45d01580acfc52319ef8bb6947777786e31fa9995fc8e85eae6421e9bef4822c11f93000dd92d625c3bdaf4cfc1bc92109effcb31883030fc9ca50f955ead1fb0f148aafd578c6806a7739ec2009c2351d79ed76601d67331e1f85d9ab8f1d1117c68343da1adda724c819859f0917995457f20e245a16bc94a23f44673aff461ac51876b0b40fa732e09d532589140f7163a921895945d16f69102a2f7070a8f522cf56b3b83e5e35d2097855b04ce98256c25a7dcaa39ccca97787be1ab55184a72508f5";
const RuleRefereeMain = () => {
  return (
    <div className="rule_competition_referee">
      <div className="rule_competition_referee_layout">
        <div className="rule_competition_referee_item_layout">
          <div className="rule_competition_referee_head">
            <div className="rule_referee_head">
              Quy định của nội dung thi đấu
            </div>
          </div>
          <div className="schedule_referee_container">
            <div className="schedule_referee_view">
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
