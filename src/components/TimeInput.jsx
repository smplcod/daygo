import React, { useState, useEffect } from "react";

function TimeInput({ onSetWorkTime }) {
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const getEndTimeByAddingHours = (startTime, hoursToAdd) => {
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const endDate = new Date();
    endDate.setHours(startHours + hoursToAdd, startMinutes, 0);
    return endDate.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours < 10 ? `0${hours}` : hours}:${
      mins < 10 ? `0${mins}` : mins
    }`;
  };

  const [startTime, setStartTime] = useState(getCurrentTime());
  const [endTime, setEndTime] = useState(() =>
    getEndTimeByAddingHours(getCurrentTime(), 8)
  );
  const [workDuration, setWorkDuration] = useState("");

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  useEffect(() => {
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);

    let workMinutes =
      endHours * 60 + endMinutes - (startHours * 60 + startMinutes);
    if (workMinutes < 0) {
      workMinutes =
        24 * 60 -
        (startHours * 60 + startMinutes) +
        (endHours * 60 + endMinutes);
    }

    setWorkDuration(formatDuration(workMinutes));
    onSetWorkTime(workMinutes / 60);
  }, [startTime, endTime, onSetWorkTime]);

  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        backgroundColor: "#f0f0f0",
        width: "300px",
      }}
    >
      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="start-time">Начало рабочего дня: </label>
        <input
          type="time"
          id="start-time"
          value={startTime}
          onChange={handleStartTimeChange}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="end-time">Конец рабочего дня: </label>
        <input
          type="time"
          id="end-time"
          value={endTime}
          onChange={handleEndTimeChange}
        />
      </div>

      <div>
        <span>Продолжительность рабочего дня: {workDuration}</span>
      </div>
    </div>
  );
}

export default TimeInput;
