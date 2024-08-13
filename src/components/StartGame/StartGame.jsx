import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loadLeaderboard, setComplexity, setName } from "../../redux/gameSlice";
import { initGame } from "../../redux/actions";

const StartPage = ({ onStartGame }) => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const leaderboard = useSelector((state) => state.game.leaderboard);

  useEffect(() => {
    dispatch(loadLeaderboard());
  }, [dispatch]);

  const onSubmit = (data) => {
    dispatch(setName(data.name));
    dispatch(setComplexity(data.complexity));
  };

  return (
    <div>
      <h1>Welcome to the Drone Game</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name:</label>
          <input id="name" {...register("name", { required: true })} />
        </div>
        <div>
          <label htmlFor="complexity">Complexity (0-10):</label>
          <input
            id="complexity"
            type="number"
            min="0"
            max="10"
            {...register("complexity", { required: true })}
          />
        </div>
        <button type="submit">Start Game</button>
      </form>
      <h2>Leaderboard</h2>
      <ul>
        {leaderboard.map((entry, index) => (
          <li key={index}>
            {entry.name} - {entry.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StartPage;
