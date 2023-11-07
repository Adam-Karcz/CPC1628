import React from "react";
import { Link } from "react-router-dom";
import "./Nav.scss";

function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/bustout">Bustout</Link>
        </li>
        <li>
          <Link to="/bomber">Bomber</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
