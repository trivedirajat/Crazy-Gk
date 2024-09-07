import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiEndPoints } from "utils/ApiEndPoints";
import { BASE_URL } from "utils/Global";

const ROCKET_URL = "https://api.spacexdata.com/v3/subjects";

export const fetchSubjects = createAsyncThunk(
  "subjects/fetchSubjects",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BASE_URL}${apiEndPoints.getSubject}`,
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
export const addSubjects = createAsyncThunk(
  "subjects/addSubjects",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BASE_URL}${apiEndPoints.addSubject}`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
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
export const deleteSubjects = createAsyncThunk(
  "subjects/deleteSubjects",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BASE_URL}${apiEndPoints.deleteSubject}`,
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
  subjects: [],
  status: "idle",
  error: null,
  response: [],
};

const subjectSlice = createSlice({
  name: "subjects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.subjects = action.payload;
        console.log("action.payload", action.payload);
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addSubjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addSubjects.fulfilled, (state, action) => {
        state.status = "addSucceeded";
        state.response = action.payload;
        console.log("action.payload", action.payload);
      })
      .addCase(addSubjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteSubjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteSubjects.fulfilled, (state, action) => {
        state.status = "deleteSucceeded";
        state.response = action.payload;
      })
      .addCase(deleteSubjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllsubject = (state) => state.subjects.subjects;
export const getsubjectStatus = (state) => state.subjects.status;
export const getsubjectError = (state) => state.subjects.error;
export const addEditResponse = (state) => state.subjects.response;
export const selectedSubjectWithId = (state, id) =>
  state.subjects.subjects.filter((el) => el._id === id);

export default subjectSlice.reducer;
