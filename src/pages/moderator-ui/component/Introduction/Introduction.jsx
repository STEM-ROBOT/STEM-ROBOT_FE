import React, { useRef, useState } from "react";
import "./Introduction.css";

const Introduction = ({ introduction }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };
  return (
    <div className="introduction_container">
      <div className="introduction_header">
        <i className="icon">📄</i>
        <span className="header_text">Giới thiệu về giải đấu</span>
      </div>
      <div
        className="introduction_content"
        style={{
          maxHeight: isExpanded
            ? `${contentRef.current.scrollHeight}px`
            : "120px",
          transition: "max-height 1s ease",
        }}
        ref={contentRef}
      >
        <p>{introduction}</p>
      </div>
      <button className="toggle_button" onClick={toggleExpand}>
        {isExpanded ? "Thu gọn" : "Xem thêm"}
      </button>
    </div>
  );
};

export default Introduction;
