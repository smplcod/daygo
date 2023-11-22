import React from "react";

function Settings({
  isIntervalsEnabled,
  onToggleIntervals,
  isPomodoroEnabled,
  onTogglePomodoro,
  onStartWorkDay, // Функция, которая будет вызвана при нажатии на кнопку
}) {
  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        backgroundColor: "#f0f0f0",
        width: "300px",
        marginBottom: "10px",
      }}
    >
      <div style={{ marginBottom: "5px" }}>
        <label>
          <input
            type="checkbox"
            checked={isIntervalsEnabled}
            onChange={onToggleIntervals}
          />{" "}
          Интервалы
        </label>
      </div>
      <div style={{ marginBottom: "5px" }}>
        {" "}
        {/* Добавлен отступ снизу */}
        <label>
          <input
            type="checkbox"
            checked={isPomodoroEnabled}
            onChange={onTogglePomodoro}
          />{" "}
          Помидоры
        </label>
      </div>
      {/* Кнопка для начала рабочего дня */}
      <div>
        <button onClick={onStartWorkDay} disabled>
          🚀Начать рабочий день (soon)
        </button>
      </div>
    </div>
  );
}

export default Settings;
