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

const TournamentConfiguration = () => {
    const [tournamentFormat, setTournamentFormat] = useState("knoutourt");
    const [activeItem, setActiveItem] = useState("config");


    const isGroupStage = tournamentFormat === "vòng bảng";

    const data = {
        teams: [
            { id: 1, name: "Đội 1" }, { id: 2, name: "Đội 2" }, { id: 3, name: "Đội 3" },
            { id: 4, name: "Đội 4" }, { id: 5, name: "Đội 5" }, { id: 6, name: "Đội 6" },
            { id: 7, name: "Đội 7" }, { id: 8, name: "Đội 8" }, { id: 9, name: "Đội 9" },
            { id: 10, name: "Đội 10" }, { id: 11, name: "Đội 11" }, { id: 12, name: "Đội 12" },
            { id: 13, name: "Đội 13" }
          ],
          rounds: {
            "1/8": {
              teams_bye: [{ id: 11, name: "Đội 11" }, { id: 12, name: "Đội 12" }, { id: 13, name: "Đội 13" }],
              matches: [
                { id: 1, team1Id: 1, team2Id: 2 },
                { id: 2, team1Id: 3, team2Id: 4 },
                { id: 3, team1Id: 5, team2Id: 6 },
                { id: 4, team1Id: 7, team2Id: 8 },
                { id: 5, team1Id: 9, team2Id: 10 }
              ]
            },
            "tứ kết": {
              matches: [
                { id: 6, team1Id: 11, team2Id: "w#1" },
                { id: 7, team1Id: 12, team2Id: "w#2" },
                { id: 8, team1Id: 13, team2Id: "w#3" },
                { id: 9, team1Id: "w#4", team2Id: "w#5" }
              ]
            },
            "bán kết": {
              matches: [
                { id: 10, team1Id: "w#6", team2Id: "w#7" },
                { id: 11, team1Id: "w#8", team2Id: "w#9" }
              ]
            },
            "chung kết": {
              matches: [
                { id: 12, team1Id: "w#10", team2Id: "w#11" }
              ]
            },
          },
        status: false
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
