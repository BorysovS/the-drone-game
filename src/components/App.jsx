import React from "react";
import { useSelector, useDispatch } from "react-redux";
import StartPage from "../components/StartGame/StartGame";
import Game from "./Game/Game";
import { initGame } from "../redux/actions";

const App = () => {
  const dispatch = useDispatch();
  const gameData = useSelector((state) => state.game);

  const startGame = (name, complexity) => {
    dispatch(initGame({ name, complexity }));
  };

  return (
    <div>
      {!gameData.name ? (
        <StartPage onStartGame={startGame} />
      ) : (
        <Game name={gameData.name} complexity={gameData.complexity} />
      )}
    </div>
  );
};

export default App;
