import React, { useState, useEffect } from 'react';
import './App.css'; // You can customize your global CSS here

function App() {
  const [seconds, setSeconds] = useState(0); // Tracks seconds
  const [isRunning, setIsRunning] = useState(false); // Indicates whether the timer is running
  const [intervalId, setIntervalId] = useState(null); // Stores the interval ID for clearing

  // Start/Stop the stopwatch
  const toggleTimer = () => {
    if (isRunning) {
      clearInterval(intervalId); // Stop the timer
      setIsRunning(false);
    } else {
      const newIntervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1); // Increment time every second
      }, 1000);
      setIntervalId(newIntervalId);
      setIsRunning(true);
    }
  };

  // Reset the stopwatch
  const resetTimer = () => {
    clearInterval(intervalId); // Clear the interval if the timer is running
    setIsRunning(false);
    setSeconds(0); // Reset time to 0
  };

  // Convert seconds to MM:SS format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60); // Get minutes part
    const remainingSeconds = seconds % 60; // Get remaining seconds part
    return `Time: ${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`; // Format as Time: MM:SS
  };

  // Cleanup when the component unmounts (optional)
  useEffect(() => {
    return () => {
      clearInterval(intervalId); // Clean up interval on unmount
    };
  }, [intervalId]); // Re-run cleanup if intervalId changes

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
