import React from "react";
import { useSelector } from "react-redux";

const Cave = () => {
  const caveData = useSelector((state) => state.game.caveData);
  const wallHeight = 10; // Висота кожної секції стін
  const svgWidth = 500; // Ширина SVG контейнера

  return (
    <svg
      width={svgWidth}
      height={caveData.length * wallHeight} // Висота SVG, залежно від кількості сегментів
      viewBox={`0 0 ${svgWidth} ${caveData.length * wallHeight}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {caveData.map((segment, index) => {
        const leftWallPosition = ((segment.left + 1) / 2) * svgWidth; // Перетворюємо координати з [-1,1] на [0,500]
        const rightWallPosition = ((segment.right + 1) / 2) * svgWidth;

        return (
          <g key={index}>
            {/* Ліва стіна */}
            <rect
              x="0"
              y={index * wallHeight}
              width={leftWallPosition}
              height={wallHeight}
              fill="gray"
            />
            {/* Права стіна */}
            <rect
              x={rightWallPosition}
              y={index * wallHeight}
              width={svgWidth - rightWallPosition}
              height={wallHeight}
              fill="gray"
            />
            {/* Печера (білий простір) */}
            <rect
              x={leftWallPosition}
              y={index * wallHeight}
              width={rightWallPosition - leftWallPosition}
              height={wallHeight}
              fill="white"
            />
          </g>
        );
      })}
    </svg>
  );
};

export default Cave;
