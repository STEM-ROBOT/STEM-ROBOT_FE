import React, { useState } from 'react';
import Sidebar from '../../component/Sidebar/Sidebar';
import './TournamentConfiguration.css';
import ConfigTournament from '../../component/ConfigTournament/ConfigTournament';
import ManageTeam from '../../component/ManageTeam/ManageTeam';
import RoleAssignment from '../../component/RoleAssignment/RoleAssignment';
import KnockoutTournament from '../../component/KnockoutTournament/KnockoutTournament';
import GroupStage from '../../component/GroupStage/GroupStage';


const TournamentConfiguration = () => {

    const [activeItem, setActiveItem] = useState("config");


    const renderComponent = () => {
        switch (activeItem) {
            case 'config':
                return <ConfigTournament />;
            case 'status':
                return <></>;
            case 'permissions':
                return <RoleAssignment/>;
            case 'teams':
                return <ManageTeam/>;
            case 'matchups':
                return <GroupStage/>;
            case 'schedule':
                return <></>;
            case 'organizers':
                return <></>;
            case 'sponsors':
                return <></>;
            default:
                return <></>;
        }
    };

    return (
        <div className="tournament-configuration">

            <Sidebar activeItem={activeItem} onMenuClick={setActiveItem} />
            <div className="config-content">
                {renderComponent()}
            </div>
        </div>
    );
};

export default TournamentConfiguration;
