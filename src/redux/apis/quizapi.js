import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./utils/axiosBaseQuery";
import { apiEndPoints } from "../../utils/ApiEndPoints";

const Quizapi = createApi({
  reducerPath: "Quizapi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Quizapi", "GetQuiz"],
  endpoints: (builder) => ({
    getQuiz: builder.query({
      query: ({ id }) => ({
        url: `${apiEndPoints.getQuiz}`,
        method: "POST",
        data: { id },
      }),
      providesTags: ["GetQuiz"],
    }),
    getQuestionsListbySubjectid: builder.query({
      query: ({ id = "" }) => ({
        url: `${apiEndPoints.getgetQuestionsListbySubjectid}/${id}`,
        method: "GET",
      }),
    }),
    AddQuiz: builder.mutation({
      query: (data) => ({
        url: apiEndPoints.addQuiz,
        method: "POST",
        data,
      }),
      invalidatesTags: ["GetQuiz"],
    }),
    editQuiz: builder.mutation({
      query: ({ data, id }) => ({
        url: `${apiEndPoints.editQuiz}/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: ["GetQuiz"],
    }),

    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `${apiEndPoints.deleteQuiz}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["GetQuiz"],
    }),
  }),
});

export default Quizapi;
export const {
  useGetQuizQuery,
  useAddQuizMutation,
  useEditQuizMutation,
  useDeleteQuizMutation,
  useLazyGetQuestionsListbySubjectidQuery,
  useGetQuestionsListbySubjectidQuery,
} = Quizapi;
