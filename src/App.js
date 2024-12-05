import React, { useState, useEffect } from 'react';


function App() {
  const [seconds, setSeconds] = useState(0); 
  const [isRunning, setIsRunning] = useState(false); 
  const [intervalId, setIntervalId] = useState(null);

  
  const toggleTimer = () => {
    if (isRunning) {
      clearInterval(intervalId); 
      setIsRunning(false);
    } else {
      const newIntervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1); 
      }, 1000);
      setIntervalId(newIntervalId);
      setIsRunning(true);
    }
  };

  
  const resetTimer = () => {
    clearInterval(intervalId); 
    setIsRunning(false);
    setSeconds(0); 
  };

 
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60); 
    const remainingSeconds = seconds % 60; 
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`; // Format as MM:SS
  };

  
  useEffect(() => {
    return () => {
      clearInterval(intervalId); 
    };
  }, [intervalId]); 
  return (
    <div className="App">
      <div className="stopwatch-container">
        <h1>Stopwatch</h1>
        <div className="time-display">
          <span>{formatTime(seconds)}</span>
        </div>
        <div className="button-container">
          <button onClick={toggleTimer}>
            {isRunning ? 'Stop' : 'Start'}
          </button>
          <button onClick={resetTimer}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;
