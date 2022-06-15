import "./App.css";
import { useEffect, useRef, useState } from "react";
import TimerController from "./components/TimerController";
import TimerDisplay from "./components/TimerDisplay";
import TimerModifier from "./components/TimerModifier";

function App() {
  // const [timer, setTimer] = useState({
  //   sessionLength: 25,
  //   breakLength: 5,
  //   timeLeft: 1500,
  //   timerState: "Session",
  //   isRunning: false,
  //   interval: "",
  //   style: {
  //     color: "",
  //   },
  // });

  const[sessionLength, setSessionLength] = useState(25)
  const[breakLength, setBreakLength] = useState(5)
  const[timeLeft, setTimeLeft] = useState(1500)
  const[timerState, setTimerState] = useState("Session")
  const[isRunning, setIsRunning] = useState(false)
  const[timerInterval, setTimerInterval] = useState("")
  const[style, setStyle] = useState({color: ""})

  const audioRef = useRef();

  useEffect(()=>{
    if (timerState === "Break") return;
    // setTimer((prevTimer)=>({...prevTimer, timeLeft: prevTimer.sessionLength * 60 }));
    setTimeLeft(sessionLength*60)
  },[sessionLength])

  useEffect(()=>{
    if (timerState === "Session") return;
    // setTimer((prevTimer)=>({...prevTimer, timeLeft: prevTimer.breakLength * 60 }));
    setTimeLeft(breakLength*60)
  },[breakLength])

  useEffect(()=>{
    
    // setTimer((prevTimer)=>({...prevTimer, timeLeft: prevTimer.breakLength * 60 }));

    updateTimer()
  },[timeLeft])

  useEffect(()=>{
    
    // setTimer((prevTimer)=>({...prevTimer, timeLeft: prevTimer.breakLength * 60 }));
    // if(timerState ==="Session") return
    // startTimer()
    setTimeLeft(timerState === "Session" ? sessionLength * 60 : breakLength * 60)
    setStyle({ color: "" })
    if(!isRunning){
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
      setTimerInterval(setInterval(()=>{
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1)
      },1000))
      
    }else{
      clearInterval(timerInterval)
    }
  };

  const updateTimer = () => {
    if (timeLeft < 58) {
      clearInterval(timerInterval);
      setIsRunning(false)
      changeTimerMode();
    }

    if (timeLeft < 60) {
      if (style.color === "") {
        setStyle({ color: "red" });
      }

      if (timeLeft <= 58) {
        audioRef.current.play();
      }
    } else {
      setStyle({ color: "" });
    }
  };

  const changeTimerMode = () => {
    // setTimer(
    //   {
    //     ...timer,
    //     timerState: timer.timerState === "Break" ? "Session" : "Break",
    //     timeLeft:
    //       timer.timerState === "Break"
    //         ? timer.sessionLength * 60
    //         : timer.breakLength * 60,
    //     isRunning: false,
    //     style: { color: "" },
    //   } 
    // );
    setTimerState(timerState === "Break" ? "Session" : "Break")

    // setIsRunning(true)
    
    
  };

  const incrementSession = () => {
    if (!isRunning) {
      if (sessionLength !== 60) {
        // setTimer((prevTimer)=>({...prevTimer, sessionLength: prevTimer.sessionLength + 1 }));
        setSessionLength(prevLength=>prevLength+1)
      }
    }
  }

    const decrementSession = () => {
      if (!isRunning) {
        if (sessionLength !== 1) {
          // setTimer((prevTimer)=>({  ...prevTimer, sessionLength: prevTimer.sessionLength - 1 }));
          setSessionLength(prevLength=>prevLength-1)
        }
      }
    };

    const incrementBreak = () => {
      if (!isRunning) {
        if (breakLength !== 60) {
          // setTimer((prevTimer)=>({ ...prevTimer, breakLength: prevTimer.breakLength + 1 }));
          setBreakLength(prevLength=>prevLength+1)
        }
      }
    };

    const decrementBreak = () => {
      if (!isRunning) {
        if (breakLength !== 1) {
          // setTimer((prevTimer)=>({...prevTimer, breakLength: prevTimer.breakLength - 1 }));
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
      </div>
    );
}
export default App;
