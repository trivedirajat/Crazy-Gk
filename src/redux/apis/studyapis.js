import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./utils/axiosBaseQuery";
import { apiEndPoints } from "../../utils/ApiEndPoints";
const StudyApi = createApi({
  reducerPath: "studyApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Study"],
  endpoints: (builder) => ({
    addStudy: builder.mutation({
      query: (data) => ({
        url: `${apiEndPoints.addStudyMaterial}`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["Study"],
    }),
    getStudy: builder.query({
      query: ({
        page = 0,
        pageSize = 10,
        subject_name = "",
        subject_id = "",
      }) => ({
        url: `${apiEndPoints.getallstudyMaterial}`,
        method: "GET",
        params: {
          offset: page,
          limit: pageSize,
          subject_name,
          subject_id,
        },
      }),
      providesTags: ["Study"],
    }),
    getStudyMaterialbyid: builder.query({
      query: (id) => ({
        url: `${apiEndPoints.getStudyMaterialbyid}/${id}`,
        method: "GET",
      }),
    }),
    editStudy: builder.mutation({
      query: ({ id, data }) => ({
        url: `${apiEndPoints.editStudyMaterial}/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: ["Study"],
    }),
    deleteStudy: builder.mutation({
      query: (id) => ({
        url: `${apiEndPoints.deleteStudyMaterial}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Study"],
    }),
  }),
});
export default StudyApi;
export const {
  useEditStudyMutation,
  useGetStudyMaterialbyidQuery,
  useAddStudyMutation,
  useGetStudyQuery,
  useDeleteStudyMutation,
} = StudyApi;
