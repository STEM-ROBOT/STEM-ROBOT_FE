import React, { useEffect, useRef, useState } from "react";
import "./CreateTournamentFormat.css";
import { IoAlertCircle } from "react-icons/io5";
import { GiFinishLine } from "react-icons/gi";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCompetitionFormat, getCompetitionInfo } from "../../../../redux/actions/CompetitionAction";
import { getActive } from "../../../../redux/actions/FormatAction";
import LoadingComponent from "../../../system-ui/component/Loading/LoadingComponent";

const formats = [
  {
    id: 1,
    name: "Loại trực tiếp",
    image: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7 10H17V20H7L7 10ZM5 10C5 8.89543 5.89543 8 7 8H17C18.1046 8 19 8.89543 19 10V14H24.0667C24.619 14 25.0667 14.4477 25.0667 15V23H30V19C30 17.8954 30.8954 17 32 17H42C43.1046 17 44 17.8954 44 19V29C44 30.1046 43.1046 31 42 31H32C30.8954 31 30 30.1046 30 29V25H25.0667V33C25.0667 33.5523 24.619 34 24.0667 34H19V38C19 39.1046 18.1046 40 17 40H7C5.89543 40 5 39.1046 5 38V28C5 26.8954 5.89543 26 7 26H17C18.1046 26 19 26.8954 19 28V32H23.0667V16H19V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V10ZM7 28H17V38H7L7 28Z"
          fill="white"
        />
      </svg>
    ),
    teamMin: 2,
    teamMax: 128,
  },
  {
    id: 2,
    name: "Chia bảng đấu",
    image: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7 10C7 8.34315 8.34315 7 10 7H38C39.6569 7 41 8.34315 41 10V38C41 39.6569 39.6569 41 38 41H10C8.34315 41 7 39.6569 7 38V10ZM10 9C9.44772 9 9 9.44772 9 10V15H23V9H10ZM25 9V15H39V10C39 9.44772 38.5523 9 38 9H25ZM39 17H25V23H39V17ZM39 25H25V31H39V25ZM39 33H25V39H38C38.5523 39 39 38.5523 39 38V33ZM23 39V33H9V38C9 38.5523 9.44772 39 10 39H23ZM9 31H23V25H9V31ZM9 23H23V17H9V23Z"
          fill="white"
        />
      </svg>
    ),
    teamMin: 6,
    teamMax: 128,
  },
  {
    id: 3,
    name: "Đua tranh top",
    image: (
      <svg
        width="38"
        height="38"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          fill="white"
          d="M23 24v464h18V386.9c152.3 29.4 277.6 29.4 430 0V488h18V24h-18v16h-23v32h23v32h-23v32h23v232.6c-153.3 29.9-276.7 29.9-430 0V104h23V72H41V24H23zm41 48h32V40H64v32zm32 0v32h32V72H96zm32 0h32V40h-32v32zm32 0v32h32V72h-32zm32 0h32V40h-32v32zm32 0v32h32V72h-32zm32 0h32V40h-32v32zm32 0v32h32V72h-32zm32 0h32V40h-32v32zm32 0v32h32V72h-32zm32 0h32V40h-32v32zm32 0v32h32V72h-32zm0 32h-32v32h32v-32zm-64 0h-32v32h32v-32zm-64 0h-32v32h32v-32zm-64 0h-32v32h32v-32zm-64 0h-32v32h32v-32zm-64 0H64v32h32v-32z"
        />
      </svg>
    ),
    teamMin: 2,
    teamMax: 128,
  },
];
const teamGoIn = [2, 4, 8, 16, 32, 64];
const CreateTournamentFormat = ({ }) => {
  const { competitionId } = useParams();
  const dispatch = useDispatch();
  const [formatCompetition, setFormatCompetition] = useState(formats[0]);
  const [teamNumber, setTeamNumber] = useState(8);
  const [memberNumber, setMemberNumber] = useState(1);
  const [dayRegisNumber, setDayRegisNumber] = useState(2);
  const [startTime ,setStartTime] = useState();
  const [showSetupTable, setShowSetupTable] = useState(false); // State để lưu số đội
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);
  const [groupOptions, setGroupOptions] = useState();
  const [winPoints, setWinPoints] = useState("");
  const [drawPoints, setDrawPoints] = useState("");
  const [losePoints, setLosePoints] = useState("");
  const [errorWin, setErrorWin] = useState("");
  const [errorDraw, setErrorDraw] = useState("");
  const [errorLose, setErrorLose] = useState("");
  const [startTimeError, setStartTimeError] = useState("");
  const [selectedGroups, setSelectedGroups] = useState();
  const [groupError, setGroupError] = useState("");
  const [selectedTeamsNextRound, setSelectedTeamsNextRound] = useState("");
  const [teamsNextRoundError, setTeamsNextRoundError] = useState("");
  const isAddSuccess = useSelector((state) => state.addCompetitionFormat?.success);
  const loadingAdd = useSelector((state) => state.addCompetitionFormat?.loading);
  const isPublic = useSelector((state) => state.infoTournament.tournamentInfo?.data?.status);
 

  useEffect(()=>{
    dispatch(getActive(competitionId))
    dispatch(getCompetitionInfo(competitionId));
  },[isAddSuccess])

  const handleTeamNumberChange = (e) => {
    const input = e.target.value;

    if (/^\d*$/.test(input)) {
      const teamCount = parseInt(input, 10);
      setTeamNumber(teamCount);

      if (teamCount >= 6) {
        const maxGroups = Math.floor(teamCount / 3);
        const options = Array.from({ length: maxGroups - 1 }, (_, i) => i + 2);
        setGroupOptions(options);
      } else {
        setGroupOptions([]);
      }
    }
  };

  const handleGroupChange = (e) => {
    const selectedGroups = parseInt(e.target.value, 10);
    setSelectedGroups(selectedGroups);

    const minGroups = Math.ceil(teamNumber / 16);
    const maxGroups = Math.floor(teamNumber / 3);

    if (selectedGroups < minGroups || selectedGroups > maxGroups) {
      setGroupError(`Số bảng đấu phải từ ${minGroups} đến ${maxGroups} cho ${teamNumber} đội.`);
    } else {
      setGroupError("");
    }
  };
  const handleTeamsNextRoundChange = (e) => {
    const selectedTeams = parseInt(e.target.value, 10);
    setSelectedTeamsNextRound(selectedTeams);
    validateTeamsNextRound(selectedTeams, selectedGroups);
  };

  const validateTeamsNextRound = (teams, groups) => {
    if (teams < groups) {
      setTeamsNextRoundError(`Số đội vào vòng trong phải bằng hoặc nhiều hơn số bảng đấu.`);
    } else {
      setTeamsNextRoundError("");
    }
  };

  const handleStartTimeChange = (e) => {
    const selectedStartTime = new Date(e.target.value);
    const currentRegisterTime = new Date();

    if (selectedStartTime <= currentRegisterTime) {
        setStartTimeError("Ngày bắt đầu (startTime) phải sau ngày đăng ký (registerTime).");
        setStartTime(""); // Optionally reset startTime if invalid
    } else {
        setStartTimeError(""); // Clear error if valid
        setStartTime(e.target.value); // Update startTime
    }
};

  const selectFormat = (format) => {
    setFormatCompetition(format);
    setTeamNumber(format.teamMin); // Cập nhật số lượng đội với giá trị tối thiểu của hình thức thi đấu

    if (format.id == 2) {
      setIsExpanded(true);
      setShowSetupTable(true);
      const groups = Math.ceil(format.teamMin / 4); // Ví dụ: mỗi bảng có tối đa 4 đội
      const options = Array.from({ length: groups - 1 }, (_, i) => i + 2); // tạo danh sách bảng từ 2 trở lên
      console.log(options);
      setGroupOptions(options);
    } else {
      setShowSetupTable(false);
      setIsExpanded(false);
    }
  };
  const handlePointsChange = (type, value) => {
    const parsedValue = parseInt(value, 10);

    if (isNaN(parsedValue)) {
      return;
    }

    if (type === "win") {
      setWinPoints(parsedValue);
      if (parsedValue <= drawPoints) {
        setErrorWin("Điểm thắng phải lớn hơn điểm hòa.");
      } else {
        setErrorWin("");
        setErrorDraw("");
      }
    } else if (type === "draw") {
      setDrawPoints(parsedValue);
      if (parsedValue >= winPoints) {
        setErrorDraw("Điểm hòa phải nhỏ hơn điểm thắng.");
      } else if (parsedValue <= losePoints) {
        setErrorDraw("Điểm hòa phải lớn hơn điểm thua.");
      } else {
        setErrorLose("");
        setErrorDraw("");
      }
    } else if (type === "lose") {
      setLosePoints(parsedValue);
      if (parsedValue >= drawPoints) {
        setErrorLose("Điểm thua phải nhỏ hơn điểm hòa.");
      } else {
        setErrorLose("");
        setErrorDraw("");
      }
    }
  };
  const handleDayRegisNumberChange = (e) => {
    setDayRegisNumber(e.target.value); // Set the date value directly
};
  const handleMemberNumberChange = (e) => {
    const input = e.target.value;

    // Kiểm tra xem input có phải là số không, nếu đúng thì cập nhật state
    if (/^\d*$/.test(input)) {
      const teamCount = parseInt(input, 10); // Chuyển input sang số nguyên
      setMemberNumber(teamCount);
    }
  };

  const handleSubmit = () => {
    if (!startTime) {
        setStartTimeError("Vui lòng chọn ngày bắt đầu hợp lệ.");
        return;
    }

    const registerTime = new Date().toISOString();
    const selectedStartTime = new Date(startTime);

    if (selectedStartTime <= new Date()) {
        setStartTimeError("Ngày bắt đầu phải sau ngày đăng ký.");
        return;
    } else {
        setStartTimeError("");
    }

    const data = {
        formatId: formatCompetition.id,
        registerTime: registerTime,
        startTime: selectedStartTime.toISOString(),
        numberContestantTeam: memberNumber || 0,
        isTop: formatCompetition.id === 3,
        numberTeam: teamNumber,
        numberTeamNextRound: parseInt(document.querySelector(".format_tournament").value) || 0,
        numberTable: parseInt(document.querySelector(".format_tournament").value) || 0,
        winScore: winPoints || 0,
        loseScore: losePoints || 0,
        tieScore: drawPoints || 0
    };
    console.log(data)

    dispatch(addCompetitionFormat(competitionId, data))
      .then(() => {
        // Reset các state của input về giá trị mặc định sau khi thành công
        setFormatCompetition(formats[0]);
        setTeamNumber(8);
        setMemberNumber(1);
        setDayRegisNumber(2);
        setStartTime("");
        setWinPoints("");
        setDrawPoints("");
        setLosePoints("");
        setErrorWin("");
        setErrorDraw("");
        setErrorLose("");
        setStartTimeError("");
        setGroupOptions([]);
        setShowSetupTable(false);
        setIsExpanded(false);
      })
      .catch(error => {
        console.error("Lỗi khi thêm hình thức thi đấu:", error);
      });
};


  return (
    <div className="container_create_format_tournament">
       {loadingAdd && (<LoadingComponent position="fixed"  borderRadius="8px" backgroundColor="rgba(0, 0, 0, 0.5)" />)}
      <div className="format_create_competition">
        <div className="competition_format">
          <div className="label_avatar">Hình Thức Thi Đấu</div>
          <div className="competition_format_option">
            {formats?.map((format, i) => (
              <div
                className={
                  formatCompetition.id == format.id
                    ? "format_option active"
                    : "format_option"
                }
                key={i}
              >
                <div
                  onClick={() => selectFormat(format)}
                  className={
                    formatCompetition.id == format.id
                      ? "format_option_view active"
                      : "format_option_view"
                  }
                >
                  <div
                    className={
                      formatCompetition.id == format.id
                        ? "format_option_img active"
                        : "format_option_img"
                    }
                  >
                    {format.image}
                  </div>

                  <div
                    className={
                      formatCompetition.id == format.id
                        ? "format_option_name active"
                        : "format_option_name"
                    }
                  >
                    {format.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="label_avatar">{`Số đội tham gia [${formatCompetition.teamMin}-${formatCompetition.teamMax}]`}</div>
          <input
            type="number"
            className="input_number_team"
            value={teamNumber}
            onChange={handleTeamNumberChange}
          />
        </div>
      </div>
      <div
        className={
          showSetupTable ? `format_create_move active` : `format_create_move`
        }
      >
        <div
          className="competition_format_setup"
          style={{
            maxHeight: isExpanded
              ? `${contentRef.current.scrollHeight}px`
              : "0px",
            transition: "max-height 1s ease",
            border: isExpanded ? `1px dashed #a4c1cf` : `none`,
            padding: isExpanded ? `5px 20px` : `0`,
          }}
          ref={contentRef}
        >
          <div className="label_avatar">Số bảng đấu</div>
          <select className="format_tournament" onChange={handleGroupChange}>
            <option value="">Chọn số bảng</option>
            {groupOptions?.map((group, index) => (
              <option key={index} value={group}>
                {group}
              </option>
            ))}
          </select>
          {groupError && <div className="error_message">{groupError}</div>}
          <div className="label_avatar">Số đội vào vòng trong</div>
          <select className="format_tournament" onChange={handleTeamsNextRoundChange} value={selectedTeamsNextRound}>
            <option value="">Chọn số đội vào vòng trong</option>
            {teamGoIn.map((number, i) => (
              <option key={i} value={number}>
                {number}
              </option>
            ))}
          </select>
          {teamsNextRoundError && <div className="error_message">{teamsNextRoundError}</div>}
          <div className="format_score">
            <div className="format_score_setup">
              <div className="label_avatar">Điểm thắng</div>
              <input
                type="number"
                className="input_number_team"
                onChange={(e) => handlePointsChange("win", e.target.value)}
              />
              {errorWin && <div className="error_message">{errorWin}</div>}
            </div>
            <div className="format_score_setup">
              <div className="label_avatar">Điểm hòa</div>
              <input
                type="number"
                className="input_number_team"
                onChange={(e) => handlePointsChange("draw", e.target.value)}
              />
              {errorDraw && <div className="error_message">{errorDraw}</div>}
            </div>
            <div className="format_score_setup">
              <div className="label_avatar">Điểm thua</div>
              <input
                type="number"
                className="input_score_format"
                onChange={(e) => handlePointsChange("lose", e.target.value)}
              />
              {errorLose && <div className="error_message">{errorLose}</div>}
            </div>
          </div>
        </div>
      </div>
      <div className="format_create_competition">
        <div className="total_match">
          {`Đối với cấu hình này thì số lượng trận đấu của mỗi nội dung là: ${12}`}
          <IoAlertCircle className="icon_total_match" />
        </div>
      </div>
      <div className="format_create_competition">
        <div className="competition_format">
          <div className="label_avatar" style={{ width: "100%" }}>
            Số thí sinh trong 1 đội
          </div>
          <input
            type="number"
            className="input_number_team"
            value={memberNumber}
            onChange={handleMemberNumberChange}
          />
          <div className="competition_format_date">

            {isPublic === "Public" && (
              <div style={{ width: "50%" }}>
              <div className="label_avatar">
                Thời gian đóng đăng kí
              </div>
              <input
                type="date"
                className="input_date_team"
                value={dayRegisNumber}
                onChange={handleDayRegisNumberChange}
              />
            </div>
            )}
            
            <div style={{ width: "50%" }}>
              <div className="label_avatar">
                Thời gian bắt đầu thi đấu
              </div>
              <input
                type="date"
                className="input_date_team"
                value={startTime}
                onChange={handleStartTimeChange}
              />
              {startTimeError && <div className="error_message">{startTimeError}</div>}
            </div>
          </div>

        </div>
      </div>

      <div className="format_create">
        <div className="apply_create_tournament">
          <div className="btn_create_tournament" onClick={() => handleSubmit()}>
            Hoàn Tất
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTournamentFormat;
