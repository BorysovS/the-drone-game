import { createSlice } from "@reduxjs/toolkit";
import { initGame, fetchToken } from "./actions";

const initialState = {
  name: null,
  complexity: null,
  playerId: null,
  token: null,
  caveData: [],
  dronePosition: { x: 250, y: 20 },
  isGameOver: false,
  leaderboard: [],
  status: "idle",
  caveOffset: 0,
  caveSpeed: 0,
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
      state.caveData.push(action.payload);
    },
    setDronePosition: (state, action) => {
      state.dronePosition = action.payload;
      console.log("action.payload", action.payload);
    },
    setGameOver: (state, action) => {
      state.isGameOver = action.payload;
    },
    updateLeaderboard: (state, action) => {
      state.leaderboard.push(action.payload);
      state.leaderboard.sort((a, b) => b.score - a.score);
      localStorage.setItem("leaderboard", JSON.stringify(state.leaderboard));
    },
    loadLeaderboard: (state) => {
      const savedScores = JSON.parse(localStorage.getItem("leaderboard")) || [];
      state.leaderboard = savedScores;
    },
    setCaveOffset(state, action) {
      state.caveOffset = action.payload;
    },
    setCaveSpeed(state, action) {
      state.caveSpeed = action.payload;
    },
    updateCaveOffset(state) {
      state.caveOffset += state.caveSpeed;
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
  setCaveOffset,
  setCaveSpeed,
  updateCaveOffset,
} = gameSlice.actions;

export default gameSlice.reducer;
