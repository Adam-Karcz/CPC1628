import React from "react";
import "./Header.scss";

function Header({ theme, setTheme }) {
  return (
    <header>
      <h1>Amstrad-Schneider learning book games JS conversion</h1>
      <div className="theme-menu">
        <button onClick={() => setTheme("theme-color")}>Color</button>
        <button onClick={() => setTheme("theme-green")}>Green</button>
        <button onClick={() => setTheme("theme-grayscale")}>Grayscale</button>
      </div>
    </header>
  );
}

export default Header;
