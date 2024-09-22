import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./utils/axiosBaseQuery";
import { apiEndPoints } from "../../utils/ApiEndPoints";

const Questionapi = createApi({
  reducerPath: "questionApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Questions", "GetQuestions"],
  endpoints: (builder) => ({
    getQuestions: builder.query({
      query: ({ page = 0, pageSize = 10 }) => ({
        url: `${apiEndPoints.getQustions}`,
        method: "GET",
        params: {
          offset: page,
          limit: pageSize,
        },
      }),
      providesTags: ["GetQuestions"],
    }),
    getquestionsbyid: builder.query({
      query: ({ id }) => ({
        url: `${apiEndPoints.getQustions}/${id}`,
        method: "GET",
      }),
    }),
    AddQuestions: builder.mutation({
      query: (data) => ({
        url: apiEndPoints.addQuestion,
        method: "POST",
        data,
      }),
      invalidatesTags: ["GetQuestions"],
    }),
    editQuestions: builder.mutation({
      query: ({ data, id }) => ({
        url: `${apiEndPoints.editQuestion}/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: ["GetQuestions"],
    }),

    deleteQuestions: builder.mutation({
      query: (id) => ({
        url: `${apiEndPoints.deleteQuestion}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["GetQuestions"],
    }),
  }),
});

export default Questionapi;
export const {
  useGetQuestionsQuery,
  useGetquestionsbyidQuery,
  useAddQuestionsMutation,
  useEditQuestionsMutation,
  useDeleteQuestionsMutation,
} = Questionapi;
