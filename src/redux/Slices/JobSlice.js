import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiEndPoints } from 'utils/ApiEndPoints';
import { BASE_URL } from 'utils/Global';

export const fetchJobs = createAsyncThunk(
    'Jobs/fetchJobs',
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(`${BASE_URL}${apiEndPoints.fetchJob}`, data);
            if (response.status !== 200) {
                throw new Error('Failed to fetch data');
            }
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const addJobs = createAsyncThunk(
    'Jobs/addJobs',
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(`${BASE_URL}${apiEndPoints.addJob}`, data);
            if (response.status !== 200) {
                throw new Error('Failed to fetch data');
            }
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const deleteJobs = createAsyncThunk(
    'Jobs/deleteJobs',
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(`${BASE_URL}${apiEndPoints.deleteJob}`, data);
            if (response.status !== 200) {
                throw new Error('Failed to fetch data');
            }
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);



const initialState = {
    Jobs: [],
    status: 'idle',
    error: null,
    response: []
};


const JobsSlice = createSlice({
    name: 'Jobs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobs.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.Jobs = action.payload;
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addJobs.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addJobs.fulfilled, (state, action) => {
                state.status = 'addSucceeded';
                state.response = action.payload;
            })
            .addCase(addJobs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteJobs.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteJobs.fulfilled, (state, action) => {
                state.status = 'deleteSucceeded';
                state.response = action.payload;
            })
            .addCase(deleteJobs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const selectAllJobs = (state) => state.Jobs.Jobs;
export const getJobsStatus = (state) => state.Jobs.status;
export const getJobsError = (state) => state.Jobs.error;
export const addEditResponse = (state) => state.Jobs.response
export const selectedJobsWithId = (state, id) => state.Jobs.Jobs.filter((el) =>
    el._id === id
)


export default JobsSlice.reducer;