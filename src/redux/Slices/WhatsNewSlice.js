import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiEndPoints } from 'utils/ApiEndPoints';
import { BASE_URL } from 'utils/Global';

export const fetchWhatsNew = createAsyncThunk(
    'WhatsNew/fetchWhatsNew',
    async (data, thunkAPI) => {
        console.log('WhatsNew',data);
        try {
            const response = await axios.post(`${BASE_URL}${apiEndPoints.fetchWhatsNew}`, data);
            if (response.status !== 200) {
                throw new Error('Failed to fetch data');
            }
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const addWhatsNew = createAsyncThunk(
    'WhatsNew/addWhatsNew',
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(`${BASE_URL}${apiEndPoints.addWhatsNew}`, data);
            if (response.status !== 200) {
                throw new Error('Failed to fetch data');
            }
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const deleteWhatsNew = createAsyncThunk(
    'WhatsNew/deleteWhatsNew',
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(`${BASE_URL}${apiEndPoints.deleteWhatsNew}`, data);
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
    WhatsNew: [],
    status: 'idle',
    error: null,
    response: []
};


const WhatsNewSlice = createSlice({
    name: 'WhatsNew',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWhatsNew.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchWhatsNew.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.WhatsNew = action.payload;
            })
            .addCase(fetchWhatsNew.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addWhatsNew.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addWhatsNew.fulfilled, (state, action) => {
                state.status = 'addSucceeded';
                state.response = action.payload;
            })
            .addCase(addWhatsNew.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteWhatsNew.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteWhatsNew.fulfilled, (state, action) => {
                state.status = 'deleteSucceeded';
                state.response = action.payload;
            })
            .addCase(deleteWhatsNew.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const selectAllWhatsNew = (state) => state.WhatsNew.WhatsNew;
export const getWhatsNewStatus = (state) => state.WhatsNew.status;
export const getWhatsNewError = (state) => state.WhatsNew.error;
export const addEditResponse = (state) => state.WhatsNew.response
export const selectedWhatsNewWithId = (state, id) => state.WhatsNew.WhatsNew.filter((el) =>
    el._id === id
)


export default WhatsNewSlice.reducer;