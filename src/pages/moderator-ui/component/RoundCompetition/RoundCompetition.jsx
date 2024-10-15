import React, { useState } from "react";
import "./RoundCompetition.css";
import { FaRobot } from "react-icons/fa";
import { AiOutlineDeliveredProcedure } from "react-icons/ai";
import { TiWarning } from "react-icons/ti";
import { GrScorecard } from "react-icons/gr";
import { RiTeamFill } from "react-icons/ri";
import MatchRoundComponent from "../MatchRoundComponent/MatchRoundComponent";

// Create Document Component

const RoundCompetition = () => {
  return (
    <div className="game_round_container">
      <MatchRoundComponent />
    </div>
  );
};
export default RoundCompetition;
