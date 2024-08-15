import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGameOver, updateLeaderboard } from "../redux/gameSlice";
import { calculateScoreIncrement } from "./calculateScore";

const CollisionDetector = () => {
  const dispatch = useDispatch();
  const { dronePosition, caveOffset, complexity, caveSpeed, caveData, name } =
    useSelector((state) => state.game);

  const triangleSize = 20;

  useEffect(() => {
    const checkCollision = () => {
      const currentIndex = Math.floor((dronePosition.y + caveOffset) / 10);
      const currentSegment = caveData[currentIndex];

      console.log("dronePosition.y", dronePosition.y);

      console.log("currentIndex", currentIndex);
      console.log("caveOffset", caveOffset);

      if (!currentSegment) return;

      const [leftWallPosition, rightWallPosition] = currentSegment.map(
        (position) => 500 / 2 + position
      );

      const droneLeftEdge = dronePosition.x - triangleSize / 2;
      const droneRightEdge = dronePosition.x + triangleSize / 2;
      const noseX = dronePosition.x + 10;
      const noseY = dronePosition.y - triangleSize / 2;

      console.log(`droneLeftEdge: ${droneLeftEdge}`);
      console.log(`droneRightEdge: ${droneRightEdge}`);
      console.log(`noseX: ${noseX}`);
      console.log(`noseY: ${noseY}`);
      console.log(`leftWallPosition: ${leftWallPosition}`);
      console.log(`rightWallPosition: ${rightWallPosition}`);

      // Перевірка на зіткнення з бічними стінами
      if (
        droneRightEdge >= rightWallPosition ||
        droneLeftEdge <= leftWallPosition ||
        noseX >= rightWallPosition ||
        noseX <= leftWallPosition
      ) {
        console.log("Collision detected!");
        dispatch(setGameOver(true));
        handleGameOver();
      }
    };

    checkCollision();
  }, [dronePosition, caveData, caveOffset, dispatch]);

  const handleGameOver = () => {
    const score = calculateScoreIncrement(caveSpeed, caveOffset, complexity);
    dispatch(updateLeaderboard({ name, score }));
    alert("Game Over! Please reload page");
  };

  return null;
};

export default CollisionDetector;
