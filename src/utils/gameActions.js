// src/actions/gameActions.js

export const endGame = (collision) => {
  return (dispatch, getState) => {
    const { name, points } = getState().game;
    const scores = JSON.parse(localStorage.getItem("scores")) || [];
    scores.push({ name, points });
    localStorage.setItem("scores", JSON.stringify(scores));

    dispatch({
      type: "END_GAME",
      payload: collision,
    });
  };
};
