import { createApi } from "@reduxjs/toolkit/query/react";
import { apiEndPoints } from "utils/ApiEndPoints";
import axiosBaseQuery from "./utils/axiosBaseQuery";

export const EbooksApis = createApi({
  reducerPath: "EbooksApis",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["ebooks"],
  endpoints: (builder) => ({
    getebooks: builder.query({
      query: ({ offset = 0, limit = 10 }) => ({
        url: `${apiEndPoints.getebooks}`,
        method: "GET",
        params: {
          offset,
          limit,
        },
      }),
      providesTags: ["ebooks"],
    }),
    getebooksbyid: builder.query({
      query: (id) => ({
        url: `${apiEndPoints.getebooksbyid}/${id}`,
        method: "GET",
      }),
    }),
    Addebooks: builder.mutation({
      query: (data) => ({
        url: apiEndPoints.Addebooks,
        method: "POST",
        data,
      }),
      invalidatesTags: ["ebooks"],
    }),
    editebooks: builder.mutation({
      query: ({ data, id }) => ({
        url: `${apiEndPoints.editebooks}/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: ["ebooks"],
    }),
    deleteebooks: builder.mutation({
      query: (id) => ({
        url: `${apiEndPoints.deleteEBook}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ebooks"],
    }),
  }),
});
export default EbooksApis;
export const {
  useGetebooksQuery,
  useGetebooksbyidQuery,
  useAddebooksMutation,
  useEditebooksMutation,
  useDeleteebooksMutation,
} = EbooksApis;
