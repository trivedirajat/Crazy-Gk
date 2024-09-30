import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./utils/axiosBaseQuery";
import { apiEndPoints } from "../../utils/ApiEndPoints";
const SubjectApi = createApi({
  reducerPath: "SubjectApi",
  tagTypes: ["Subjects"],
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getSubjects: builder.query({
      query: ({
        page = 0,
        pageSize = 10,
        subject_name = "",
        subject_id = "",
      }) => ({
        url: `${apiEndPoints.getSubject}`,
        method: "GET",
        params: {
          offset: page,
          limit: pageSize,
          subject_name,
          subject_id,
        },
      }),
      providesTags: ["Subjects"],
    }),
    getsubjectname: builder.query({
      query: () => ({
        url: `${apiEndPoints.getallsubjectname}`,
        method: "GET",
      }),
      providesTags: ["Subjects"],
    }),
    getSubjectById: builder.query({
      query: (id) => ({
        url: `${apiEndPoints.getSubjectById}/${id}`,
        method: "GET",
      }),
      providesTags: ["Subjects"],
    }),
    AddSubject: builder.mutation({
      query: (data) => ({
        url: `${apiEndPoints.addSubject}`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["Subjects"],
    }),
    deleteSubject: builder.mutation({
      query: (id) => ({
        url: `${apiEndPoints.deleteSubject}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subjects"],
    }),
    editSubject: builder.mutation({
      query: ({ data, id }) => ({
        url: `${apiEndPoints.editSubject}/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: ["Subjects"],
    }),
  }),
});
export default SubjectApi;
export const {
  useGetSubjectsQuery,
  useGetsubjectnameQuery,
  useGetSubjectByIdQuery,
  useAddSubjectMutation,
  useDeleteSubjectMutation,
  useEditSubjectMutation,
} = SubjectApi;
