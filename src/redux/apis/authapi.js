import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./utils/axiosBaseQuery";
import { apiEndPoints } from "../../utils/ApiEndPoints";
const AuthApi = createApi({
  reducerPath: "AuthApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["login"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${apiEndPoints.login}`,
        method: "POST",
        data,
      }),
    }),
  }),
});
export default AuthApi;
export const { useLoginMutation } = AuthApi;
