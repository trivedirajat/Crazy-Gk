import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import CustomDialog from "../../component/common/CustomDialog";
import {
  useDeleteReviewMutation,
  useGetReviewsQuery,
} from "../../redux/apis/reviewapis";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";

const ReviewsDataGrid = () => {
  const navigate = useNavigate();
  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: 10,
  });
  const [deleteReview] = useDeleteReviewMutation();
  const [dialog, setDialog] = useState({
    open: false,
    id: "",
  });

  const {
    data: reviews,
    isLoading,
    isError,
  } = useGetReviewsQuery(
    { page: paginationModel.page, limit: paginationModel.pageSize },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  if (isError) {
    toast.error("Could not fetch reviews. Try again");
    console.error("Error fetching reviews:", isError);
  }

  const handleConformDelete = async () => {
    try {
      await deleteReview(dialog.id).unwrap();
      toast.success("Review deleted successfully");
    } catch (error) {
      toast.error("Could not delete. Try again");
    }
    setDialog({ open: false, id: "" });
  };

  const handleEdit = (id) => {
    navigate(`/editreview/${id}`);
  };

  const columns = [
    { field: "name", headerName: "Name", flex: 0.1 },
    { field: "review", headerName: "Review", flex: 0.7 },
    { field: "rating", headerName: "Rating", flex: 0.1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.1,
      width: 150,
      renderCell: (params) => (
        <div>
          <i
            className="fa fa-edit theme-fa-icon mr-3"
            aria-hidden="true"
            title="Edit Review"
            onClick={() => handleEdit(params.row._id)}
          ></i>
          <i
            className="fa fa-trash theme-fa-icon"
            aria-hidden="true"
            title="Delete Review"
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
                <Typography variant="h3">All Reviews</Typography>
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
                    All Reviews Listing
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
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/addreview")}
                  >
                    Add New Review
                  </Button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-xl-12">
                <Card>
                  <CardHeader title="List of Reviews:" />
                  <CardContent>
                    <div style={{ height: 400, width: "100%" }}>
                      <DataGrid
                        rows={reviews?.reviews || []}
                        columns={columns}
                        rowCount={reviews?.total || 0} // Ensure this reflects the total rows
                        pagination
                        paginationMode="server"
                        disableRowSelectionOnClick
                        paginationModel={paginationModel}
                        pageSizeOptions={[10, 25, 50, 100]}
                        onPaginationModelChange={setPaginationModel}
                        loading={isLoading}
                        getRowId={(row) => row._id}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CustomDialog
        open={dialog.open}
        title="Are you sure you want to delete this review?"
        onClose={() => setDialog({ open: false, id: "" })}
        onConfirm={handleConformDelete}
        confirmText="Confirm"
        cancelText="Cancel"
        cancelButtonColor="error"
        content=""
      />
    </div>
  );
};

export default ReviewsDataGrid;
