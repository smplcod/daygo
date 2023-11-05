import React, { useState } from "react";

function Settings() {
  const [isIntervalsEnabled, setIsIntervalsEnabled] = useState(false);

  const handleToggleIntervals = () => {
    setIsIntervalsEnabled(!isIntervalsEnabled);
  };

  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        backgroundColor: "#f0f0f0",
        width: "300px",
        marginLeft: "10px", // Добавьте немного отступа слева
      }}
    >
      <label>
        Интервалы:
        <input
          type="checkbox"
          checked={isIntervalsEnabled}
          onChange={handleToggleIntervals}
        />
      </label>
    </div>
  );
}

export default Settings;
