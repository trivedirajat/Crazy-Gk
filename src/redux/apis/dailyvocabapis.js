import { createApi } from "@reduxjs/toolkit/query/react";
import { apiEndPoints } from "utils/ApiEndPoints";
import axiosBaseQuery from "./utils/axiosBaseQuery";

export const DailyVocabApis = createApi({
  reducerPath: "DailyVocabApis",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["dailyvocab"],
  endpoints: (builder) => ({
    getDailyVocab: builder.query({
      query: ({ offset = 0, limit = 10 }) => ({
        url: `${apiEndPoints.getDailyVocab}`,
        method: "GET",
        params: {
          offset,
          limit,
        },
      }),
      providesTags: ["dailyvocab"],
    }),
    getDailyVocabById: builder.query({
      query: (id) => ({
        url: `${apiEndPoints.getDailyVocabById}/${id}`,
        method: "GET",
      }),
    }),
    AddDailyVocab: builder.mutation({
      query: (data) => ({
        url: apiEndPoints.addDailyVocab,
        method: "POST",
        data,
      }),
      invalidatesTags: ["dailyvocab"],
    }),
    editDailyVocab: builder.mutation({
      query: ({ data, id }) => ({
        url: `${apiEndPoints.editDailyVocab}/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: ["dailyvocab"],
    }),
    deleteDailyVocab: builder.mutation({
      query: (id) => ({
        url: `${apiEndPoints.deleteDailyVocab}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["dailyvocab"],
    }),
  }),
});
export default DailyVocabApis;
export const {
  useGetDailyVocabQuery,
  useGetDailyVocabByIdQuery,
  useAddDailyVocabMutation,
  useEditDailyVocabMutation,
  useDeleteDailyVocabMutation,
} = DailyVocabApis;
