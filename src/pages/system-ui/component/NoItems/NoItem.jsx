import React from 'react'
import logo from '../../../../assets/images/no-items.png'
import './NoItem.css'

const NoItem = ({message}) => {
  return (
    <div className="no-tournaments">
    <img src={logo} alt="No tournaments" className="no-tournament-image" />
    <h2>{message}</h2>
  </div>
  )
}

export default NoItem