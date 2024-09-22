import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'helper/Axios';
import { apiEndPoints } from 'utils/ApiEndPoints';
import { BASE_URL } from 'utils/Global';

const ROCKET_URL = 'https://api.spacexdata.com/v3/subjects';

export const fetchReviews = createAsyncThunk(
    'reviews/fetchReviews',
    async (data, thunkAPI) => {
        try {
            const response = await Axios.post(`${BASE_URL}${apiEndPoints.fetchReview}`, data);
            if (response.status !== 200) {
                throw new Error('Failed to fetch data');
            }
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const addReviews = createAsyncThunk(
    'reviews/addreviews',
    async (data, thunkAPI) => {
        try {
            const response = await Axios.post(`${BASE_URL}${apiEndPoints.addReview}`, data);
            if (response.status !== 200) {
                throw new Error('Failed to fetch data');
            }
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const deleteReviews = createAsyncThunk(
    'reviews/deletereviews',
    async (data, thunkAPI) => {
        try {
            const response = await Axios.post(`${BASE_URL}${apiEndPoints.deleteReview}`, data);
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
    reviews: [],
    status: 'idle',
    error: null,
    response: []
};


const reviewSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.reviews = action.payload;
                console.log('action.payload', action.payload);
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addReviews.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addReviews.fulfilled, (state, action) => {
                state.status = 'addSucceeded';
                state.response = action.payload;
                console.log('action.payload', action.payload);
            })
            .addCase(addReviews.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteReviews.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteReviews.fulfilled, (state, action) => {
                state.status = 'deleteSucceeded';
                state.response = action.payload;
                console.log('action.payload', action.payload);
            })
            .addCase(deleteReviews.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const selectAllreviews = (state) => state.reviews.reviews;
export const getreviewStatus = (state) => state.reviews.status;
export const getreviewError = (state) => state.reviews.error;
export const addEditResponse = (state) => state.reviews.response
export const selectedreviewWithId = (state, id) => state.reviews.reviews.filter((el) =>
    el._id === id
)


export default reviewSlice.reducer;