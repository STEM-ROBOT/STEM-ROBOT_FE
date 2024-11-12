import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import "./ConfirmPopupReferee.css";
import { BsFillKeyFill, BsShieldFillCheck } from "react-icons/bs";
import { GoPasskeyFill } from "react-icons/go";
import { SiSimplelogin } from "react-icons/si";
import api from "/src/config";
import { useNavigate } from "react-router-dom";

const ConfirmPopupReferee = ({
  match_view,
  setShowPopup,
  email,
  refereeId,
}) => {
  const navigate = useNavigate();
  const [popupActive, setActive] = useState(false);
  const [codeTimeout, setTimeouts] = useState(false);
  const [textView, setTextView] = useState(0);
  const [countInput, setCountInput] = useState(3);
  const [planceholderView, setPlanceholderView] = useState("Mã xác thực");
  const [countdown, setCountdown] = useState();
  const [codeInput, setCodeInput] = useState("");
  const [statusCheck, setStatusCheck] = useState("Hết hạn sau");
  useEffect(() => {
    setActive(true);
  }, []);
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setTimeouts(false);
      setPlanceholderView("Mã xác thực");
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [countdown]);
  const CloseMatchDetail = () => {
    setActive(false);
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 500);
    return () => clearTimeout(timer);
  };
  const SendCode = () => {
    api
      .post(`/api/schedules/schedule-sendmail?scheduleId=${match_view.id}`)
      .then((response) => {
        setTextView(response.data.textView);
        setPlanceholderView(
          `Mã code ${response.data.textView} ký tự đã gửi đến email của bạn!`
        );
        setCountdown(response.data.timeOut);
        setTimeouts(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${statusCheck} ${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}s`;
  };
  const CheckCode = () => {
    api
      .post(
        `/api/schedules/schedule-sendcode?scheduleId=${match_view.id}&code=${codeInput}`
      )
      .then((response) => {
        setCodeInput("");
        setStatusCheck(response.data.message);
        navigate(`/referee-main/main-referee-match/${match_view.id}`);
        console.log(response.data.message.toLowerCase());       
        if (response.data.message.toLowerCase() === "Success ") {
          navigate(`/referee-main/main-referee-match/${match_view.id}`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleCodeInputChange = (e) => {
    if (codeTimeout) {
      if (countInput > 0) {
        setCodeInput(e.target.value);
      } else {
        setActive(false);
        const timer = setTimeout(() => {
          setShowPopup(false);
        }, 500);
        return () => clearTimeout(timer);
      }
      if (e.target.value.length === textView) {
        CheckCode();
        setCountInput(countInput - 1);
      }
    } else {
      setPlanceholderView("Nhấn nhận mã");
    }
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
            <SiSimplelogin className="match_head_confirm_content_icon" />
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
            STEM cần đảm bảo bạn là trọng tài chính được phân công vào trận đấu
            này
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
                  value={codeInput}
                  placeholder={planceholderView}
                  className="confirm_info_key_input"
                  onChange={handleCodeInputChange}
                />
              </div>
              {codeTimeout ? (
                <div className="confirm_info_key_action">
                  {formatTime(countdown)}
                </div>
              ) : (
                <div className="confirm_info_key_action" onClick={SendCode}>
                  Nhận mã
                </div>
              )}
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
