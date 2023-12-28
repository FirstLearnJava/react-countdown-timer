import './App.css';
import react, { useState, useRef, useEffect } from 'react';
import styles from './homepage.module.scss';

export default function App() {
  const [initialTime, setInitialTime] = useState(null);
  const [now, setNow] = useState(null);
  const [seconds, setSeconds] = useState(Number(0));
  const [minutes, setMinutes] = useState(Number(0));
  const [hours, setHours] = useState(Number(24));
  const IdRef = useRef(null);

  function handleStart() {
    setInitialTime(Date.now());
    setNow(Date.now());

    clearInterval(IdRef.current);

    IdRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }

  function handleStop() {
    clearInterval(IdRef.current);
  }

  let secondsPassed = 0;

  if (initialTime != null && now != null) {
    secondsPassed = Math.floor((now - initialTime) / 1000);
  }

  if (secondsPassed >= 1) {
    secondsPassed = 0;
    if (seconds == 0 && minutes == 0 && hours == 0) {
    } else {
      setSeconds(seconds - 1);
      if (seconds <= 0) {
        setSeconds(59);
        setMinutes(minutes - 1);
        if (minutes <= 0) {
          setMinutes(59);
          setHours(hours - 1);
        }
      }

      handleStop();
      handleStart();
    }
  }

  return (
    <>
      <div className={styles.centerMainContent}>
        <div>
          <div className={styles.alignTimerCounts}>
            <h3>
              hours count: <span>{hours}</span>
            </h3>
            <h3>
              minutes count: <span>{minutes}</span>
            </h3>
            <h3>
              seconds count: <span>{seconds}</span>
            </h3>
          </div>
          <div className={styles.alignTimerButtons}>
            <button onClick={handleStart}>Start Timer</button>
            <button onClick={handleStop}>Stop Timer</button>
          </div>
        </div>
      </div>
    </>
  );
}
