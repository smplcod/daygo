import React, { useState, useEffect } from "react";

import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import TimeDistribution from "./components/TimeDistribution";
import TimeInput from "./components/TimeInput";
import Settings from "./components/Settings";
import PomodoroSettings from "./components/PomodoroSettings";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  // Добавляем начальные тестовые задачи
  const initialTasks = [
    { name: "BlueBeGone", duration: "1:00" },
    // { name: "International Passport", duration: "1:00" },
    { name: "🏖️BREAK🏖️ ", duration: "1:00" },
    { name: "State Management learning", duration: "2:00" },
    { name: "DaysGo", duration: "2:00" },
    // { name: "TapSmile", duration: "1:00" },
    // { name: "InfTable", duration: "1:00" },
    // { name: "TypeScript", duration: "1:00" },
  ].map((task) => ({
    ...task,
    duration:
      parseInt(task.duration.split(":")[0], 10) +
      parseInt(task.duration.split(":")[1], 10) / 60,
  }));

  // Состояния для настроек и задач
  const [tasks, setTasks] = useState(initialTasks);
  const [workTime, setWorkTime] = useState(8);
  const [startTime, setStartTime] = useState("18:00");
  const [isIntervalsEnabled, setIsIntervalsEnabled] = useState(false);
  const [isPomodoroEnabled, setIsPomodoroEnabled] = useState(false);
  const [pomodoroDuration, setPomodoroDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);

  // Загрузка и сохранение в localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    const savedWorkTime = localStorage.getItem("workTime");
    const savedStartTime = localStorage.getItem("startTime");
    const savedPomodoroEnabled = localStorage.getItem("isPomodoroEnabled");
    const savedIntervalsEnabled = localStorage.getItem("isIntervalsEnabled");
    const savedPomodoroDuration = localStorage.getItem("pomodoroDuration");
    const savedBreakDuration = localStorage.getItem("breakDuration");

    if (savedTasks) setTasks(savedTasks);
    if (savedWorkTime) setWorkTime(Number(savedWorkTime));
    if (savedStartTime) setStartTime(savedStartTime);
    if (savedPomodoroEnabled)
      setIsPomodoroEnabled(savedPomodoroEnabled === "true");
    if (savedIntervalsEnabled)
      setIsIntervalsEnabled(savedIntervalsEnabled === "true");
    if (savedPomodoroDuration)
      setPomodoroDuration(Number(savedPomodoroDuration));
    if (savedBreakDuration) setBreakDuration(Number(savedBreakDuration));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("workTime", workTime.toString());
    localStorage.setItem("startTime", startTime);
    localStorage.setItem("isPomodoroEnabled", isPomodoroEnabled.toString());
    localStorage.setItem("isIntervalsEnabled", isIntervalsEnabled.toString());
    localStorage.setItem("pomodoroDuration", pomodoroDuration.toString());
    localStorage.setItem("breakDuration", breakDuration.toString());
  }, [
    tasks,
    workTime,
    startTime,
    isPomodoroEnabled,
    isIntervalsEnabled,
    pomodoroDuration,
    breakDuration,
  ]);

  const handleAddTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const handleRemoveTask = (index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  const handleUpdateTime = (index, updatedTask) => {
    setTasks((prevTasks) => {
      const newTasks = [...prevTasks];
      newTasks[index] = updatedTask;
      return newTasks;
    });
  };

  const handleTogglePomodoro = () => setIsPomodoroEnabled(!isPomodoroEnabled);

  // Обработчики для настроек Pomodoro
  const handlePomodoroChange = (event) =>
    setPomodoroDuration(event.target.value);
  const handleBreakChange = (event) => setBreakDuration(event.target.value);

  return (
    <>
      <ThemeToggle />
      <h1>DaysGo v1.6.1</h1>
      <h3>Пыланирование и реалистичное распределение времени</h3>
      <br />
      <h2>Итоговый план:</h2>
      <TimeDistribution
        tasks={tasks}
        workTime={workTime}
        startTime={startTime}
        isIntervalsEnabled={isIntervalsEnabled}
      />
      <TimeInput onSetWorkTime={setWorkTime} setStartTime2={setStartTime} />
      <h2>Изначальные задачи:</h2>
      <TaskInput onAddTask={handleAddTask} />

      <TaskList
        tasks={tasks}
        onRemoveTask={handleRemoveTask}
        onUpdateTime={handleUpdateTime}
        isPomodoroEnabled={isPomodoroEnabled}
        pomodoroDuration={pomodoroDuration}
        breakDuration={breakDuration}
      />
      <h2>Настройки:</h2>
      <Settings
        isIntervalsEnabled={isIntervalsEnabled}
        onToggleIntervals={() => setIsIntervalsEnabled(!isIntervalsEnabled)}
        isPomodoroEnabled={isPomodoroEnabled}
        onTogglePomodoro={handleTogglePomodoro}
      />
      {isPomodoroEnabled && (
        <PomodoroSettings
          pomodoroDuration={pomodoroDuration}
          breakDuration={breakDuration}
          onPomodoroChange={handlePomodoroChange}
          onBreakChange={handleBreakChange}
        />
      )}
      <h2>Помощь:</h2>
      <p>
        Сервис позволяет введя задачи и желаемую их длительность, а также часы
        начала/завершения рабочего дня получить реалистичное рассписание
        учитывая относительный объем каждой из задач. Данные сохраняются для
        возобновления после повторного использования сервиса.
      </p>
      <br />
      <h3>Что нового?</h3>
      <p>
        При двойном нажатии по названию задачи в списке задач — редактирование.
        По нажатию Enter — сохранение.
      </p>
    </>
  );
}

export default App;
