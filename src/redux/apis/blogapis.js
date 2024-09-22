import { createApi } from "@reduxjs/toolkit/query/react";
import { apiEndPoints } from "utils/ApiEndPoints";
import axiosBaseQuery from "./utils/axiosBaseQuery";

export const BlogApi = createApi({
  reducerPath: "BlogApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Blog"],
  endpoints: (builder) => ({
    getBlog: builder.query({
      query: ({ page = 0, pageSize = 10 }) => ({
        url: `${apiEndPoints.getBlog}`,
        params: {
          offset: page,
          limit: pageSize,
        },
      }),
      providesTags: ["Blog"],
    }),
    getBlogById: builder.query({
      query: (id) => ({
        url: `${apiEndPoints.getBlogById}/${id}`,
        method: "GET",
      }),
    }),
    addBlog: builder.mutation({
      query: (data) => ({
        url: `${apiEndPoints.addBlog}`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["Blog"],
    }),
    editBlog: builder.mutation({
      query: ({ id, data }) => ({
        url: `${apiEndPoints.editBlog}/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: ["Blog"],
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `${apiEndPoints.deleteBlog}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog"],
    }),
  }),
});
export default BlogApi;
export const {
  useGetBlogQuery,
  useGetBlogByIdQuery,
  useAddBlogMutation,
  useEditBlogMutation,
  useDeleteBlogMutation,
} = BlogApi;
