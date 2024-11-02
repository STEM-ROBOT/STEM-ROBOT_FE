import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import "./ConfirmPopupReferee.css";
import { BsFillKeyFill, BsShieldFillCheck } from "react-icons/bs";
import { GoPasskeyFill } from "react-icons/go";
const ConfirmPopupReferee = ({
  match_view,
  setShowPopup,
  email,
  refereeId,
}) => {
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
      <div className="match_confirm_container">
        <div className="match_head_confirm">
          <div className="match_head_confirm_content">
            <BsShieldFillCheck className="match_head_confirm_content_icon" />
            Xác thực quyền truy cập
          </div>
          <div
            className="match_head_confirm_close"
            onClick={() => CloseMatchDetail()}
          >
            <IoClose className="close_head_confirm_close" />
          </div>
        </div>
        <div className="match_body_confirm">
          <div className="match_body_confirm_content">
            Hãy chắc chắn rằng đó là bạn
          </div>
          <div className="match_body_confirm_text">
            STEM cần đảm bảo bạn là trọng tài chính được phân công vào trận đấu này
          </div>
          <div className="match_body_confirm_key_content">
            <div className="match_body_confirm_key_icon">
              <BsFillKeyFill className="confirm_key_icon" />
            </div>
            <div className="match_body_confirm_info">
              <div className="confirm_info_key">Khóa xác thực</div>
              <div className="confirm_info_email">{email}</div>
            </div>
          </div>
          <div className="match_body_confirm_key_content">
            <div className="match_body_confirm_key_icon2">
              <div className="confirm_key_icon"></div>
            </div>
            <div className="match_body_confirm_info">
              <div className="confirm_info_key">Mã</div>
              <div className="confirm_info_key_input_layout">
                <input
                  type="text"
                  placeholder="Mã"
                  className="confirm_info_key_input"
                />
              </div>
              <div className="confirm_info_key_action">Nhận mã</div>
            </div>
          </div>
          <div className="match_body_confirm_key_action">
            <div
              className="btn_cancel_confirm_key"
              onClick={() => CloseMatchDetail()}
            >
              Hủy
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopupReferee;
