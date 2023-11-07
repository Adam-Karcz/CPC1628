import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Main from "./components/Main";
import Footer from "./components/Footer";
import "./App.scss";

function App() {
  const [theme, setTheme] = useState("theme-color");
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  return (
    <Router>
      <div className="App">
        <Header theme={theme} setTheme={setTheme} />
        <Nav />
        <Main />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
