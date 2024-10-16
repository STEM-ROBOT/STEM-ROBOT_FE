import React from 'react'
import Sidebar from '../../component/Sidebar/Sidebar'
import './TournamentConfiguration.css'
import ConfigTournament from '../../component/ConfigTournament/ConfigTournament'

const TournamentConfiguration = () => {
    return (
        <div className="tournament-configuration">
            <Sidebar />
            <ConfigTournament />
        </div>
    )
}

export default TournamentConfiguration