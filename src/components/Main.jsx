import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Bustout from "../Games/Bustout/Bustout";
import Bomber from "../Games/Bomber/Bomber";

function Main() {
  return (
    <main>
      <Routes>
        <Route path="/bustout" element={<Bustout />} />
        <Route path="/bomber" element={<Bomber />} />
        <Route path="/" element={<Navigate replace to="/bustout" />} />
      </Routes>
    </main>
  );
}

export default Main;
