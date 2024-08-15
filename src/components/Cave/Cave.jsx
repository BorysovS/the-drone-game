import React from "react";
import { useSelector } from "react-redux";

const Cave = () => {
  const caveData = useSelector((state) => state.game.caveData);
  const caveOffset = useSelector((state) => state.game.caveOffset);
  const wallHeight = 10;
  const svgWidth = 500;

  return (
    <svg
      width={svgWidth}
      height={caveData.length * wallHeight}
      viewBox={`0 ${caveOffset} ${svgWidth} ${caveData.length * wallHeight}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {caveData.map((segment, index) => {
        if (!Array.isArray(segment) || segment.length !== 2) {
          console.error("Invalid segment data:", segment);
          return null;
        }

        const [left, right] = segment;
        const yPos = index * wallHeight;

        let leftWallPosition = svgWidth / 2 + left;
        let rightWallPosition = svgWidth / 2 + right;

        leftWallPosition = Math.max(leftWallPosition, 0);
        rightWallPosition = Math.min(rightWallPosition, svgWidth);

        const leftWidth = leftWallPosition;
        const rightWidth = svgWidth - rightWallPosition;

        return (
          <React.Fragment key={index}>
            <rect
              x={0}
              y={yPos - caveOffset}
              width={leftWidth}
              height={wallHeight}
              fill="gray"
            />
            <rect
              x={rightWallPosition}
              y={yPos - caveOffset}
              width={rightWidth}
              height={wallHeight}
              fill="gray"
            />
          </React.Fragment>
        );
      })}
    </svg>
  );
};

export default Cave;
