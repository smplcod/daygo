import React, { useState, useEffect } from "react";

function TimeInput({ onSetWorkTime, setStartTime, endTime, setEndTime }) {
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours < 10 ? `0${hours}` : hours}:${
      mins < 10 ? `0${mins}` : mins
    }`;
  };

  // Загружаем начальные значения из localStorage
  const savedStartTime = localStorage.getItem("startTime") || "06:00";
  const savedEndTime = localStorage.getItem("endTime") || "22:00";

  const [startTimeState, setStartTimeState] = useState(savedStartTime);
  const [endTimeState, setEndTimeState] = useState(savedEndTime);
  const [workDuration, setWorkDuration] = useState("");

  useEffect(() => {
    setStartTime(startTimeState); // Обновляем startTime в родительском компоненте
    setEndTime(endTimeState); // Обновляем endTime в родительском компоненте
  }, [startTimeState, endTimeState, setStartTime, setEndTime]);

  useEffect(() => {
    const calculateWorkDuration = () => {
      const [startHours, startMinutes] = startTimeState.split(":").map(Number);
      const [endHours, endMinutes] = endTimeState.split(":").map(Number);

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
    };

    calculateWorkDuration();
  }, [startTimeState, endTimeState, onSetWorkTime]);

  const handleStartTimeChange = (event) => {
    const newStartTime = event.target.value;
    setStartTimeState(newStartTime);
    localStorage.setItem("startTime", newStartTime); // Сохраняем в localStorage
  };

  const handleEndTimeChange = (event) => {
    const newEndTime = event.target.value;
    setEndTimeState(newEndTime);
    localStorage.setItem("endTime", newEndTime); // Сохраняем в localStorage
  };

  return (
    <div className="panel">
      <label>
        Начало рабочего дня:
        <input
          type="time"
          value={startTimeState}
          onChange={handleStartTimeChange}
        />
      </label>
      <br />
      <label>
        Конец рабочего дня:
        <input
          type="time"
          value={endTimeState}
          onChange={handleEndTimeChange}
        />
      </label>
      <p>Длительность рабочего дня: {workDuration}</p>
    </div>
  );
}

export default TimeInput;
