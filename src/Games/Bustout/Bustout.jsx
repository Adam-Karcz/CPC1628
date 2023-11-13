import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import useSound from "../../hooks/useSound";
import {
  hitWallSound,
  playBallSound,
  lostLifeSound,
  winSound,
} from "./soundDefinitions";
import "./Bustout.css";

function Bustout() {
  const canvasRef = useRef(null);
  const computedStyle = getComputedStyle(document.body);
  const theme = useSelector((state) => state.theme);
  const playSound = useSound();

  const [paddle, setPaddle] = useState({
    x: 33, // Temp initial value must be within game field range to be cleared after initial render
    y: 422, // Temp initial value must be within game field range to be cleared after initial render
    width: 75,
    height: 10,
    dx: 5, // how much the paddle moves per frame
  });

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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!canvasRef.current) return;

      const rightEdge = canvasRef.current.width - paddle.width - 32; //Hardcoded from drawBorders/clearCanvas consider pull up some variables
      const leftEdge = 32; //Hardcoded from drawBorders/clearCanvas consider pull up some variables

      if (e.key === "ArrowRight") {
        // Move paddle right
        setPaddle((prev) => ({
          ...prev,
          x: Math.min(prev.x + prev.dx, rightEdge),
        }));
      } else if (e.key === "ArrowLeft") {
        // Move paddle left
        setPaddle((prev) => ({
          ...prev,
          x: Math.max(prev.x - prev.dx, leftEdge),
        }));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [paddle.dx, paddle.width]);

  useEffect(() => {
    gameLoop();
  }, []);

  useEffect(() => {
    // This effect will re-draw the paddle whenever its state changes
    clearCanvas();
    drawPaddle();
  }, [paddle]);

  const setupGraphics = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Access CSS variable values

    const fillColor = computedStyle.getPropertyValue("--ink1");
    const strokeColor = computedStyle.getPropertyValue("--ink25");

    // Set the canvas size to fill the parent
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Set the default styles
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;

    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // next - draw game elements
    drawBorders(ctx, strokeColor);
    setPaddle({
      ...paddle,
      x: canvas.width / 2 - paddle.width / 2,
      y: canvas.height - 48 - paddle.height,
    });
  };

  // Function to draw the game borders
  const drawBorders = (ctx, strokeColor) => {
    console.log("draw borders strokeColor:", strokeColor);
    ctx.beginPath();
    // Set the border color
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 3;
    //left border
    ctx.moveTo(30, 32);
    ctx.lineTo(30, 432); // Assuming 400 is the height plus the starting Y

    //right border
    ctx.moveTo(610, 32);
    ctx.lineTo(610, 432);

    ctx.stroke();
    ctx.closePath();
  };

  // Game loop
  const gameLoop = () => {
    requestAnimationFrame(gameLoop);
    // clearCanvas(); // Clear the canvas for the new drawing
    // drawPaddle(); // Draw the paddle
  };

  // Function to draw the paddle
  const drawPaddle = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.fillStyle = computedStyle.getPropertyValue("--ink11");
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    console.log("X,Y:", paddle.x, paddle.y);
  };

  // Make sure to clear the previous paddle drawing every frame
  const clearCanvas = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    const gameAreaTop = 32; // Assuming this is where your game area starts
    const gameAreaHeight = 400; // Adjust as needed for your game area
    ctx.clearRect(
      32,
      gameAreaTop,
      canvasRef.current.width - 64,
      gameAreaHeight
    );
  };

  // SOUND testing

  const gameSound = (soundParams) => {
    playSound(soundParams);
  };

  return (
    <div>
      <h1>Bustout Game</h1>
      <canvas
        ref={canvasRef}
        key={theme}
        id="gameCanvas"
        width="640"
        height="480"
      ></canvas>
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
