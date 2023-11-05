import React, { useState } from "react";

import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import TimeDistribution from "./components/TimeDistribution";
import TimeInput from "./components/TimeInput";
import Settings from "./components/Settings";
import PomodoroSettings from "./components/PomodoroSettings";

function App() {
  // Добавляем начальные тестовые задачи
  const initialTasks = [
    { name: "Задача1", duration: "0:30" },
    { name: "Задача2", duration: "0:30" },
    { name: "Задача3", duration: "1:00" },
    { name: "Задача4", duration: "1:00" },
    { name: "Задача5", duration: "2:00" },
    { name: "Задача6", duration: "2:00" },
  ].map((task) => ({
    ...task,
    duration:
      parseInt(task.duration.split(":")[0], 10) +
      parseInt(task.duration.split(":")[1], 10) / 60,
  }));

  const [tasks, setTasks] = useState(initialTasks);
  const [workTime, setWorkTime] = useState(8);
  const [startTime, setStartTime] = useState("18:00");
  const [isIntervalsEnabled, setIsIntervalsEnabled] = useState(false);
  const [isPomodoroEnabled, setIsPomodoroEnabled] = useState(false);

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

  // Состояния для настроек Pomodoro
  const [pomodoroDuration, setPomodoroDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);

  const handleTogglePomodoro = () => setIsPomodoroEnabled(!isPomodoroEnabled);

  // Обработчики для настроек Pomodoro
  const handlePomodoroChange = (event) =>
    setPomodoroDuration(event.target.value);
  const handleBreakChange = (event) => setBreakDuration(event.target.value);

  return (
    <>
      <h1>Распределение времени</h1>
      <h3>Реалистичный план времени</h3>
      <TimeDistribution
        tasks={tasks}
        workTime={workTime}
        startTime={startTime}
        isIntervalsEnabled={isIntervalsEnabled}
      />
      <TimeInput onSetWorkTime={setWorkTime} setStartTime2={setStartTime} />
      <TaskInput onAddTask={handleAddTask} />

      <h2>Список задач</h2>
      <h3>Желаемое время</h3>
      <TaskList
        tasks={tasks}
        onRemoveTask={handleRemoveTask}
        onUpdateTime={handleUpdateTime}
      />
      <h2>Настройки</h2>
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
    </>
  );
}

export default App;
