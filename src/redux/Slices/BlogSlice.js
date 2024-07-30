import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiEndPoints } from 'utils/ApiEndPoints';
import { BASE_URL } from 'utils/Global';

export const fetchBlogs = createAsyncThunk(
    'Blogs/fetchBlogs',
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(`${BASE_URL}${apiEndPoints.fetchBlogs}`, data);
            if (response.status !== 200) {
                throw new Error('Failed to fetch data');
            }
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
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
export const deleteBlogs = createAsyncThunk(
    'Blogs/deleteBlogs',
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(`${BASE_URL}${apiEndPoints.deleteBlog}`, data);
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
    Blogs: [],
    status: 'idle',
    error: null,
    response: []
};


const BlogSlice = createSlice({
    name: 'Blogs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogs.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.Blogs = action.payload;
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
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
            .addCase(deleteBlogs.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteBlogs.fulfilled, (state, action) => {
                state.status = 'deleteSucceeded';
                state.response = action.payload;
            })
            .addCase(deleteBlogs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const selectAllBlogs = (state) => state.Blogs.Blogs;
export const getBlogsStatus = (state) => state.Blogs.status;
export const getBlogsError = (state) => state.Blogs.error;
export const addEditResponse = (state) => state.Blogs.response
export const selectedBlogsWithId = (state, id) => state.Blogs.Blogs.filter((el) =>
    el._id === id
)


export default BlogSlice.reducer;