import React, { useEffect, useState } from "react";
import "./Countdown.css";

const Countdown = ({ endDate }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(endDate) - new Date();
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

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <div className="countdown_container">
      <h2>
        Giải cho phép đăng ký trực tuyến đến hết ngày{" "}
        <span>{new Date(endDate).toLocaleDateString()}</span>
      </h2>
      <p>
        Giải đấu yêu cầu số lượng thành viên mỗi đội ít nhất là 7, nhiều nhất là
        25.
      </p>
      <div className="countdown_timer">
        <div className="time_block">
          <div className="time_value">{timeLeft.days || 0}</div>
          <div className="time_label">Ngày</div>
        </div>
        <div className="time_block">
          <div className="time_value">{timeLeft.hours || 0}</div>
          <div className="time_label">Giờ</div>
        </div>
        <div className="time_block">
          <div className="time_value">{timeLeft.minutes || 0}</div>
          <div className="time_label">Phút</div>
        </div>
        <div className="time_block">
          <div className="time_value">{timeLeft.seconds || 0}</div>
          <div className="time_label">Giây</div>
        </div>
      </div>
      <button className="register_button">Bắt đầu đăng ký</button>
    </div>
  );
};

export default Countdown;
