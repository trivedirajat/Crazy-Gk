import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'helper/Axios';
import { apiEndPoints } from 'utils/ApiEndPoints';
import { BASE_URL } from 'utils/Global';

export const fetchStudyMaterials = createAsyncThunk(
    'StudyMaterials/fetchStudyMaterials',
    async (data, thunkAPI) => {
        try {
            const response = await Axios.post(`${BASE_URL}${apiEndPoints.getStudyMaterial}`, data);
            if (response.status !== 200) {
                throw new Error('Failed to fetch data');
            }
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const addStudyMaterials = createAsyncThunk(
    'StudyMaterials/addStudyMaterials',
    async (data, thunkAPI) => {
        try {
            const response = await Axios.post(`${BASE_URL}${apiEndPoints.addStudyMaterial}`, data);
            if (response.status !== 200) {
                throw new Error('Failed to fetch data');
            }
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const deleteStudyMaterials = createAsyncThunk(
    'StudyMaterials/deleteStudyMaterials',
    async (data, thunkAPI) => {
        try {
            const response = await Axios.post(`${BASE_URL}${apiEndPoints.deleteStudyMaterial}`, data);
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
    StudyMaterials: [],
    status: 'idle',
    error: null,
    response: []
};


const StudyMaterialsSlice = createSlice({
    name: 'StudyMaterials',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStudyMaterials.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchStudyMaterials.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.StudyMaterials = action.payload;
                console.log('action.payload', action.payload);
            })
            .addCase(fetchStudyMaterials.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addStudyMaterials.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addStudyMaterials.fulfilled, (state, action) => {
                state.status = 'addSucceeded';
                state.response = action.payload;
                console.log('action.payload', action.payload);
            })
            .addCase(addStudyMaterials.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteStudyMaterials.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteStudyMaterials.fulfilled, (state, action) => {
                state.status = 'deleteSucceeded';
                state.response = action.payload;
                console.log('action.payload', action.payload);
            })
            .addCase(deleteStudyMaterials.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const selectAllStudyMaterials = (state) => state.StudyMaterials.StudyMaterials;
export const getStudyMaterialsStatus = (state) => state.StudyMaterials.status;
export const getStudyMaterialsError = (state) => state.StudyMaterials.error;
export const addEditResponse = (state) => state.StudyMaterials.response
export const selectedStudyMaterialsWithId = (state, id) => state.StudyMaterials.StudyMaterials.filter((el) =>
    el._id === id
)


export default StudyMaterialsSlice.reducer;