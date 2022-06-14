import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesDown, faAnglesUp } from '@fortawesome/free-solid-svg-icons'

function TimerModifier({decBreak, breakLength, incBreak, decSession, sessionLength, incSession}) {
  return (
    <div>
    <div className="modifier-buttons">
      <div>
        <h4 id="break-label">Break Length</h4>
        <div id="modifier">
          <button id="break-decrement" onClick={decBreak}><FontAwesomeIcon  icon={faAnglesDown} size="2x"/></button>
          <h2 id="break-length">{breakLength}</h2>
          <button id="break-increment" onClick={incBreak}><FontAwesomeIcon  icon={faAnglesUp} size="2x"/></button>
        </div>
      </div>
      <div>
        <h4 id="session-label">Session Length</h4>
        <div id="modifier">
          <button id="session-decrement" onClick={decSession}><FontAwesomeIcon  icon={faAnglesDown} size="2x"/></button>
          <h2 id="session-length">{sessionLength}</h2>
          <button id="session-increment" onClick={incSession}><FontAwesomeIcon  icon={faAnglesUp} size="2x"/></button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default TimerModifier