import { createApi } from "@reduxjs/toolkit/query/react";
import { apiEndPoints } from "utils/ApiEndPoints";
import axiosBaseQuery from "./utils/axiosBaseQuery";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ page, limit }) => ({
        url: `${apiEndPoints.getUser}`,
        params: { page, limit },
      }),
      providesTags: ["Users"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${apiEndPoints.deleteUser}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});
export default userApi;
export const { useGetUsersQuery, useDeleteUserMutation } = userApi;
