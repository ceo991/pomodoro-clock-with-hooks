import React from 'react'

function TimerDisplay({timerStyle, timerState, timeLeft}) {
  return (
    <div className="timer" style={timerStyle}>
        <h2 id="timer-label">{timerState}</h2>
        <h1 id="time-left">{`${(Math.floor(timeLeft/60)===0||Math.floor(timeLeft/60)<10)?"0"+Math.floor(timeLeft/60):Math.floor(timeLeft/60)}:${(Math.floor(timeLeft%60)===0||Math.floor(timeLeft%60)<10) ? "0"+Math.floor(timeLeft%60):Math.floor(timeLeft%60)}`}</h1>  
    </div>
  )
}

export default TimerDisplay