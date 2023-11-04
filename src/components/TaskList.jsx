import React from "react";
import styles from "./TaskList.module.css";

function TaskList({ tasks, onRemoveTask, onUpdateTime }) {
  // Функция для преобразования часов в формат "ч:мм"
  const formatDuration = (hours) => {
    const totalMinutes = Math.round(hours * 60);
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return `${h}:${m < 10 ? "0" : ""}${m}`;
  };

  // Функция для увеличения длительности задачи на час
  const incrementHours = (index) => {
    onUpdateTime(index, {
      ...tasks[index],
      duration: tasks[index].duration + 1,
    });
  };

  // Функция для уменьшения длительности задачи на час
  const decrementHours = (index) => {
    if (tasks[index].duration >= 1) {
      onUpdateTime(index, {
        ...tasks[index],
        duration: tasks[index].duration - 1,
      });
    }
  };

  // Функция для увеличения длительности задачи на 5 минут
  const incrementMinutes = (index) => {
    const newDuration = tasks[index].duration + 5 / 60;
    onUpdateTime(index, {
      ...tasks[index],
      duration: newDuration,
    });
  };

  // Функция для уменьшения длительности задачи на 5 минут
  const decrementMinutes = (index) => {
    if (tasks[index].duration * 60 >= 5) {
      const newDuration = tasks[index].duration - 5 / 60;
      onUpdateTime(index, {
        ...tasks[index],
        duration: newDuration,
      });
    }
  };

  // Функция для вычисления общего времени задач
  const calculateTotalDuration = () => {
    const totalDuration = tasks.reduce((sum, task) => sum + task.duration, 0);
    return formatDuration(totalDuration);
  };

  const totalDuration = calculateTotalDuration();

  return (
    <div>
      <h2>Список задач</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <span
              onClick={() => onRemoveTask(index)}
              style={{ cursor: "pointer", marginRight: "10px" }}
            >
              ❌
            </span>
            {task.name}:
            <span style={{ display: "inline-flex", alignItems: "center" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginRight: "5px",
                }}
              >
                <button
                  onClick={() => incrementHours(index)}
                  className={styles.buttonSmall}
                >
                  +
                </button>
                <button
                  onClick={() => decrementHours(index)}
                  disabled={tasks[index].duration < 1}
                  className={styles.buttonSmall}
                >
                  -
                </button>
              </div>
              {formatDuration(task.duration)}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "5px",
                }}
              >
                <button
                  onClick={() => incrementMinutes(index)}
                  className={styles.buttonSmall}
                >
                  +
                </button>
                <button
                  onClick={() => decrementMinutes(index)}
                  disabled={tasks[index].duration * 60 < 5}
                  className={styles.buttonSmall}
                >
                  -
                </button>
              </div>
            </span>
          </li>
        ))}
      </ul>
      <div>Общее время задач: {totalDuration}</div>
    </div>
  );
}

export default TaskList;
