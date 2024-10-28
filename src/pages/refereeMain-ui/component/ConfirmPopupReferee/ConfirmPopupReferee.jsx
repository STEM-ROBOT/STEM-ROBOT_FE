import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

const ConfirmPopupReferee = ({ match_view, setShowPopup }) => {
  const [popupActive, setActive] = useState(false);
  useEffect(() => {
    setActive(true);
  }, []);
  const CloseMatchDetail = () => {
    setActive(false);
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 500);
    return () => clearTimeout(timer);
  };
  return (
    <div
      className={
        popupActive
          ? "match_detail_container_popup active"
          : "match_detail_container_popup"
      }
    >
      <div className="match_detail_container">
        <div className="match_head_detail">
          <div className="match_head_content">Xác thực quyền truy cập</div>
          <div className="match_head_close">
            <IoClose
              className="close_head_close"
              onClick={() => CloseMatchDetail()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopupReferee;
