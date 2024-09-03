import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";

import CustomDialog from "../../component/common/CustomDialog";
import toast from "react-hot-toast";
import {
  useDeleteQuizMutation,
  useGetQuizQuery,
} from "../../redux/apis/quizapi";

const Quiz = () => {
  const [deleteQuiz] = useDeleteQuizMutation();
  const [dialog, setDialog] = useState({
    open: false,
    id: "",
  });
  const { data: questions = [] } = useGetQuizQuery({
    id: "",
  });
  const navigatpage = useNavigate();
  const handleEdit = (id) => {
    navigatpage(`/editQuiz/${id}`);
  };

  const handleconformdelete = async () => {
    const res = deleteQuiz(dialog.id);
    toast.promise(res, {
      loading: "Deleting...",
      success: <b>Quiz deleted successfully</b>,
      error: <b>Could not delete. Try again</b>,
    });
    setDialog({ open: false, id: "" });
  };
  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "description", headerName: "Description", width: 300 },
    {
      field: "subject",
      headerName: "Subject",
      width: 200,
      renderCell: (params) => <div>{params.row?.subject?.subject_name} </div>,
    },
    { field: "totalMarks", headerName: "Total Marks", width: 150 },
    {
      field: "isPublished",
      headerName: "Published",
      width: 150,
      renderCell: (params) => <div>{params.value ? "Yes" : "No"}</div>,
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
                <h3>All Quiz</h3>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">
                      <i
                        className="fa fa-home theme-fa-icon"
                        aria-hidden="true"
                      ></i>
                    </Link>
                  </li>
                  <li className="breadcrumb-item active">All Quiz Listing</li>
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
                    onClick={() => navigatpage("/addnewquiz")}
                  >
                    Add New Quiz
                  </button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-xl-12">
                <div className="card">
                  <div className="card-header">
                    <h5>List of Quiz:</h5>
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
        title="Are you sure you want to delete this Quiz?"
        onClose={() => setDialog({ open: false, id: "" })}
        onConfirm={handleconformdelete}
        confirmText="Confirm"
        cancelText="Cancel"
        cancelButtonColor="error"
      />
    </div>
  );
};

export default Quiz;
