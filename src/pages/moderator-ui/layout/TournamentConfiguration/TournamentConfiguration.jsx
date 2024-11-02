import React, { useState } from 'react';
import Sidebar from '../../component/Sidebar/Sidebar';
import './TournamentConfiguration.css';
import ConfigTournament from '../../component/ConfigTournament/ConfigTournament';
import ManageTeam from '../../component/ManageTeam/ManageTeam';
import RoleAssignment from '../../component/RoleAssignment/RoleAssignment';
import KnockoutTournament from '../../component/KnockoutTournament/KnockoutTournament';
import GroupAllocation from '../../component/GroupAllocation/GroupAllocation';
import GroupMatchDraw from '../../component/GroupMatchDraw/GroupMatch';
import GroupMatch from '../../component/GroupMatchDraw/GroupMatch';
import MatchManagement from '../../component/MatchManagement/MatchManagement';
import RefereeAssignment from '../../component/RefereeAssignment/RefereeAssignment';
import ManageArena from '../../component/ManageArena/ManageArena';

const TournamentConfiguration = () => {
  const [tournamentFormat, setTournamentFormat] = useState("vòng bảng");
  const [activeItem, setActiveItem] = useState("config");


  const isGroupStage = tournamentFormat === "vòng bảng";

  const data = {
    teams: [
      { teamId: 1, name: "Đội 1" },
      { teamId: 2, name: "Đội 2" },
      { teamId: 3, name: "Đội 3" },
      { teamId: 4, name: "Đội 4" },
      { teamId: 5, name: "Đội 5" },
      { teamId: 6, name: "Đội 6" },
      { teamId: 7, name: "Đội 7" },
      { teamId: 8, name: "Đội 8" },
      { teamId: 9, name: "Đội 9" },
      { teamId: 10, name: "Đội 10" },
      { teamId: 11, name: "Đội 11" },
      { teamId: 12, name: "Đội 12" },
      { teamId: 13, name: "Đội 13" },
    ],
    rounds: [
      {
        roundId: 1,
        roundName: "1/8",
        matches: [
          {
            matchId: 1,
            teamsmatch: [
              { teamMatchId: 1, teamId: "", teamName: "" },
              { teamMatchId: 2, teamId: "", teamName: "" },
            ],
          },
          {
            matchId: 2,
            teamsmatch: [
              { teamMatchId: 3, teamId: "", teamName: "" },
              { teamMatchId: 4, teamId: "", teamName: "" },
            ],
          },
          {
            matchId: 3,
            teamsmatch: [
              { teamMatchId: 5, teamId: "", teamName: "" },
              { teamMatchId: 6, teamId: "", teamName: "" },
            ],
          },
          {
            matchId: 4,
            teamsmatch: [
              { teamMatchId: 7, teamId: "", teamName: "" },
              { teamMatchId: 8, teamId: "", teamName: "" },
            ],
          },
          {
            matchId: 5,
            teamsmatch: [
              { teamMatchId: 9, teamId: "", teamName: "" },
              { teamMatchId: 10, teamId: "", teamName: "" },
            ],
          },
        ],
      },
      {
        roundId: 2,
        roundName: "Tứ kết",
        matches: [
          {
            matchId: 6,
            teamsmatch: [
              { teamMatchId: 11, teamId: "", teamName: "" },
              { teamMatchId: 12, teamId: "", teamName: "W#1" },
            ],
          },
          {
            matchId: 7,
            teamsmatch: [
              { teamMatchId: 13, teamId: "", teamName: "" },
              { teamMatchId: 14, teamId: "", teamName: "W#2" },
            ],
          },
          {
            matchId: 8,
            teamsmatch: [
              { teamMatchId: 15, teamId: "", teamName: "" },
              { teamMatchId: 16, teamId: "", teamName: "W#3" },
            ],
          },
          {
            matchId: 9,
            teamsmatch: [
              { teamMatchId: 7, teamId: "", teamName: "W#5" },
              { teamMatchId: 8, teamId: "", teamName: "W#4" },
            ],
          },
        ],
      },
      {
        roundId: 3,
        roundName: "Bán kết",
        matches: [
          {
            matchId: 11,
            teamsmatch: [
              { teamMatchId: 9, teamId: "", teamName: "W#6" },
              { teamMatchId: 10, teamId: "", teamName: "W#7" },
            ],
          },
          {
            matchId: 12,
            teamsmatch: [
              { teamMatchId: 11, teamId: "", teamName: "W#8" },
              { teamMatchId: 12, teamId: "", teamName: "W#9" },
            ],
          },
        ],
      },
      {
        roundId: 4,
        roundName: "Chung kết",
        matches: [
          {
            matchId: 7,
            teamsmatch: [
              { teamMatchId: 13, teamId: "", teamName: "W#11" },
              { teamMatchId: 14, teamId: "", teamName: "W#12" },
            ],
          },
        ],
      },
    ],
    status: false,
  };
  




  const renderComponent = () => {
    switch (activeItem) {
      case 'config':
        return <ConfigTournament />;
      case 'status':
        return <></>;
      case 'permissions':
        return <RoleAssignment />;
      case 'teams':
        return <ManageTeam />;
      case 'matchups':
        return isGroupStage ? <GroupMatch /> : <KnockoutTournament tournamentData={data} />;
      case 'schedule':
        return <MatchManagement />;
      case 'referee':
        return <RefereeAssignment />;
      case 'organizers':
        return <></>;
      case 'sponsors':
        return <></>;
      case 'groupstage':
        return isGroupStage ? <GroupAllocation /> : null;
      case 'arena':
        return <ManageArena />;
      default:
        return <></>;
    }
  };
  return (
    <div className="tournament-configuration">
      <Sidebar activeItem={activeItem} onMenuClick={setActiveItem} isGroupStage={isGroupStage} />
      <div className="config-content">
        {renderComponent()}
      </div>
    </div>
  );
};

export default TournamentConfiguration;
