import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import {
  useDeleteQuestionsMutation,
  useGetQuestionsQuery,
} from "../../redux/apis/questionapi";
import CustomDialog from "../../component/common/CustomDialog";
import toast from "react-hot-toast";

const QuestionsTable = () => {
  const [deleteQuestions] = useDeleteQuestionsMutation();
  const [dialog, setDialog] = useState({
    open: false,
    id: "",
  });
  const { data: questions = [] } = useGetQuestionsQuery({
    id: "",
  });
  const navigatpage = useNavigate();
  const handleEdit = (id) => {
    navigatpage(`/EditQuestion/${id}`);
  };

  const handleconformdelete = async () => {
    const res = deleteQuestions(dialog.id);
    toast.promise(res, {
      loading: "Deleting...",
      success: <b>Question deleted successfully</b>,
      error: <b>Could not delete. Try again</b>,
    });
    setDialog({ open: false, id: "" });
  };
  const columns = [
    { field: "question", headerName: "Question", width: 200 },
    { field: "questionType", headerName: "Question Type", width: 180 },
    { field: "marks", headerName: "Marks", width: 100 },
    { field: "time", headerName: "Time (sec)", width: 120 },
    {
      field: "isPublished",
      headerName: "Published",
      width: 130,
      renderCell: (params) => (params.value ? "Yes" : "No"),
    },
    {
      field: "subject",
      headerName: "Subject",
      width: 150,
      renderCell: (params) => params?.row?.subject?.subject_name,
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div>
          <i
            className="fa fa-edit theme-fa-icon mr-3"
            aria-hidden="true"
            title="Edit Question"
            onClick={() => handleEdit(params.row._id)}
          ></i>

          <i
            className="fa fa-trash theme-fa-icon "
            aria-hidden="true"
            title="Delete Question"
            onClick={() => setDialog({ open: true, id: params.row._id })}
          ></i>
        </div>
      ),
    },
  ];
  return (
    <div className="page-body">
      <div className="container-fluid">
        <div className="page-header">
          <div className="row">
            <div className="col">
              <div className="page-header-left">
                <h3>All Questions</h3>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">
                      <i
                        className="fa fa-home theme-fa-icon"
                        aria-hidden="true"
                      ></i>
                    </Link>
                  </li>
                  <li className="breadcrumb-item active">
                    All Questions Listing
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-xl-12">
            <div className="row pt-3">
              <div className="col-md-6">
                <div className="form-group">
                  <button
                    className="btn btn-color"
                    onClick={() => navigatpage("/addnewquestions")}
                  >
                    Add New Question
                  </button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-xl-12">
                <div className="card">
                  <div className="card-header">
                    <h5>List of Questions:</h5>
                  </div>
                  <DataGrid
                    rows={questions?.data}
                    columns={columns}
                    pageSize={10}
                    rowSelection={false}
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    getRowId={(row) => row._id}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CustomDialog
        open={dialog.open}
        title="Are you sure you want to delete this question?"
        onClose={() => setDialog({ open: false, id: "" })}
        onConfirm={handleconformdelete}
        confirmText="Confirm"
        cancelText="Cancel"
        cancelButtonColor="error"
      />
    </div>
  );
};

export default QuestionsTable;
