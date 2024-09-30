import { createApi } from "@reduxjs/toolkit/query/react";
import { apiEndPoints } from "utils/ApiEndPoints";
import axiosBaseQuery from "./utils/axiosBaseQuery";

export const CurrentAffairsApi = createApi({
  reducerPath: "CurrentAffairsApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["currentaffairs"],
  endpoints: (builder) => ({
    getcurrentaffairs: builder.query({
      query: ({ page = 0, pageSize = 10 }) => ({
        url: `${apiEndPoints.getCurrentAffairs}`,
        params: {
          offset: page,
          limit: pageSize,
        },
      }),
      providesTags: ["currentaffairs"],
    }),
    getcurrentaffairsbyid: builder.query({
      query: (id) => ({
        url: `${apiEndPoints.getCurrentAffairsById}/${id}`,
        method: "GET",
      }),
    }),
    addcurrentaffairs: builder.mutation({
      query: (data) => ({
        url: `${apiEndPoints.addCurrentAffairs}`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["currentaffairs"],
    }),
    editcurrentaffairs: builder.mutation({
      query: ({ id, data }) => ({
        url: `${apiEndPoints.editCurrentAffairs}/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: ["currentaffairs"],
    }),
    deletecurrentaffairs: builder.mutation({
      query: (id) => ({
        url: `${apiEndPoints.deleteCurrentAffairs}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["currentaffairs"],
    }),
  }),
});
export default CurrentAffairsApi;
export const {
  useGetcurrentaffairsQuery,
  useGetcurrentaffairsbyidQuery,
  useAddcurrentaffairsMutation,
  useEditcurrentaffairsMutation,
  useDeletecurrentaffairsMutation,
} = CurrentAffairsApi;
