import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './Reducers';


const reducers = combineReducers(rootReducer)

const store = configureStore({
  reducer: reducers,
});

export default store;