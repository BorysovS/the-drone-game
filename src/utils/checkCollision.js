// src/utils/checkCollision.js
export const checkCollision = (droneX, droneY, caveData, wallHeight) => {
  const [leftWall, rightWall] = caveData[droneY].split(",").map(Number);

  const droneWidth = 10; // ширина дрона
  const noseX = droneX;
  const backX = droneX - droneWidth;

  if (noseX >= leftWall && noseX <= rightWall) {
    return "nose";
  } else if (backX >= leftWall && backX <= rightWall) {
    return "back";
  } else if (
    noseX < leftWall ||
    backX > rightWall ||
    backX < leftWall ||
    noseX > rightWall
  ) {
    return "side";
  }

  return null;
};
