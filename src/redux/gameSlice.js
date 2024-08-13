import { createSlice } from "@reduxjs/toolkit";
import { initGame, fetchToken } from "./actions";

const initialState = {
  name: null,
  complexity: null,
  playerId: null,
  token: null,
  caveData: [],
  dronePosition: { x: 50, y: 50 },
  isGameOver: false,
  leaderboard: [],
  status: "idle", // Додано ключ status для управління статусом
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setComplexity: (state, action) => {
      state.complexity = action.payload;
    },
    setCaveData: (state, action) => {
      state.caveData = action.payload;
    },
    setDronePosition: (state, action) => {
      state.dronePosition = action.payload;
    },
    setGameOver: (state, action) => {
      state.isGameOver = action.payload;
    },
    updateLeaderboard: (state, action) => {
      state.leaderboard.push(action.payload);
      localStorage.setItem("leaderboard", JSON.stringify(state.leaderboard));
    },
    loadLeaderboard: (state) => {
      const savedScores = JSON.parse(localStorage.getItem("leaderboard")) || [];
      state.leaderboard = savedScores;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initGame.pending, (state) => {
        state.status = "loading";
      })
      .addCase(initGame.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.playerId = action.payload;
      })
      .addCase(initGame.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchToken.fulfilled, (state, action) => {
        state.token = action.payload;
      });
  },
});

export const {
  setName,
  setComplexity,
  setCaveData,
  setDronePosition,
  setGameOver,
  updateLeaderboard,
  loadLeaderboard,
} = gameSlice.actions;

export default gameSlice.reducer;
