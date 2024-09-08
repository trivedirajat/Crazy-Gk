import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./Reducers";
import StudyApi from "./apis/studyapis";
import Questionapi from "./apis/questionapi";
import SubjecApi from "./apis/subjectapi";
import Quizapi from "./apis/quizapi";
import ReviewApi from "./apis/reviewapis";

const store = configureStore({
  reducer: {
    ...rootReducer,
    [StudyApi.reducerPath]: StudyApi.reducer,
    [SubjecApi.reducerPath]: SubjecApi.reducer,
    [Questionapi.reducerPath]: Questionapi.reducer,
    [Quizapi.reducerPath]: Quizapi.reducer,
    [ReviewApi.reducerPath]: ReviewApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(StudyApi.middleware)
      .concat(SubjecApi.middleware)
      .concat(Questionapi.middleware)
      .concat(Quizapi.middleware)
      .concat(ReviewApi.middleware),
});

export default store;
