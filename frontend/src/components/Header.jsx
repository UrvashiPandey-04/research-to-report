import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="header">
      <div className="logo">ResearchAgent</div>

      <div className="header-right">
        <button onClick={toggleTheme}>
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        <div className="avatar">
          {user?.name?.charAt(0)?.toUpperCase()}
        </div>
      </div>
    </header>
  );
}