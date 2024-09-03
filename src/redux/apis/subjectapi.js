import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./utils/axiosBaseQuery";
import { apiEndPoints } from "../../utils/ApiEndPoints";
const SubjectApi = createApi({
  reducerPath: "SubjectApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getSubjects: builder.query({
      query: () => ({
        url: `${apiEndPoints.getSubject}`,
        method: "POST",
      }),
    }),
  }),
});
export default SubjectApi;
export const { useGetSubjectsQuery } = SubjectApi;
