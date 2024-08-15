import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://cave-drone-server.shtoa.xyz";

export const initGame = createAsyncThunk(
  "game/initGame",
  async ({ name, complexity }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/init`, {
        name,
        complexity,
      });
      return response.data.id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchToken = createAsyncThunk(
  "game/fetchToken",
  async (playerId, { rejectWithValue }) => {
    try {
      const tokenParts = await Promise.all([
        axios.get(`${BASE_URL}/token/1`, { params: { id: playerId } }),
        axios.get(`${BASE_URL}/token/2`, { params: { id: playerId } }),
        axios.get(`${BASE_URL}/token/3`, { params: { id: playerId } }),
        axios.get(`${BASE_URL}/token/4`, { params: { id: playerId } }),
      ]);

      const token = tokenParts.map((response) => response.data.chunk).join("");
      return token;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
