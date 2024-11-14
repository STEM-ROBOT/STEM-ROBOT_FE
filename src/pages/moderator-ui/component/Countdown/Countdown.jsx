import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./Countdown.css";
import Introduction from "../Introduction/Introduction";
import RegisterTeam from "../RegisterTeam/RegisterTeam";
import api from "../../../../config";
import { api_register_time_check } from "../../api/ApiFlowView/ApiFlowView";
const introduction = `🏆 Lâu lâu không tạo giải cho anh em, anh em hỏi nhiều quá...`;

const Countdown = () => {
  const navigate = useNavigate();
  const pram = useParams();
  const [registerConfigApi, setRegisterConfigApi] = useState();
  const [textBtn, setTextBtn] = useState("Bắt đầu đăng ký");
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
      return timeLeft;
    }
    return null;
  };

  const [showRegisterTeam, setRegisterTeam] = useState(false);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    api
      .get(`${api_register_time_check + pram.competitionId}`)
      .then((response) => {
        const status = response.data?.status;
        if (status.toString().toLowerCase() === "private") {
          navigate(`/404error`);
        }
        console.log(response.data);
        setRegisterConfigApi(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      const timeDown = calculateTimeLeft();
      if (timeDown !== null) {
        setTimeLeft(timeDown);
      } else {
        setTextBtn("Đã hết hạn đăng ký");
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [registerConfigApi]);

  return (
    <div className="countdown_page">
      {showRegisterTeam ? (
        <RegisterTeam setRegisterTeam={setRegisterTeam} />
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
              {textBtn}
            </button>
          </div>
          <Introduction introduction={introduction} />
        </>
      )}
    </div>
  );
};

export default Countdown;
