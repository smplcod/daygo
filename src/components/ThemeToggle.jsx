import React from "react";

function ThemeToggle({ theme, setTheme }) {
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
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
