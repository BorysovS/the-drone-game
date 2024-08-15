import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDronePosition, setCaveSpeed } from "../redux/gameSlice";

const Controls = () => {
  const dispatch = useDispatch();
  const dronePosition = useSelector((state) => state.game.dronePosition);
  const caveSpeed = useSelector((state) => state.game.caveSpeed);
  const isGameOver = useSelector((state) => state.game.isGameOver);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isGameOver) {
        const { x } = dronePosition;
        if (e.key === "ArrowLeft")
          dispatch(setDronePosition({ x: x - 1, y: dronePosition.y }));
        if (e.key === "ArrowRight")
          dispatch(setDronePosition({ x: x + 1, y: dronePosition.y }));
        if (e.key === "ArrowDown") dispatch(setCaveSpeed(caveSpeed + 1));
        if (e.key === "ArrowUp" && caveSpeed > 0)
          dispatch(setCaveSpeed(caveSpeed - 1));
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [dronePosition, isGameOver, dispatch, caveSpeed]);

  return null;
};

export default Controls;
