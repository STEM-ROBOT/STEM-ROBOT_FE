import React, { useRef, useState } from "react";
import "./CreateTournamentFormat.css";
import { IoAlertCircle } from "react-icons/io5";
const formats = [
  {
    id: 1,
    name: "Loại trực tiếp",
    image: "https://myleague.vn/content/images/icon_elimination.svg",
    teamMin: "2",
    teamMax: "128",
  },
  {
    id: 2,
    name: "Chia bảng đấu",
    image: "https://myleague.vn/content/images/icon_two_stages.svg",
    teamMin: "6",
    teamMax: "128",
  },
];
const teamGoIn = [2, 4, 8, 16, 32, 64];
const CreateTournamentFormat = () => {
  const [formatCompetition, setFormatCompetition] = useState(formats[0]);
  const [teamNumber, setTeamNumber] = useState(8);
  const [showSetupTable, setShowSetupTable] = useState(false); // State để lưu số đội
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);
  const [groupOptions, setGroupOptions] = useState();
  const handleTeamNumberChange = (e) => {
    const input = e.target.value;

    // Kiểm tra xem input có phải là số không, nếu đúng thì cập nhật state
    if (/^\d*$/.test(input)) {
      setTeamNumber(input);

      const groups = Math.ceil(input / 4); // Ví dụ: mỗi bảng có tối đa 4 đội

      const options = Array.from({ length: groups }, (_, i) => i + 2); // tạo danh sách bảng từ 2 trở lên
      console.log(options);

      setGroupOptions(options);
      // } else {
      //   setGroupOptions([]);
      // }
    }
  };
  const selectFormat = (format) => {
    if (format.id == 2) {
      setIsExpanded(true);
      setShowSetupTable(true);
      const groups = Math.ceil(teamNumber / 4); // Ví dụ: mỗi bảng có tối đa 4 đội

      const options = Array.from({ length: groups }, (_, i) => i + 2); // tạo danh sách bảng từ 2 trở lên
      console.log(options);

      setGroupOptions(options);
    } else {
      setShowSetupTable(false);
      setIsExpanded(false);
    }
    setFormatCompetition(format);
  };

  return (
    <div className="container_create_format_tournament">
      <div className="format_create">
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
                  <img
                    className={
                      formatCompetition.id == format.id
                        ? "format_option_img active"
                        : "format_option_img"
                    }
                    src={format.image}
                    alt={format.name}
                  />
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
          <select className="format_tournament">
            {groupOptions?.map((group, index) => (
              <option key={index} value={group}>
                {group}
              </option>
            ))}
          </select>
          <div className="label_avatar">Số đội vào vòng trong</div>
          <select className="format_tournament">
            {teamGoIn?.map((number, i) => (
              <option key={i} value="Private">
                {number}
              </option>
            ))}
          </select>
          <div className="format_score">
            <div className="format_score_setup">
              <div className="label_avatar">Điểm thắng</div>
              <input type="number" className="input_number_team" />
            </div>
            <div className="format_score_setup">
              <div className="label_avatar">Điểm hòa</div>
              <input type="number" className="input_number_team" />
            </div>
            <div className="format_score_setup">
              <div className="label_avatar">Điểm thua</div>
              <input type="number" className="input_score_format" />
            </div>
          </div>
        </div>
      </div>
      <div className="format_create">
        <div className="total_match">
          {`Đối với cấu hình này thì số lượng trận đấu của mỗi nội dung là: ${12}`}
          <IoAlertCircle className="icon_total_match" />
        </div>
      </div>
    </div>
  );
};

export default CreateTournamentFormat;
