import "./App.css";
import { useEffect, useRef, useState } from "react";
import TimerController from "./components/TimerController";
import TimerDisplay from "./components/TimerDisplay";
import TimerModifier from "./components/TimerModifier";

function App() {

  const[sessionLength, setSessionLength] = useState(25)
  const[breakLength, setBreakLength] = useState(5)
  const[timeLeft, setTimeLeft] = useState(1500)
  const[timerState, setTimerState] = useState("Session")
  const[isRunning, setIsRunning] = useState(false)
  const[isFirstTime, setIsFirstTime] = useState(true)
  const[timerInterval, setTimerInterval] = useState("")
  const[style, setStyle] = useState({color: ""})

  const audioRef = useRef();

  useEffect(()=>{
    if (timerState === "Break") return;

    setTimeLeft(sessionLength*60)
  },[sessionLength])

  useEffect(()=>{
    if (timerState === "Session") return;

    setTimeLeft(breakLength*60)
  },[breakLength])

  useEffect(()=>{
    


    updateTimer()
  },[timeLeft])

  useEffect(()=>{
    

    setTimeLeft(timerState === "Session" ? sessionLength * 60 : breakLength * 60)
    setStyle({ color: "" })
    if(!isRunning && !isFirstTime){
      startTimer()
    }
  },[timerState])

  const resetTimer = () => {
    clearInterval(timerInterval);
    setSessionLength(25)
    setBreakLength(5)
    setTimeLeft(1500)
    setTimerState("Session")
    setIsRunning(false)
    setIsFirstTime(true)
    setTimerInterval("")
    setStyle({color: ""})

    if (audioRef) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const startTimer = () => {
    setIsRunning(prevVal => !prevVal);  
    if(!isRunning){
      setIsFirstTime(false)
      setTimerInterval(setInterval(()=>{
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1)
      },1000))
      
    }else{
      clearInterval(timerInterval)
    }
  };

  const updateTimer = () => {
    if (timeLeft < 0) {
      clearInterval(timerInterval);
      setIsRunning(false)
      changeTimerMode();
    }

    if (timeLeft < 60) {
      if (style.color === "") {
        setStyle({ color: "red" });
      }

      if (timeLeft <= 0) {
        audioRef.current.play();
      }
    } else {
      setStyle({ color: "" });
    }
  };

  const changeTimerMode = () => {
    setTimerState(timerState === "Break" ? "Session" : "Break")
  };

  const incrementSession = () => {
    if (!isRunning) {
      if (sessionLength !== 60) {

        setSessionLength(prevLength=>prevLength+1)
      }
    }
  }

    const decrementSession = () => {
      if (!isRunning) {
        if (sessionLength !== 1) {

          setSessionLength(prevLength=>prevLength-1)
        }
      }
    };

    const incrementBreak = () => {
      if (!isRunning) {
        if (breakLength !== 60) {

          setBreakLength(prevLength=>prevLength+1)
        }
      }
    };

    const decrementBreak = () => {
      if (!isRunning) {
        if (breakLength !== 1) {

          setBreakLength(prevLength=>prevLength-1)
        }
      }
    };

    return (
      <div id="container">
        <h1 id="title">25 + 5 Clock</h1>
        <TimerModifier
          incSession={incrementSession}
          decSession={decrementSession}
          incBreak={incrementBreak}
          decBreak={decrementBreak}
          sessionLength={sessionLength}
          breakLength={breakLength}
        />
        <TimerDisplay
          timeLeft={timeLeft}
          timerState={timerState}
          timerStyle={style}
        />
        <TimerController startTimer={startTimer} resetTimer={resetTimer} />
        <audio
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          ref={audioRef}
          id="beep"
        />
        <h4><a href='https://github.com/ceo991/pomodoro-clock-with-hooks' style={{color:"aliceblue",textDecoration: "none"}}>You can see the source code here</a></h4>
      </div>
    );
}
export default App;
