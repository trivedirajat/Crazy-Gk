import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./Reducers";
import StudyApi from "./apis/studyapis";
import Questionapi from "./apis/questionapi";
import SubjecApi from "./apis/subjectapi";
import Quizapi from "./apis/quizapi";
import ReviewApi from "./apis/reviewapis";
import AuthApi from "./apis/authapi";
import UserApi from "./apis/userapi";
import VideoApi from "./apis/videoapi";
import CurrentAffairsApi from "./apis/currentaffairsapi";
import BlogApi from "./apis/blogapis";
import WhatsNewApi from "./apis/whatsnewapis";
import EbooksApis from "./apis/ebooksapis";
import JobApis from "./apis/jobapis";
import DailyVocabApis from "./apis/dailyvocabapis";

const store = configureStore({
  reducer: {
    ...rootReducer,
    [StudyApi.reducerPath]: StudyApi.reducer,
    [SubjecApi.reducerPath]: SubjecApi.reducer,
    [Questionapi.reducerPath]: Questionapi.reducer,
    [Quizapi.reducerPath]: Quizapi.reducer,
    [ReviewApi.reducerPath]: ReviewApi.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
    [VideoApi.reducerPath]: VideoApi.reducer,
    [CurrentAffairsApi.reducerPath]: CurrentAffairsApi.reducer,
    [BlogApi.reducerPath]: BlogApi.reducer,
    [WhatsNewApi.reducerPath]: WhatsNewApi.reducer,
    [EbooksApis.reducerPath]: EbooksApis.reducer,
    [JobApis.reducerPath]: JobApis.reducer,
    [DailyVocabApis.reducerPath]: DailyVocabApis.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(StudyApi.middleware)
      .concat(SubjecApi.middleware)
      .concat(Questionapi.middleware)
      .concat(Quizapi.middleware)
      .concat(ReviewApi.middleware)
      .concat(AuthApi.middleware)
      .concat(UserApi.middleware)
      .concat(VideoApi.middleware)
      .concat(CurrentAffairsApi.middleware)
      .concat(BlogApi.middleware)
      .concat(WhatsNewApi.middleware)
      .concat(EbooksApis.middleware)
      .concat(JobApis.middleware)
      .concat(DailyVocabApis.middleware),
});

export default store;
