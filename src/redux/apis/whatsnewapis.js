import { createApi } from "@reduxjs/toolkit/query/react";
import { apiEndPoints } from "utils/ApiEndPoints";
import axiosBaseQuery from "./utils/axiosBaseQuery";

export const WhatsNewApi = createApi({
  reducerPath: "WhatsNewApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["WhatsNewApi"],
  endpoints: (builder) => ({
    getWhatsNew: builder.query({
      query: () => ({
        url: `${apiEndPoints.getWhatsNew}`,
        method: "GET",
      }),
      providesTags: ["WhatsNewApi"],
    }),
    getWhatsNewById: builder.query({
      query: (id) => ({
        url: `${apiEndPoints.getWhatsNewById}/${id}`,
        method: "GET",
      }),
    }),
    AddWhatsNew: builder.mutation({
      query: (data) => ({
        url: apiEndPoints.addWhatsNew,
        method: "POST",
        data,
      }),
      invalidatesTags: ["WhatsNewApi"],
    }),
    editWhatsNew: builder.mutation({
      query: ({ data, id }) => ({
        url: `${apiEndPoints.editWhatsNew}/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: ["WhatsNewApi"],
    }),
    deleteWhatsNew: builder.mutation({
      query: (id) => ({
        url: `${apiEndPoints.deleteWhatsNew}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["WhatsNewApi"],
    }),
  }),
});
export default WhatsNewApi;
export const {
  useGetWhatsNewQuery,
  useGetWhatsNewByIdQuery,
  useAddWhatsNewMutation,
  useEditWhatsNewMutation,
  useDeleteWhatsNewMutation,
} = WhatsNewApi;
