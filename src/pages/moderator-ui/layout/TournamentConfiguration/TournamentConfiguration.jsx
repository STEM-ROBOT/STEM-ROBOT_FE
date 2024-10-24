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
    const [tournamentFormat, setTournamentFormat] = useState("vòng bảng");
    const [activeItem, setActiveItem] = useState("config");


    const isGroupStage = tournamentFormat === "vòng bảng";

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
                return isGroupStage ? <GroupMatch /> : <KnockoutTournament />;
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
