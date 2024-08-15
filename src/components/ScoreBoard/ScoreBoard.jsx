import React from "react";
import { useSelector } from "react-redux";
import { calculateScoreIncrement } from "../../utils/calculateScore";

const Scoreboard = () => {
  const { dronePosition, caveOffset, complexity, caveSpeed } = useSelector(
    (state) => state.game
  );

  let scoreMultiplier = calculateScoreIncrement(
    caveSpeed,
    caveOffset,
    complexity
  );

  return (
    <div
      style={{
        top: 10,
        right: 10,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        color: "#fff",
        padding: "10px",
        borderRadius: "5px",
        fontFamily: "Arial, sans-serif",
        position: "absolute",
      }}
    >
      <p>Score: {scoreMultiplier}</p>
      <p>Vertical Speed: {caveSpeed}</p>
      <p>Horizontal Speed: {dronePosition.x - 250}</p>
      <p>Complexity: {complexity}</p>
    </div>
  );
};

export default Scoreboard;
