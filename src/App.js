import { useEffect, useRef, useState } from "react";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import "./App.css";
import TimerController from "./components/TimerController";
import TimerDisplay from "./components/TimerDisplay";
import TimerModifier from "./components/TimerModifier";

function App() {
  const [timer, setTimer] = useState({
    sessionLength: 25,
    breakLength: 5,
    timeLeft: 1500,
    timerState: "Session",
    isRunning: false,
    interval: "",
    style: {
      color: "",
    },
  });

  const audioRef = useRef();

  // useEffect(()=>{
  //   console.log(timer)
  //   console.log(audioRef)
  // },[timer])

  const resetTimer = () => {
    clearInterval(timer.interval);
    setTimer({
      sessionLength: 25,
      breakLength: 5,
      timeLeft: 1500,
      timerState: "Session",
      isRunning: false,
      interval: "",
      style: {
        color: "",
      },
    });
    if (audioRef) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const startTimer = () => {
    setTimer((prevTimer) => ({
      ...prevTimer,
      isRunning: !prevTimer.isRunning,
    }));
    if (!timer.isRunning) {
      setTimer({
        ...timer,
        interval: setInterval(() => {
          setTimer((prevTimer) => ({
            ...prevTimer,
            timeLeft: prevTimer.timeLeft - 1,
          }));
          updateTimer();
        }, 1000)
      });
    } else {
      clearInterval(timer.interval);
    }
  };

  const updateTimer = () => {
    if (timer.timeLeft < 0) {
      clearInterval(timer.interval);
      setTimer({...timer, isRunning: false });
      changeTimerMode();
    }

    if (timer.timeLeft < 61) {
      if (timer.style.color === "") {
        setTimer({...timer ,style: { color: "red" } });
      }

      if (timer.timeLeft <= 0) {
        audioRef.current.play();
      }
    } else {
      setTimer({...timer, style: { color: "" } });
    }
  };

  const changeTimerMode = () => {
    setTimer(
      {
        ...timer,
        timerState: timer.timerState === "Break" ? "Session" : "Break",
        timeLeft:
          timer.timerState === "Break"
            ? timer.sessionLength * 60
            : timer.breakLength * 60,
        isRunning: false,
        style: { color: "" },
      } 
    );
    startTimer()
  };

  const incrementSession = () => {
    if (!timer.isRunning) {
      if (timer.sessionLength !== 60) {
        setTimer((prevTimer)=>({...prevTimer, sessionLength: prevTimer.sessionLength + 1 }));
        if (timer.timerState === "Break") return;
        setTimer((prevTimer)=>({...prevTimer, timeLeft: prevTimer.sessionLength * 60 }));
      }
    }
  }

    const decrementSession = () => {
      if (!timer.isRunning) {
        if (timer.sessionLength !== 1) {
          setTimer((prevTimer)=>({  ...prevTimer, sessionLength: prevTimer.sessionLength - 1 }));
          if (timer.timerState === "Break") return;
          setTimer((prevTimer)=>({ ...prevTimer, timeLeft: prevTimer.sessionLength * 60 }));
        }
      }
    };

    const incrementBreak = () => {
      if (!timer.isRunning) {
        if (timer.breakLength !== 60) {
          setTimer((prevTimer)=>({ ...prevTimer, breakLength: prevTimer.breakLength + 1 }));
          if (timer.timerState === "Session") return;
          setTimer((prevTimer)=>({ ...prevTimer, timeLeft: prevTimer.breakLength * 60 }));
        }
      }
    };

    const decrementBreak = () => {
      if (!timer.isRunning) {
        if (timer.breakLength !== 1) {
          setTimer((prevTimer)=>({...prevTimer, breakLength: prevTimer.breakLength - 1 }));
          if (timer.timerState === "Session") return;
          setTimer((prevTimer)=>({...prevTimer, timeLeft: prevTimer.breakLength * 60 }));
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
          sessionLength={timer.sessionLength}
          breakLength={timer.breakLength}
        />
        <TimerDisplay
          timeLeft={timer.timeLeft}
          timerState={timer.timerState}
          timerStyle={timer.style}
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
