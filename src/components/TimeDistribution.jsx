import React, { useEffect } from "react";

const TimeDistribution = ({
  tasks,
  workTime,
  startTime,
  isIntervalsEnabled,
}) => {
  const convertToMinutes = (hours) => hours * 60;

  const convertMinutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins < 10 ? "0" : ""}${mins}`;
  };

  const formatTimeInterval = (start, duration) => {
    const end = start + duration;
    return `${convertMinutesToTime(start)} — ${convertMinutesToTime(end)}`;
  };

  const totalWorkMinutes = convertToMinutes(workTime);

  let currentTime =
    convertToMinutes(parseFloat(startTime.split(":")[0])) +
    parseFloat(startTime.split(":")[1]);

  const totalTasksDurationMinutes = tasks.reduce(
    (acc, task) => acc + convertToMinutes(task.duration),
    0
  );

  if (totalTasksDurationMinutes > totalWorkMinutes) {
    console.error(
      "Суммарная длительность задач превышает доступное рабочее время!"
    );
  }

  const distributeTime = () => {
    return tasks
      .filter((task) => task.duration > 0) // Исключаем задачи с нулевой продолжительностью
      .map((task) => {
        const taskTimeMinutes = convertToMinutes(task.duration);
        const distributedTime = Math.round(
          totalWorkMinutes * (taskTimeMinutes / totalTasksDurationMinutes)
        );
        const timeInterval = formatTimeInterval(currentTime, distributedTime);
        currentTime += distributedTime;
        return {
          ...task,
          distributedTime: convertMinutesToTime(distributedTime),
          timeInterval,
        };
      });
  };

  const distributedTasks = distributeTime();

  useEffect(() => {
    console.log(`Время важного события: ${startTime}`);
  }, [startTime]);

  return (
    <>
      <table style={{ width: "100%", textAlign: "left" }}>
        <tbody>
          <tr>
            <th>Задача</th>
            <th>Время</th>
            {isIntervalsEnabled && <th>Интервал</th>}
          </tr>
          {distributedTasks.map((task, index) => (
            <tr key={index}>
              <td>{task.name}</td>
              <td>{task.distributedTime}</td>
              {isIntervalsEnabled && <td>{task.timeInterval}</td>}
            </tr>
          ))}
        </tbody>
      </table>
      <br />
    </>
  );
};

export default TimeDistribution;
