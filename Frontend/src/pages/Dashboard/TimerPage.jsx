import React, { useState, useEffect, useRef } from "react";

const PomodoroTimer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [sessionType, setSessionType] = useState("work"); // work, break, longBreak
  const [completedSessions, setCompletedSessions] = useState(0);
  const [settings, setSettings] = useState({
    workDuration: 25,
    breakDuration: 5,
    longBreakDuration: 15,
    sessionsBeforeLongBreak: 4,
  });

  const intervalRef = useRef(null);

  // Timer logic
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0) {
            handleSessionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  useEffect(() => {
    const duration =
      sessionType === "work"
        ? settings.workDuration
        : sessionType === "break"
        ? settings.breakDuration
        : settings.longBreakDuration;
    setTimeLeft(duration * 60);
  }, [sessionType, settings]);

  const handleSessionComplete = () => {
    setIsRunning(false);
    if (sessionType === "work") {
      setCompletedSessions((prev) => prev + 1);
      if ((completedSessions + 1) % settings.sessionsBeforeLongBreak === 0) {
        setSessionType("longBreak");
      } else {
        setSessionType("break");
      }
    } else {
      setSessionType("work");
    }
  };

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    const duration =
      sessionType === "work"
        ? settings.workDuration
        : sessionType === "break"
        ? settings.breakDuration
        : settings.longBreakDuration;
    setTimeLeft(duration * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] px-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Pomodoro Timer</h2>

        <div className="text-center mb-6">
          <p className="text-lg mb-2 font-medium text-gray-700 dark:text-gray-300">
            {sessionType === "work"
              ? "Work Session"
              : sessionType === "break"
              ? "Short Break"
              : "Long Break"}
          </p>
          <p className="text-5xl font-extrabold text-gray-900 dark:text-white">
            {formatTime(timeLeft)}
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          {!isRunning ? (
            <button
              onClick={startTimer}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              Start
            </button>
          ) : (
            <button
              onClick={pauseTimer}
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition"
            >
              Pause
            </button>
          )}
          <button
            onClick={resetTimer}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition"
          >
            Reset
          </button>
        </div>

        <div className="text-center text-gray-700 dark:text-gray-300 font-medium">
          Completed Work Sessions: {completedSessions}
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
