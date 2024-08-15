import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initGame, fetchToken } from "../../redux/actions";
import { setCaveData, updateCaveOffset } from "../../redux/gameSlice";
import Cave from "../Cave/Cave";
import Controls from "../../utils/Controls";
import CollisionDetector from "../../utils/CollisionDetector";
import Drone from "../Drone/Drone";
import Scoreboard from "../ScoreBoard/ScoreBoard";

const Game = () => {
  const dispatch = useDispatch();
  const { playerId, token, status, name, complexity, caveSpeed } = useSelector(
    (state) => state.game
  );

  useEffect(() => {
    dispatch(initGame({ name, complexity }));
  }, [dispatch, name, complexity]);

  useEffect(() => {
    if (status === "succeeded" && playerId) {
      dispatch(fetchToken(playerId));
    }
  }, [status, playerId, dispatch]);

  useEffect(() => {
    if (token) {
      const ws = new WebSocket("wss://cave-drone-server.shtoa.xyz/cave");

      ws.onopen = () => {
        ws.send(`player:${playerId}-${token}`);
      };

      ws.onmessage = (event) => {
        const message = event.data;

        if (message === "finished") {
          ws.close();
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
    const interval = setInterval(() => {
      dispatch(updateCaveOffset());
    }, 100);

    return () => clearInterval(interval);
  }, [dispatch, caveSpeed]);

  return (
    <div className="game-container" style={{ width: 800 }}>
      <Cave />
      <Controls />
      <CollisionDetector />
      <Drone />
      <Scoreboard />
    </div>
  );
};

export default Game;
