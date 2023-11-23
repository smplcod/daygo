import React, { useState, useEffect, useCallback } from "react";
import styles from "./TaskList.module.css";

function TaskList({
  tasks,
  onRemoveTask,
  onUpdateTime,
  isPomodoroEnabled,
  pomodoroDuration,
  breakDuration,
}) {
  // Функция для преобразования часов в формат "ч:мм"
  const formatDuration = (hours) => {
    const totalMinutes = Math.round(hours * 60);
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return `${h}:${m < 10 ? "0" : ""}${m}`;
  };

  // Функции для увеличения и уменьшения длительности задачи
  const incrementHours = (index) => {
    onUpdateTime(index, {
      ...tasks[index],
      duration: tasks[index].duration + 1,
    });
  };

  const decrementHours = (index) => {
    if (tasks[index].duration >= 1) {
      onUpdateTime(index, {
        ...tasks[index],
        duration: tasks[index].duration - 1,
      });
    }
  };

  const incrementMinutes = (index) => {
    const newDuration = tasks[index].duration + 5 / 60;
    onUpdateTime(index, {
      ...tasks[index],
      duration: newDuration,
    });
  };

  const decrementMinutes = (index) => {
    if (tasks[index].duration * 60 >= 5) {
      const newDuration = tasks[index].duration - 5 / 60;
      onUpdateTime(index, {
        ...tasks[index],
        duration: newDuration,
      });
    }
  };

  // Функция для рендеринга количества помидоров
  const renderPomodoros = useCallback(
    (duration) => {
      const getPomodorosForTask = (duration) => {
        return Math.floor(
          duration /
            (parseInt(pomodoroDuration, 10) + parseInt(breakDuration, 10))
        );
      };

      const pomodoroCount = getPomodorosForTask(duration * 60);
      return `${"🍅".repeat(pomodoroCount)} ${pomodoroCount}`;
    },
    [pomodoroDuration, breakDuration]
  );

  // Состояния и функции для редактирования названия задачи
  const [editableTaskIndex, setEditableTaskIndex] = useState(-1);
  const [editableTaskName, setEditableTaskName] = useState("");

  const handleDoubleClick = (index, taskName) => {
    setEditableTaskIndex(index);
    setEditableTaskName(taskName);
  };

  const handleTaskNameChange = (event) => {
    setEditableTaskName(event.target.value);
  };

  const handleKeyPress = (event, index) => {
    if (event.key === "Enter") {
      const updatedTask = { ...tasks[index], name: editableTaskName };
      onUpdateTime(index, updatedTask);
      setEditableTaskIndex(-1);
    }
  };

  return (
    <table style={{ width: "100%", textAlign: "left" }}>
      <tbody>
        <tr>
          <th>Задача</th>
          <th colSpan="3">Время</th>
          {isPomodoroEnabled && <th>Помидоры</th>}
        </tr>
        {tasks.map((task, index) => (
          <tr key={index}>
            <td onDoubleClick={() => handleDoubleClick(index, task.name)}>
              {editableTaskIndex === index ? (
                <input
                  type="text"
                  value={editableTaskName}
                  onChange={handleTaskNameChange}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  autoFocus
                />
              ) : (
                <>
                  <span
                    onClick={() => onRemoveTask(index)}
                    style={{ cursor: "pointer" }}
                  >
                    ❌
                  </span>
                  {task.name}
                </>
              )}
            </td>
            <td>
              <div className={styles.buttonGroup}>
                <button
                  onClick={() => incrementHours(index)}
                  className={styles.buttonSmall}
                >
                  +
                </button>
                <button
                  onClick={() => decrementHours(index)}
                  disabled={task.duration < 1}
                  className={styles.buttonSmall}
                >
                  -
                </button>
              </div>
            </td>
            <td>{formatDuration(task.duration)}</td>
            <td>
              <div className={styles.buttonGroup}>
                <button
                  onClick={() => incrementMinutes(index)}
                  className={styles.buttonSmall}
                >
                  +
                </button>
                <button
                  onClick={() => decrementMinutes(index)}
                  disabled={task.duration * 60 < 5}
                  className={styles.buttonSmall}
                >
                  -
                </button>
              </div>
            </td>
            {isPomodoroEnabled && <td>{renderPomodoros(task.duration)}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TaskList;
