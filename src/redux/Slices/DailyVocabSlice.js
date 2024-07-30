// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { apiEndPoints } from 'utils/ApiEndPoints';
// import { BASE_URL } from 'utils/Global';

// export const fetchDailyVocabs = createAsyncThunk(
//     'DailyVocabs/fetchDailyVocabs',
//     async (data, thunkAPI) => {
//         try {
//             const response = await axios.post(`${BASE_URL}${apiEndPoints.fetchDailyVocab}`, data);
//             if (response.status !== 200) {
//                 throw new Error('Failed to fetch data');
//             }
//             return response.data.data;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.message);
//         }
//     }
// );
// export const addDailyVocabs = createAsyncThunk(
//     'DailyVocabs/addDailyVocabs',
//     async (data, thunkAPI) => {
//         try {
//             const response = await axios.post(`${BASE_URL}${apiEndPoints.addDailyVocab}`, data);
//             if (response.status !== 200) {
//                 throw new Error('Failed to fetch data');
//             }
//             return response.data.data;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.message);
//         }
//     }
// );
// export const deleteDailyVocabs = createAsyncThunk(
//     'DailyVocabs/deleteDailyVocabs',
//     async (data, thunkAPI) => {
//         try {
//             const response = await axios.post(`${BASE_URL}${apiEndPoints.deleteDailyVocab}`, data);
//             if (response.status !== 200) {
//                 throw new Error('Failed to fetch data');
//             }
//             return response.data.data;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.message);
//         }
//     }
// );



// const initialState = {
//     DailyVocabs: [],
//     status: 'idle',
//     error: null,
//     response: []
// };

// const DailyVocabsSlice = createSlice({
//     name: 'DailyVocabs',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchDailyVocabs.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(fetchDailyVocabs.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.DailyVocabs = action.payload;
//             })
//             .addCase(fetchDailyVocabs.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.error.message;
//             })
//             .addCase(addDailyVocabs.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(addDailyVocabs.fulfilled, (state, action) => {
//                 state.status = 'addSucceeded';
//                 state.response = action.payload;
//             })
//             .addCase(addDailyVocabs.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.error.message;
//             })
//             .addCase(deleteDailyVocabs.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(deleteDailyVocabs.fulfilled, (state, action) => {
//                 state.status = 'deleteSucceeded';
//                 state.response = action.payload;
//             })
//             .addCase(deleteDailyVocabs.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.error.message;
//             });
//     },
// });

// export const selectAllDailyVocabs = (state) => state.DailyVocabs.DailyVocabs;
// export const getDailyVocabsStatus = (state) => state.DailyVocabs.status;
// export const getDailyVocabsError = (state) => state.DailyVocabs.error;
// export const addEditResponse = (state) => state.DailyVocabs.response
// export const selectedDailyVocabsWithId = (state, id) => state.DailyVocabs.DailyVocabs.filter((el) =>
//     el._id === id
// )


// export default DailyVocabsSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiEndPoints } from 'utils/ApiEndPoints';
import { BASE_URL } from 'utils/Global';

const ROCKET_URL = 'https://api.spacexdata.com/v3/subjects';

export const fetchDailyVocabs = createAsyncThunk(
    'subjects/fetchSubjects',
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(`${BASE_URL}${apiEndPoints.fetchDailyVocab}`, data);
            if (response.status !== 200) {
                throw new Error('Failed to fetch data');
            }
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const addDailyVocabs = createAsyncThunk(
    'subjects/addSubjects',
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(`${BASE_URL}${apiEndPoints.addDailyVocab}`, data);
            if (response.status !== 200) {
                throw new Error('Failed to fetch data');
            }
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const deleteDailyVocabs = createAsyncThunk(
    'subjects/deleteSubjects',
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(`${BASE_URL}${apiEndPoints.deleteDailyVocab}`, data);
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
    DailyVocabs: [],
    status: 'idle',
    error: null,
    response: []
};


const DailyVocabsSlice = createSlice({
    name: 'DailyVocabs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDailyVocabs.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDailyVocabs.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.DailyVocabs = action.payload;
                console.log('action.payload', action.payload);
            })
            .addCase(fetchDailyVocabs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addDailyVocabs.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addDailyVocabs.fulfilled, (state, action) => {
                state.status = 'addSucceeded';
                state.response = action.payload;
                console.log('action.payload', action.payload);
            })
            .addCase(addDailyVocabs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteDailyVocabs.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteDailyVocabs.fulfilled, (state, action) => {
                state.status = 'deleteSucceeded';
                state.response = action.payload;
                console.log('action.payload', action.payload);
            })
            .addCase(deleteDailyVocabs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const selectAllDailyVocabs = (state) => state.DailyVocabs.DailyVocabs;
export const getDailyVocabsStatus = (state) => state.DailyVocabs.status;
export const getDailyVocabsError = (state) => state.DailyVocabs.error;
export const addEditResponse = (state) => state.DailyVocabs.response
export const selectedDailyVocabsWithId = (state, id) => state.DailyVocabs.DailyVocabs.filter((el) =>
    el._id === id
)


export default DailyVocabsSlice.reducer;