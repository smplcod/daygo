import React from "react";

function ThemeToggle() {
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <button
      onClick={toggleTheme}
      style={{ position: "fixed", top: "10px", right: "10px" }}
    >
      Переключить тему
    </button>
  );
}

export default ThemeToggle;
