import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import useSound from "../../hooks/useSound";
import "./Bustout.css";

function Bustout() {
  const canvasRef = useRef(null);
  const theme = useSelector((state) => state.theme);
  const playSound = useSound();

  const hitWallSound = {
    frequency: 450,
    duration: 0.24, // Duration in seconds
    volume: 0.2, // Volume (scaled from BASIC 0-15 to JS 0-1)
    env: [0.1, 0.118, 0.73, 0.1], // Example envelope parameters
    ent: [10, 0.02, -10, 0.02], // Simplified for testing
  };

  const playBallSound = {
    frequency: 445,
    duration: 0.48, // Duration in seconds
    volume: 0.8, // Volume adjusted from a scale of 0-15
    env: [0.01, 1.18, 0.73, 0.1], // Envelope parameters
    ent: [1, 0.2, -1, 0.2], // Frequency envelope steps
  };

  const lostLifeSound = {
    frequency: 460,
    duration: 0.2, // Duration in seconds
    volume: 0.8, // Volume adjusted from a scale of 0-15
    env: [0.05, 0.2, 0.066, 0.22], // Envelope parameters
    ent: [1, 0.02, -1, 0.05, 1, 0.01, -1, 0.11, 1, 0.03, -1, 0.08], // Frequency envelope steps
  };

  const winSound = {
    frequency: 440,
    duration: 0.2, // Duration in seconds
    volume: 0.866, // Volume adjusted from a scale of 0-15
    env: [0.01, 0, 0.333, 0.02], // Envelope parameters
    ent: [], // No frequency envelope steps
  };

  const testSoundParams = {
    frequency: 440, // A4 note
    duration: 2, // 2 seconds
    volume: 0.5, // 50% volume
    env: [0.1, 0.2, 0.5, 0.1], // Example envelope parameters
    ent: [], // No frequency envelope for testing
  };

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

  const testSound = (soundParams) => {
    console.log(soundParams);
    playSound(soundParams);
  };
  const testSound2 = () => {
    playSound({
      frequency: 440, // A4 note
      duration: 2, // 2 seconds
      volume: 0.5, // 50% volume
      env: [0.1, 0.2, 0.5, 0.1], // Example envelope parameters
      ent: [], // No frequency envelope for testing
    });
  };
  const testSound3 = (testSoundParams) => {
    playSound(testSoundParams);
  };

  return (
    <div>
      <h1>Bustout Game</h1>
      <canvas ref={canvasRef} id="gameCanvas" width="640" height="480"></canvas>
      <button onClick={() => testSound(hitWallSound)}>HIT WALL</button>
      <button onClick={() => testSound(playBallSound)}>BALL</button>
      <button onClick={() => testSound(lostLifeSound)}>LOST</button>
      <button onClick={() => testSound(winSound)}>WIN</button>
      <button onClick={() => testSound2()}>PLAY BALL</button>
      <button onClick={() => testSound3(testSoundParams)}>PLAY BALL</button>
    </div>
  );
}

export default Bustout;
