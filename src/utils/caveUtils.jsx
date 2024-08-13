export const renderCave = (caveData) => {
  const [leftWall, rightWall] = caveData;

  return (
    <>
      <rect x="0" y="0" width={leftWall} height="100%" fill="gray" />
      <rect
        x={rightWall}
        y="0"
        width={100 - rightWall}
        height="100%"
        fill="gray"
      />
    </>
  );
};
