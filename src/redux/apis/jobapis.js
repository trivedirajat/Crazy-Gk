import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./utils/axiosBaseQuery";
import { apiEndPoints } from "../../utils/ApiEndPoints";
const JobApis = createApi({
  reducerPath: "JobApis",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Job"],
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: ({ offset = 0, limit = 10 }) => ({
        url: `${apiEndPoints.getJobs}`,
        method: "GET",
        params: {
          offset,
          limit,
        },
      }),
      providesTags: ["Job"],
    }),
    getJobById: builder.query({
      query: (id) => ({
        url: `${apiEndPoints.getJobById}/${id}`,
        method: "GET",
      }),
    }),
    AddJob: builder.mutation({
      query: (data) => ({
        url: apiEndPoints.addJob,
        method: "POST",
        data,
      }),
      invalidatesTags: ["Job"],
    }),
    editJob: builder.mutation({
      query: ({ data, id }) => ({
        url: `${apiEndPoints.editJob}/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: ["Job"],
    }),
    deleteJob: builder.mutation({
      query: (id) => ({
        url: `${apiEndPoints.deleteJob}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Job"],
    }),
  }),
});
export default JobApis;
export const {
  useGetJobsQuery,
  useGetJobByIdQuery,
  useAddJobMutation,
  useEditJobMutation,
  useDeleteJobMutation,
} = JobApis;
