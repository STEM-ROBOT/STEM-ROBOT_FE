import React, { useEffect, useState } from "react";
import { IoAlertCircleSharp } from "react-icons/io5";
import { MdGroupAdd } from "react-icons/md";
import { FaCheckSquare } from "react-icons/fa";
import api from "../../../../config";
import { useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../../system-ui/component/Loading/LoadingComponent";

const RegisterTeamStepTwo = ({ setRegisterTeam, teamInfo }) => {
  const navigate = useNavigate();
  const { league_id, competitionId } = useParams();
  const [contestantList, setContestant] = useState([]);
  const [selectedContestants, setSelectedContestants] = useState([]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const maxContestants = parseInt(sessionStorage.getItem("RegisterConfig"), 10);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    api
      .get(
        `/api/contestants/public-available-moderater?tounamentId=${league_id}&competitionId=${competitionId}`
      )
      .then((response) => {
        setContestant(response.data.data);
      });
  }, [league_id, competitionId]);

  const handleCheckboxChange = (id) => {
    setSelectedContestants((prevSelected) => {
      if (prevSelected.some((item) => item.contestantId === id)) {
        // Nếu đã có, loại bỏ thí sinh theo ID
        return prevSelected.filter((item) => item.contestantId !== id);
      } else if (prevSelected.length < maxContestants) {
        // Thêm đối tượng { contestantId: id } vào danh sách đã chọn nếu chưa đạt tối đa
        return [...prevSelected, { contestantId: id }];
      } else {
        alert(`Chỉ có thể chọn tối đa ${maxContestants} thí sinh.`);
        return prevSelected;
      }
    });
  };

  const toggleSelectAll = () => {
    if (isSelectAll) {
      setSelectedContestants([]);
    } else {
      const allContestantObjects = contestantList
        .slice(0, maxContestants) // Lấy tối đa `maxContestants` thí sinh
        .map((contestant) => ({ contestantId: contestant.id }));
      console.log(allContestantObjects);

      setSelectedContestants(allContestantObjects);
    }
    setIsSelectAll(!isSelectAll);
  };
  const submitRegister = () => {
    setLoading(true);
    const data = {
      name: teamInfo.teamName,
      phoneNumber: teamInfo.phone,
      contactInfo: teamInfo.contactName,
      image: teamInfo.logo,
      status: "Đang xét",
      email: teamInfo.email,
      contestants: selectedContestants,
    };
    //setLoading(true);
    api
      .post(`/api/teams-register?competitionId=${competitionId}`, data)
      .then((response) => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(data);
  };
  return (
    <div className="register_config_team">
      <div className="register_warning">
        <IoAlertCircleSharp className="icon_contestant" />
        Để tiếp tục đăng ký cho một đội khác bạn phải hoàn thành đăng ký hoặc
        <div
          className="cancel_register_team"
          onClick={() => setRegisterTeam(false)}
        >
          hủy đăng ký
        </div>
        này.
      </div>
      <div className="register_warning">
        <IoAlertCircleSharp className="icon_contestant" />
        {`Nội dung thi đấu yêu cầu số lượng thành viên mỗi đội nhiều nhất là ${maxContestants}.`}
      </div>
      <div className="register_action_option">
        <div
          className="btn_register_action"
          onClick={() => navigate(`/league/${league_id}/register-contestant`)}
        >
          <MdGroupAdd className="register_action_icon" />
          Thêm thí sinh
        </div>
        <div className="btn_register_action" onClick={toggleSelectAll}>
          <FaCheckSquare className="register_action_icon" />
          {isSelectAll ? "Bỏ chọn tất cả" : "Chọn tất cả"}
        </div>
      </div>
      <div className="label_create">Danh sách thí sinh của bạn </div>
      <div style={{ padding: "5px 0" }}>
        {contestantList?.length > 0 ? (
          <div className="team_table">
            <div className="table_header">
              <div className="column_header">Chọn</div>
              <div className="column_header">Hình Ảnh</div>
              <div className="column_header">Tên Thí Sinh</div>
              <div className="column_header">SĐT Liên Hệ</div>
              <div className="column_header" style={{ maxWidth: "100px" }}>
                Giới Tính
              </div>
              <div className="column_header">Trường</div>
              <div className="column_header">T/G Đăng Ký</div>
            </div>
            <div
              className="table_body"
              style={{ maxHeight: "300px", overflowY: "scroll" }}
            >
              {contestantList.map((contestant) => (
                <div
                  key={contestant.id}
                  className="table_row"
                  style={{ alignItems: "center", cursor: "pointer" }}
                  onClick={() => handleCheckboxChange(contestant.id)}
                >
                  <div className="table_cell">
                    <input
                      type="checkbox"
                      style={{
                        width: "20px",
                        height: "20px",
                        color: "#012c50",
                      }}
                      checked={selectedContestants.some(
                        (item) => item.contestantId === contestant.id
                      )}
                      readOnly
                    />
                  </div>
                  <div className="table_cell">
                    <img
                      src={contestant.image}
                      alt="Thí sinh"
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "100px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="table_cell">{contestant.name}</div>
                  <div className="table_cell">{contestant.phone}</div>
                  <div className="table_cell" style={{ maxWidth: "100px" }}>
                    {contestant.gender}
                  </div>
                  <div className="table_cell">
                    {contestant.schoolName.split("SchoolName: ")[1].trim()}
                  </div>
                  <div className="table_cell">
                    {contestant.startTime.slice(0, 16).replace("T", " ")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="no_data_message">
            Bạn đang chưa có thành viên nào trong danh sách.
            <br /> Bạn vui lòng thêm thành viên vào danh sách thí sinh của giải
            trước khi đăng ký tham gia nội dung thi đấu.
          </div>
        )}
      </div>
      <div className="send_register_team">
        <div className="btn_send_register_team" onClick={submitRegister}>
          Đăng Ký
        </div>
      </div>
      {loading && (
        <LoadingComponent position={"fixed"} backgroundColor={"#83cceb48"} />
      )}
    </div>
  );
};

export default RegisterTeamStepTwo;
