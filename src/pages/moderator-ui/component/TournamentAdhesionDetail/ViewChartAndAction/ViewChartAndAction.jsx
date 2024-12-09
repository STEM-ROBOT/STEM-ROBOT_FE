import React, { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import "./ViewChartAndAction.css";
import { BsFillKeyFill, BsShieldFillCheck } from "react-icons/bs";
import { GoPasskeyFill } from "react-icons/go";
import { SiSimplelogin } from "react-icons/si";
import api from "/src/config";
import connectHub from "/src/config/connectHub";
import { useParams } from "react-router-dom";
import ViewMatchDetailTeamAdhesion from "../ViewMatchDetailTeamAdhesion/ViewMatchDetailTeamAdhesion";
import ChartPerformance from "../ChartPerformance/ChartPerformance";
const ViewChartAndAction = ({ matchData, setShowPopup }) => {
  const { teamId } = useParams();
  const storedImage = sessionStorage.getItem("ImageCompetition");
  const [popupActive, setActive] = useState(false);
  const [loadApiConnectClient, setLoadApiConnectClient] = useState(true);
  const [scoreTeamDetailApi, setScoreTeamDetailApi] = useState([]);
  const previousDataRef = useRef(null);
  const hubConnectionRef = useRef(null);
  const [timeCountDown, setTimeCountDown] = useState(null);

  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  useEffect(() => {
    setActive(true);
  }, []);
  useEffect(() => {
    const handleData = (data) => {
      console.log(data);
      const dataString = JSON.stringify(data);
      const previousDataString = JSON.stringify(previousDataRef.current);

      if (dataString !== previousDataString) {
        console.log(data);
        setScoreTeamDetailApi(data);
        previousDataRef.current = data;
      }
    };
    const connectHubClient = () => {
      setLoadApiConnectClient(false);
      connectHub({
        client: `team-adhesion-actions/${teamId}`,
        onDataReceived: handleData,
      }).then((hubConnection) => {
        hubConnectionRef.current = hubConnection;
      });
    };
    const connectClient = () => {
      setLoadApiConnectClient(false);
      //connectClient MatchDetail
      api
        .get(
          `/api/matches/match-action-team?matchId=${matchData.matchId}&teamId=${teamId}`
        )
        .then((response) => {
          console.log(response.data);
          if (response.data === "timeout") {
            setLoadApiConnectClient(true);
            if (hubConnectionRef.current) {
              hubConnectionRef.current.stop();
              hubConnectionRef.current = null;
            }
          } else if (response.data !== "notstarted") {
            console.log(response.data);
            setScoreTeamDetailApi(response.data);
            previousDataRef.current = response.data;
          } else if (response.data === "notstarted") {
            setNoPlayMatch(true);
            if (hubConnectionRef.current) {
              hubConnectionRef.current.stop();
              hubConnectionRef.current = null;
            }
          } else {
            setTimeCountDown(response.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    if (loadApiConnectClient) {
      connectHubClient();
      connectClient();
    }

    return () => {
      if (hubConnectionRef.current) {
        hubConnectionRef.current.stop();
      }
    };
  }, [loadApiConnectClient]);
  useEffect(() => {
    if (timeCountDown != null) {
      if (hubConnectionRef.current) {
        hubConnectionRef.current.stop();
      }
      const calculateTimeLeft = () => {
        // Parse the target timeInMatch
        const [hours, minutes, seconds] = timeCountDown.timeInMatch
          .split(":")
          .map(Number);
        const targetTime = new Date();
        targetTime.setHours(hours, minutes, seconds);

        // Calculate the difference between target time and current time
        const now = new Date();
        const difference = targetTime - now;

        if (difference > 0) {
          // Convert remaining time to hours, minutes, and seconds
          setTimeLeft({
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          });
        } else {
          setTimeCountDown(null);
          setLoadApiConnectClient(true);
          setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        }
      };

      // Update every second
      const timer = setInterval(calculateTimeLeft, 1000);

      // Cleanup the interval on component unmount
      return () => clearInterval(timer);
    }
  }, [timeCountDown]);

  const CloseMatchDetail = () => {
    setActive(false);
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 500);
    return () => clearTimeout(timer);
  };
  return (
    <div
      style={{ backgroundImage: `url(${storedImage})` }}
      className={
        popupActive
          ? "match_detail_container_popup active"
          : "match_detail_container_popup"
      }
    >
      <div className="match_detail_container team">
        <div className="match_head_detail">
          <div className="match_head_content" style={{ color: `#FFF` }}>
            Thông Số Của Đội
          </div>
          <div className="match_head_close">
            <IoClose
              style={{ color: `red` }}
              className="close_head_close"
              onClick={() => CloseMatchDetail()}
            />
          </div>
        </div>
        <div className="chart_view_score">
          <ViewMatchDetailTeamAdhesion
            halfAction={scoreTeamDetailApi}
            view={"left"}
          />
          <ChartPerformance />
        </div>
      </div>
    </div>
  );
};

export default ViewChartAndAction;
