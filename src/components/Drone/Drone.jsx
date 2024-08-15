import React from "react";
import { useSelector } from "react-redux";

const Drone = () => {
  const dronePosition = useSelector((state) => state.game.dronePosition);
  const triangleSize = 20;

  return (
    <svg
      width="100%"
      height="100%"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
      }}
    >
      <polygon
        points={`${dronePosition.x},${dronePosition.y} ${
          dronePosition.x - triangleSize / 2
        },${dronePosition.y - triangleSize} ${
          dronePosition.x + triangleSize / 2
        },${dronePosition.y - triangleSize}`}
        fill="green"
      />
    </svg>
  );
};

export default Drone;
