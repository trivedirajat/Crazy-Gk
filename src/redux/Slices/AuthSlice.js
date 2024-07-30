import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiEndPoints } from 'utils/ApiEndPoints';
import { BASE_URL } from 'utils/Global';


export const addBlogs = createAsyncThunk(
    'Blogs/addBlogs',
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(`${BASE_URL}${apiEndPoints.addBlog}`, data);
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
    isValidate: false,
    status: 'idle',
    error: null,
    response: []
};


const AuthSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        checkLogin(state, action) {
            state.isValidate = true
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addBlogs.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addBlogs.fulfilled, (state, action) => {
                state.status = 'addSucceeded';
                state.response = action.payload;
            })
            .addCase(addBlogs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

export const selectValidate = (state) => state.auth.isValidate;
export const {checkLogin} = AuthSlice.actions

export default AuthSlice.reducer;