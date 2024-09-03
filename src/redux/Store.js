import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./Reducers";
import StudyApi from "./apis/studyapis";

const store = configureStore({
  reducer: { ...rootReducer, [StudyApi.reducerPath]: StudyApi.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(StudyApi.middleware),
});

export default store;
