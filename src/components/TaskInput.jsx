import React, { useState } from "react";

function TaskInput({ onAddTask }) {
  const [taskName, setTaskName] = useState("");
  const [taskTime, setTaskTime] = useState("01:00");

  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleTaskTimeChange = (event) => {
    setTaskTime(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && taskName && taskTime) {
      const [hours, minutes] = taskTime.split(":").map(Number);
      const duration = hours + minutes / 60;
      onAddTask({ name: taskName, duration });

      // Здесь устанавливаем значение времени по умолчанию для следующей задачи
      setTaskTime(taskTime);
      setTaskName(""); // Очищаем поле названия задачи
    }
  };

  return (
    <div className="panel">
      <input
        type="time"
        step="60"
        value={taskTime}
        onChange={handleTaskTimeChange}
        onKeyPress={handleKeyPress}
      />
      <input
        type="text"
        placeholder="Название задачи..."
        value={taskName}
        onChange={handleTaskNameChange}
        onKeyPress={handleKeyPress}
        style={{ padding: "3px" }}
      />
    </div>
  );
}

export default TaskInput;
