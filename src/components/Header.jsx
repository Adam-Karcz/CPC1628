import React from "react";
import { useDispatch } from "react-redux";
import "./Header.scss";

function ThemeSwitcher() {
  const dispatch = useDispatch();

  const changeTheme = (newTheme) => {
    dispatch({ type: "SET_THEME", payload: newTheme });
  };

  return (
    <div className="theme-menu">
      <button onClick={() => changeTheme("theme-color")}>Color</button>
      <button onClick={() => changeTheme("theme-green")}>Green</button>
      <button onClick={() => changeTheme("theme-grayscale")}>Grayscale</button>
    </div>
  );
}

function Header() {
  return (
    <header>
      <h1>Amstrad-Schneider learning book games JS conversion</h1>
      <ThemeSwitcher />
    </header>
  );
}

export default Header;
