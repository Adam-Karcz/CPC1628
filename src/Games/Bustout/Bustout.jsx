import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import useSound from "../../hooks/useSound";
import {
  hitWallSound,
  playBallSound,
  lostLifeSound,
  winSound,
  testSoundParams,
} from "./soundDefinitions";
import "./Bustout.css";

function Bustout() {
  const canvasRef = useRef(null);
  const theme = useSelector((state) => state.theme);
  const playSound = useSound();

  //   const [score, setScore] = useState(0);
  //   const [lives, setLives] = useState(5);
  //   const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      // BUGFIX for issue with updating color variables propably caused by css animation in app header
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes") {
          setupGraphics();
        }
      });
    });

    observer.observe(document.body, {
      attributes: true,
    });
    setupGraphics();
    // dont create many useEffects!
    return () => observer.disconnect();
  }, [theme]);
  console.log(theme);

  const setupGraphics = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Access CSS variable values
    const computedStyle = getComputedStyle(document.body);
    const fillColor = computedStyle.getPropertyValue("--ink1").trim();
    const strokeColor = computedStyle.getPropertyValue("--ink25").trim();

    // Set the canvas size to fill the parent
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Set the default styles
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    console.log("Stroke Color:", strokeColor); //TODO: remove when handle redux
    console.log("Fill Color:", fillColor);

    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // next - draw game elements
    drawBorders(ctx, strokeColor);
  };

  // Function to draw the game borders
  const drawBorders = (ctx, strokeColor) => {
    console.log("draw borders strokeColor:", strokeColor);
    ctx.beginPath();
    // Set the border color
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 3; // Example border width

    //left border
    ctx.moveTo(30, 32);
    ctx.lineTo(30, 432); // Assuming 400 is the height plus the starting Y

    //right border
    ctx.moveTo(610, 32);
    ctx.lineTo(610, 432);

    ctx.stroke();
    ctx.closePath();
  };

  // SOUND testing

  const gameSound = (soundParams) => {
    playSound(soundParams);
  };

  return (
    <div>
      <h1>Bustout Game</h1>
      <canvas ref={canvasRef} id="gameCanvas" width="640" height="480"></canvas>
      <div>
        <button onClick={() => gameSound(hitWallSound)}>HIT WALL</button>
        <button onClick={() => gameSound(playBallSound)}>BALL</button>
        <button onClick={() => gameSound(lostLifeSound)}>LOST</button>
        <button onClick={() => gameSound(winSound)}>WIN</button>
      </div>
    </div>
  );
}

export default Bustout;
