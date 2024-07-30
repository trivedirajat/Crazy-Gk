import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiEndPoints } from 'utils/ApiEndPoints';
import { BASE_URL } from 'utils/Global';

export const fetchVideos = createAsyncThunk(
    'subjects/fetchVideos',
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(`${BASE_URL}${apiEndPoints.getVideos}`, data);
            if (response.status !== 200) {
                throw new Error('Failed to fetch data');
            }
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const addVideos = createAsyncThunk(
    'subjects/addVideos',
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(`${BASE_URL}${apiEndPoints.addVideo}`, data);
            if (response.status !== 200) {
                throw new Error('Failed to fetch data');
            }
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const deleteVideos = createAsyncThunk(
    'subjects/deleteVideos',
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(`${BASE_URL}${apiEndPoints.deleteVideo}`, data);
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
    videos: [],
    status: 'idle',
    error: null,
    response: []
};


const VideoSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchVideos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchVideos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.videos = action.payload;
                console.log('action.payload', action.payload);
            })
            .addCase(fetchVideos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addVideos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addVideos.fulfilled, (state, action) => {
                state.status = 'addSucceeded';
                state.response = action.payload;
                console.log('action.payload', action.payload);
            })
            .addCase(addVideos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteVideos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteVideos.fulfilled, (state, action) => {
                state.status = 'deleteSucceeded';
                state.response = action.payload;
                console.log('action.payload', action.payload);
            })
            .addCase(deleteVideos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

export const selectAllVideos = (state) => state.videos.videos;
export const getVideoStatus = (state) => state.videos.status;
export const getVideoError = (state) => state.videos.error;
export const addEditResponse = (state) => state.videos.response
export const selectedVideoWithId = (state, id) => state.videos.videos.filter((el) =>
    el._id === id
)


export default VideoSlice.reducer;