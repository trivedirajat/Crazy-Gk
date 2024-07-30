import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiEndPoints } from 'utils/ApiEndPoints';
import { BASE_URL } from 'utils/Global';

export const fetchEBook = createAsyncThunk(
    'EBook/fetchEBook',
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(`${BASE_URL}${apiEndPoints.fetchEBook}`, data);
            if (response.status !== 200) {
                throw new Error('Failed to fetch data');
            }
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const addeBooks = createAsyncThunk(
    'EBook/addeBooks',
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(`${BASE_URL}${apiEndPoints.addEBook}`, data);
            if (response.status !== 200) {
                throw new Error('Failed to fetch data');
            }
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const deleteEBook = createAsyncThunk(
    'EBook/deleteEBook',
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(`${BASE_URL}${apiEndPoints.deleteEBook}`, data);
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
    EBook: [],
    status: 'idle',
    error: null,
    response: []
};


const EBookSlice = createSlice({
    name: 'EBook',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEBook.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEBook.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.EBook = action.payload;
            })
            .addCase(fetchEBook.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addeBooks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addeBooks.fulfilled, (state, action) => {
                state.status = 'addSucceeded';
                state.response = action.payload;
            })
            .addCase(addeBooks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteEBook.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteEBook.fulfilled, (state, action) => {
                state.status = 'deleteSucceeded';
                state.response = action.payload;
            })
            .addCase(deleteEBook.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const selectAllEBook = (state) => state.EBook.EBook;
export const getEBookStatus = (state) => state.EBook.status;
export const getEBookError = (state) => state.EBook.error;
export const addEditResponse = (state) => state.EBook.response
export const selectedEBookWithId = (state, id) => state.EBook.EBook.filter((el) =>
    el._id === id
)


export default EBookSlice.reducer;