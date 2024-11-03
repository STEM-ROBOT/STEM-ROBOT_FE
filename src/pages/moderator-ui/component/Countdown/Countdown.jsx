import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./Countdown.css";
import Introduction from "../Introduction/Introduction";
import RegisterTeam from "../RegisterTeam/RegisterTeam";
import api from "../../../../config";
import { api_register_time_check } from "../../api/ApiFlowView/ApiFlowView";
const introduction = `🏆 Lâu lâu không tạo giải cho anh em, anh em hỏi nhiều quá. Tiện đây chào mừng 70 năm giải phóng thủ đô, Rùa Billiards xin tổ chức 1 giải nho nhỏ cho các em học sinh nhé. 🎓
  Lịch thi đấu sẽ vào ngày 11-12 tức thứ 6 tuần tới.
  Đối tượng tham gia toàn bộ học sinh đang học tại trường THPT Nam Phù Cừ.
  - Giải sẽ bắn 8 bóng bida đánh sọc trơn. Game 2 mạng.
  - Đặc Biệt 🆘 ❗ không phải đóng phí tham gia ❤️.
  Chỉ 🏆 60k cho 1 trận đấu không tính thời gian.
  +1 🥇 Giải nhất sẽ gồm 1 cờ, 1 cúp, 1 áo kỉ niệm và 1 thẻ khuyến mại 2 tháng gậy thuê + 1 thẻ 1 đồ uống bất kì khi chơi từ 3h trở lên.
  +1 🥈 Giải nhì 1 cờ + 1 thẻ khuyến mại 2 tháng gậy thuê.
  +2 giải ba 1 cờ + 1 thẻ khuyến mại 2 tháng gậy thuê.
  Đặc Biệt tặng tất cả thành viên tham gia thi đấu mỗi một người 1 thẻ giờ chơi chỉ 29k/1h.
  Thời gian đăng kí bắt đầu từ ngày hôm nay đến hết ngày 10-10.
  Về game 2 mạng thì anh em có thể đọc ở bài viết sau.
  Rùa Billiards xin cảm ơn!
  Mọi chi tiết xin liên hệ qua sdt 0387598791 (Mạnh Quân) hoặc nhắn tin trực tiếp qua Facebook Quân Mạnh.`;

const Countdown = () => {
  const navigate = useNavigate();
  const pram = useParams();
  const calculateTimeLeft = () => {
    const difference = new Date(registerConfigApi?.registerTime) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [registerConfigApi, setRegisterConfigApi] = useState();
  const [showRegisterTeam, setRegisterTeam] = useState(false);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    api
      .get(`${api_register_time_check + pram.competitionId}`)
      .then((response) => {
        if (response.data?.status == "") {
          navigate(`/404error`);
        }
        setRegisterConfigApi(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [registerConfigApi]);

  return (
    <div className="countdown_page">
      {showRegisterTeam ? (
        <RegisterTeam />
      ) : (
        <>
          <div className="countdown_container">
            <div className="countdown_title">
              Nội dung thi đấu này cho phép đăng ký trực tuyến đến hết ngày
              <span className="highlight">
                {new Date(registerConfigApi?.registerTime).toLocaleDateString()}
              </span>
            </div>
            <div className="countdown_timer">
              <div className="time_block">
                <div className="time_value">{timeLeft?.days || 0}</div>
                <div className="time_label">Ngày</div>
              </div>
              <div className="time_block">
                <div className="time_value">{timeLeft?.hours || 0}</div>
                <div className="time_label">Giờ</div>
              </div>
              <div className="time_block">
                <div className="time_value">{timeLeft?.minutes || 0}</div>
                <div className="time_label">Phút</div>
              </div>
              <div className="time_block">
                <div className="time_value">{timeLeft?.seconds || 0}</div>
                <div className="time_label">Giây</div>
              </div>
            </div>
            <button
              className="register_button"
              onClick={() => setRegisterTeam(true)}
            >
              Bắt đầu đăng ký
            </button>
          </div>
          <Introduction introduction={introduction} />
        </>
      )}
    </div>
  );
};

export default Countdown;
