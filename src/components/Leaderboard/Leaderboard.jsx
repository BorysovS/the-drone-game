// src/components/Leaderboard.js
import React from "react";

const Leaderboard = () => {
  const scores = JSON.parse(localStorage.getItem("scores")) || [];

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {scores.map((score, index) => (
          <li key={index}>
            {score.name}: {score.points}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
