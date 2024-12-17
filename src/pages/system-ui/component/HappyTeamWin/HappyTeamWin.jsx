import React, { useEffect, useRef } from "react";
import "./HappyTeamWin.css";
import { Fireworks } from "fireworks-js";

const HappyTeamWin = ({ data,onClose }) => {
  const fireworksContainerRef = useRef(null);

  useEffect(() => {
    // Tạo hiệu ứng pháo hoa khi component được mount
    const container = fireworksContainerRef.current;

    const fireworks = new Fireworks(container, {
      target: container, // Đảm bảo chỉ gắn vào đúng container
      speed: 3,
      acceleration: 1.05,
      friction: 0.98,
      particles: 150, // Số lượng hạt pháo hoa
      explosion: 8, // Kích thước vụ nổ
      trace: 3, // Độ dài vệt sáng
      sound: {
        enabled: true,
        files: ["https://fireworks.js.org/sounds/explosion0.mp3"],
      },
    });

    fireworks.start();

    // Dọn dẹp khi component bị unmount
    return () => {
      fireworks.stop();
    };
  }, []);

  return (
    <div className="congratulation-container" ref={fireworksContainerRef}>
      <button
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "red",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          padding: "5px 10px",
          zIndex: 15,
          cursor: "pointer",
        }}
        onClick={onClose}
      >
        Đóng
      </button>
      <div className="congratulation-message">
        <h1>Chúc mừng nhà đương kim vô địch của nội dung thi đấu!</h1>
        <div className="winner-info">
          <img
            src={data?.img}
            alt="Winner"
            className="winner-image"
          />
          <h2 className="winner-name">{data?.name}</h2>
        </div>
      </div>   
    </div>
  );
};

export default HappyTeamWin;
