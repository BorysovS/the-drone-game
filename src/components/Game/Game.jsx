import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initGame, fetchToken } from "../../redux/actions";
import {
  setCaveData,
  setDronePosition,
  setGameOver,
  updateLeaderboard,
} from "../../redux/gameSlice";
import { renderCave } from "../../utils/caveUtils";
import Drone from "../Drone/Drone";

const Game = () => {
  const dispatch = useDispatch();
  const { playerId, token, caveData, dronePosition, isGameOver, status } =
    useSelector((state) => state.game);

  // Виклик initGame при початку гри
  useEffect(() => {
    const playerName = "Player Name"; // Ім'я гравця, отримане з форми
    const difficulty = 5; // Рівень складності, отриманий з форми
    dispatch(initGame({ name: playerName, complexity: difficulty }));
    console.log("first use effect", status);
  }, [dispatch]);

  // Виклик fetchToken після успішної ініціалізації гри
  useEffect(() => {
    if (status === "succeeded" && playerId) {
      dispatch(fetchToken(playerId));
      console.log("second use effect", status);
    }
  }, [status, playerId, dispatch]);

  useEffect(() => {
    if (token) {
      const ws = new WebSocket("wss://cave-drone-server.shtoa.xyz/cave");

      ws.onopen = () => {
        // Надсилаємо playerId та token у форматі player:[id]-[token]
        ws.send(`player:${playerId}-${token}`);
      };

      ws.onmessage = (event) => {
        const message = event.data;

        if (message === "finished") {
          ws.close(); // Закриваємо з'єднання, коли дані повністю передані
        } else {
          const caveCoordinates = message.split(",").map(Number);
          dispatch(setCaveData(caveCoordinates));
        }
      };

      return () => {
        ws.close();
      };
    }
  }, [token, playerId, dispatch]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isGameOver) {
        const { x, y } = dronePosition;
        if (e.key === "ArrowUp") dispatch(setDronePosition({ x, y: y - 1 }));
        if (e.key === "ArrowDown") dispatch(setDronePosition({ x, y: y + 1 }));
        if (e.key === "ArrowLeft") dispatch(setDronePosition({ x: x - 1, y }));
        if (e.key === "ArrowRight") dispatch(setDronePosition({ x: x + 1, y }));

        if (checkCollision({ x, y: y - 1 }, caveData)) {
          dispatch(setGameOver(true));
          handleGameOver();
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [dronePosition, caveData, isGameOver, dispatch]);

  const checkCollision = (dronePos, cave) => {
    const [leftWall, rightWall] = cave;
    return (
      dronePos.x <= leftWall ||
      dronePos.x >= rightWall ||
      dronePos.y <= 0 ||
      dronePos.y >= 100
    );
  };

  const handleGameOver = () => {
    alert("Game Over!");
    const score = calculateScore(caveData);
    dispatch(updateLeaderboard({ name: playerId, score }));
  };

  return (
    <div className="game-container">
      {isGameOver ? (
        <p>Game Over</p>
      ) : (
        <svg width="100%" height="100%">
          {renderCave(caveData)}
          <Drone position={dronePosition} />
        </svg>
      )}
    </div>
  );
};

export default Game;
