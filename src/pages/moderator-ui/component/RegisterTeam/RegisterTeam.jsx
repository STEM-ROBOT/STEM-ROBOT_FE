import React, { useState } from "react";
import "./RegisterTeam.css";
import { IoAlertCircleSharp, IoDisc } from "react-icons/io5";
import logo from "/src/assets/images/logo.png";

import { useNavigate, useParams } from "react-router-dom";

import LoadingComponent from "../../../system-ui/component/Loading/LoadingComponent";
import RegisterTeamStepOne from "./RegisterTeamStepOne";
import RegisterTeamStepTwo from "./RegisterTeamStepTwo";

const RegisterTeam = ({ setRegisterTeam }) => {
  const navigate = useNavigate();
  const path = useParams();
  const [stepLine, setStepLine] = useState(false);
  const [loading, setLoading] = useState(false);
  const [teamInfo, setTeamInfo] = useState(null);
  const [listContestant, setListContestant] = useState([]);

  return (
    <div className="register_team_container">
      <div className="register_step_container">
        <div className="register_step">
          <div className="step_regis_number">Bước 1</div>
          <div className="step_regis_progress">
            <div className="step_regis_view">
              <IoDisc className="progress_icon_step" />
              <div
                className={stepLine ? "progress_step active" : "progress_step "}
              />
            </div>
          </div>
          <div className="step_regis_number">TẠO ĐỘI </div>
        </div>
        <div className="register_step">
          <div className="step_regis_number">Bước 2</div>
          <div className="step_regis_progress">
            <div className="step_regis_view">
              <div
                className={
                  stepLine
                    ? "progress_step_right active"
                    : "progress_step_right "
                }
              />

              <IoDisc
                className={
                  stepLine
                    ? "progress_icon_step_2 active"
                    : "progress_icon_step_2"
                }
              />
            </div>
          </div>
          <div className="step_regis_number">CHỌN THÀNH VIÊN CHO ĐỘI</div>
        </div>
      </div>
      {stepLine ? (
        <RegisterTeamStepTwo
          setRegisterTeam={setRegisterTeam}
          teamInfo={teamInfo}
        />
      ) : (
        <>
          {loading ? (
            <LoadingComponent
              position={""}
              borderRadius={"7px"}
              backgroundColor={"#0285ffb9"}
            />
          ) : (
            <RegisterTeamStepOne
              setStepLine={setStepLine}
              setLoading={setLoading}
              setTeamInfo={setTeamInfo}
            />
          )}
        </>
      )}
    </div>
  );
};

export default RegisterTeam;
