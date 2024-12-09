import React from 'react'
import './Parameter.css'

const data = [
    { teamId: 1, team: "Đội #2", scoreBonusAverage: 10, scoreMinusAverage: 20, randomDraw: 2 },
    { teamId: 2, team: "Đội #3", scoreBonusAverage: 10, scoreMinusAverage: 20, randomDraw: 1 },

]

const Parameter = () => {
    return (
        <div className="view_data_match_container">

            <div className="match_score_team_detail">
                <div className='parameter-container'>
                    {data.map((item, index) => (
                        <div className="parameter-item" key={item.teamId}>
                            <div className="parameter-team-name">{item.team}</div>
                            <div className="parameter-stats">
                                <div className="parameter-stat">
                                    <span className="parameter-label">Điểm cộng trung bình:</span>
                                    <span className="parameter-value positive">+{item.scoreBonusAverage}</span>
                                </div>
                                <div className="parameter-stat">
                                    <span className="parameter-label">Điểm trừ trung bình:</span>
                                    <span className="parameter-value negative">-{item.scoreMinusAverage}</span>
                                </div>
                                <div className="parameter-stat">
                                    <span className="parameter-label">Lần bốc thăm:</span>
                                    <span className="parameter-value neutral">{item.randomDraw}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Parameter