import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./utils/axiosBaseQuery";
import { apiEndPoints } from "../../utils/ApiEndPoints";
const VideoApi = createApi({
  reducerPath: "VideoApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Video"],
  endpoints: (builder) => ({
    getAllVideo: builder.query({
      query: ({ page = 0, pageSize = 10 }) => ({
        url: `${apiEndPoints.getAllVideo}`,
        method: "GET",
        params: {
          offset: page,
          limit: pageSize,
        },
      }),
      providesTags: ["Video"],
    }),
    getvideobyid: builder.query({
      query: (id) => ({
        url: `${apiEndPoints.getvideobyid}/${id}`,
        method: "GET",
      }),
    }),
    addVideo: builder.mutation({
      query: (data) => ({
        url: `${apiEndPoints.addVideo}`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["Video"],
    }),
    editVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `${apiEndPoints.editVideo}/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: ["Video"],
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `${apiEndPoints.deleteVideo}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Video"],
    }),
  }),
});
export default VideoApi;
export const {
  useGetAllVideoQuery,
  useGetvideobyidQuery,
  useAddVideoMutation,
  useEditVideoMutation,
  useDeleteVideoMutation,
} = VideoApi;
