import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiEndPoints } from "utils/ApiEndPoints";
import { BASE_URL } from "utils/Global";

export const fetchCureentAffairs = createAsyncThunk(
  "CureentAffairs/fetchCureentAffairs",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BASE_URL}${apiEndPoints.getCurrentAffairs}`,
        data
      );
      if (response.status !== 200) {
        throw new Error("Failed to fetch data");
      }
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const addCureentAffairs = createAsyncThunk(
  "CureentAffairs/addCureentAffairs",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BASE_URL}${apiEndPoints.addCurrentAffairs}`,
        data
      );
      if (response.status !== 200) {
        throw new Error("Failed to fetch data");
      }
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deleteCureentAffairs = createAsyncThunk(
  "CureentAffairs/deleteCureentAffairs",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BASE_URL}${apiEndPoints.deleteCurrentAffairs}`,
        data
      );
      if (response.status !== 200) {
        throw new Error("Failed to fetch data");
      }
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  CureentAffairs: [],
  status: "idle",
  error: null,
  response: [],
};

const CurrentAffairsSlice = createSlice({
  name: "CureentAffairs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCureentAffairs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCureentAffairs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.CureentAffairs = action.payload;
      })
      .addCase(fetchCureentAffairs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addCureentAffairs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCureentAffairs.fulfilled, (state, action) => {
        state.status = "addSucceeded";
        state.response = action.payload;
      })
      .addCase(addCureentAffairs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteCureentAffairs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCureentAffairs.fulfilled, (state, action) => {
        state.status = "deleteSucceeded";
        state.response = action.payload;
      })
      .addCase(deleteCureentAffairs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllCurrentAffairs = (state) =>
  state.CureentAffairs?.CureentAffairs;
export const getCurrentAffairsStatus = (state) => state.CureentAffairs.status;
export const getCurrentAffairsError = (state) => state.CureentAffairs.error;
export const addEditResponse = (state) => state.CureentAffairs.response;
export const selectedCurrentAffairsWithId = (state, id) =>
  state.CureentAffairs.CureentAffairs.filter(
    (el) => el._id === id
  );

export default CurrentAffairsSlice.reducer;
