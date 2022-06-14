import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay, faSync } from '@fortawesome/free-solid-svg-icons'

function TimerController({startTimer, resetTimer}) {
  return (
    <div>
        <button id="start_stop" onClick={startTimer}><FontAwesomeIcon  icon={faPlay} size="3x"/> <FontAwesomeIcon  icon={faPause} size="3x"/></button>
        <button id="reset" onClick={resetTimer}><FontAwesomeIcon  icon={faSync} size="3x"/></button>
    </div>
  )
}

export default TimerController