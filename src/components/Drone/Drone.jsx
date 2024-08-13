import React from "react";

const Drone = ({ position }) => {
  return (
    <polygon
      points={`${position.x},${position.y} ${position.x - 5},${
        position.y + 10
      } ${position.x + 5},${position.y + 10}`}
      fill="green"
    />
  );
};

export default Drone;
