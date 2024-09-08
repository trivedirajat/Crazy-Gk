import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./utils/axiosBaseQuery";
import { apiEndPoints } from "../../utils/ApiEndPoints";
const ReviewApi = createApi({
  reducerPath: "reviewapis",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Reviews"],
  endpoints: (builder) => ({
    getReviewById: builder.query({
      query: (id) => ({
        url: `${apiEndPoints.getreviewnyid}?review_id=${id}`,
        method: "GET",
      }),
      providesTags: ["Reviews"],
    }),
    getReviews: builder.query({
      query: (params) => ({
        url: `${apiEndPoints.getReviews}`,
        method: "GET",
        params,
      }),
      providesTags: ["Reviews"],
    }),
    addReview: builder.mutation({
      query: (data) => ({
        url: `${apiEndPoints.addReview}`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["Reviews"],
    }),
    editReview: builder.mutation({
      query: ({ id, reviewData }) => ({
        url: `${apiEndPoints.editReview}/${id}`,
        method: "PUT",
        data: reviewData,
      }),
      invalidatesTags: ["Reviews"],
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `${apiEndPoints.deleteReview}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reviews"],
    }),
  }),
});
export default ReviewApi;
export const {
  useGetReviewsQuery,
  useGetReviewByIdQuery,
  useAddReviewMutation,
  useEditReviewMutation,
  useDeleteReviewMutation,
} = ReviewApi;
