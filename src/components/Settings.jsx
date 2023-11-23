import React from "react";

function Settings({
  isIntervalsEnabled,
  onToggleIntervals,
  isPomodoroEnabled,
  onTogglePomodoro,
  onStartWorkDay, // Функция, которая будет вызвана при нажатии на кнопку
}) {
  return (
    <div className="panel with-margin">
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
          🚀Начать рабочий день (в разработке)
        </button>
      </div>
    </div>
  );
}

export default Settings;
