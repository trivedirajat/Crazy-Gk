import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./utils/axiosBaseQuery";
import { apiEndPoints } from "../../utils/ApiEndPoints";
const StudyApi = createApi({
  reducerPath: "studyApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getStudymaterial: builder.query({
      query: ({ id }) => ({
        url: `${apiEndPoints.getStudyMaterialbyid}?study_id=${id}`,
        method: "GET",
      }),
    }),
    editStudy: builder.mutation({
      query: (data) => ({
        url: `${apiEndPoints.editStudyMaterial}`,
        method: "PUT",
        data,
      }),
    }),
  }),
});
export default StudyApi;
export const { useEditStudyMutation, useGetStudymaterialQuery } = StudyApi;
