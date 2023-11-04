import React, { useState } from "react";

import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import TimeDistribution from "./components/TimeDistribution";
import TimeInput from "./components/TimeInput";

function App() {
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

  const [startTime, setStartTime] = useState("");
  const [tasks, setTasks] = useState(initialTasks);
  const [workTime, setWorkTime] = useState(8);

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

  const handleStartTimeChange = (newStartTime) => {
    setStartTime(newStartTime);
  };

  return (
    <>
      <TimeInput onSetWorkTime={setWorkTime} />
      <TaskInput onAddTask={handleAddTask} />
      <TimeDistribution
        tasks={tasks}
        workTime={workTime}
        startTime={startTime}
      />

      <TaskList
        tasks={tasks}
        onRemoveTask={handleRemoveTask}
        onUpdateTime={handleUpdateTime}
      />
    </>
  );
}

export default App;
