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
    { name: "Task1", duration: "1:00" },
    { name: "Task2", duration: "2:00" },
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
  const [endTime, setEndTime] = useState("22:00");
  const [isIntervalsEnabled, setIsIntervalsEnabled] = useState(false);
  const [isPomodoroEnabled, setIsPomodoroEnabled] = useState(false);
  const [pomodoroDuration, setPomodoroDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [theme, setTheme] = useState("light");

  // Загрузка и сохранение в localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    const savedWorkTime = localStorage.getItem("workTime");
    const savedStartTime = localStorage.getItem("startTime");
    const savedPomodoroEnabled = localStorage.getItem("isPomodoroEnabled");
    const savedIntervalsEnabled = localStorage.getItem("isIntervalsEnabled");
    const savedPomodoroDuration = localStorage.getItem("pomodoroDuration");
    const savedBreakDuration = localStorage.getItem("breakDuration");
    const savedEndTime = localStorage.getItem("endTime");

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
    if (savedEndTime) setEndTime(savedEndTime);

    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("workTime", workTime.toString());
    localStorage.setItem("startTime", startTime);
    localStorage.setItem("isPomodoroEnabled", isPomodoroEnabled.toString());
    localStorage.setItem("isIntervalsEnabled", isIntervalsEnabled.toString());
    localStorage.setItem("pomodoroDuration", pomodoroDuration.toString());
    localStorage.setItem("breakDuration", breakDuration.toString());
    localStorage.setItem("endTime", endTime);
  }, [
    tasks,
    workTime,
    startTime,
    isPomodoroEnabled,
    isIntervalsEnabled,
    pomodoroDuration,
    breakDuration,
    endTime,
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
      <ThemeToggle theme={theme} setTheme={setTheme} />
      <h1>DaysGo v1.6.8</h1>
      <h3>Пыланирование и реалистичное распределение времени</h3>
      <br />
      <h2>Итоговый план:</h2>
      <TimeDistribution
        tasks={tasks}
        workTime={workTime}
        startTime={startTime}
        isIntervalsEnabled={isIntervalsEnabled}
      />
      <TimeInput
        onSetWorkTime={setWorkTime}
        setStartTime={setStartTime} // Изменено с setStartTime2 на setStartTime
        endTime={endTime}
        setEndTime={setEndTime}
      />
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
      <ul>
        <li>Изменение порядка задач перетаскиваением</li>
        <li>Темная тема</li>
        <li>Двойной клик по задаче — редактирование. Enter — сохранение</li>
      </ul>
    </>
  );
}

export default App;
