import React from "react";

const TimeDistribution = ({ tasks }) => {
  const startTime = new Date(); // начало рабочего дня
  startTime.setHours(8, 0, 0, 0); // устанавливаем начало дня в 8 утра

  const formatTime = (date) => {
    return (
      date.getHours() +
      ":" +
      (date.getMinutes() < 10 ? "0" : "") +
      date.getMinutes()
    );
  };

  // Функция для получения интервала времени для задачи
  const getTimeInterval = (duration, index) => {
    const start = new Date(
      startTime.getTime() +
        tasks
          .slice(0, index)
          .reduce((sum, task) => sum + task.duration * 3600000, 0)
    );
    const end = new Date(start.getTime() + duration * 3600000);
    return `${formatTime(start)} — ${formatTime(end)}`;
  };

  return (
    <div>
      <h2>Распределение времени</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task.name}: {task.duration.toFixed(2).replace(".", ":")} (
            {getTimeInterval(task.duration, index)})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimeDistribution;
