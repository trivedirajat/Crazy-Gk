import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, IconButton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import toast from "react-hot-toast";

import ConfirmDialog from "../../component/common/CustomDialog";
import {
  useDeleteReviewMutation,
  useGetReviewsQuery,
} from "../../redux/apis/reviewapis";
import Breadcrumbs from "component/common/Breadcrumbs";

const ReviewsDataGrid = () => {
  const navigate = useNavigate();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [selectedId, setSelectedId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const { data: reviewsData, isLoading } = useGetReviewsQuery({
    page: paginationModel.page,
    pageSize: paginationModel.pageSize,
  });

  const [deleteReview] = useDeleteReviewMutation();

  const handleEdit = (id) => {
    navigate(`/editreview/${id}`);
  };

  const handleDelete = async () => {
    if (selectedId) {
      try {
        await deleteReview(selectedId).unwrap();
        toast.success("Review deleted successfully");
        setOpenDialog(false);
      } catch (error) {
        toast.error("Failed to delete the review");
      }
    }
  };

  const openDeleteConfirmation = (id) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedId(null);
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: ({ row }) => (
        <Typography sx={{ color: "text.secondary" }}>
          {row.name || "-"}
        </Typography>
      ),
    },
    {
      field: "review",
      headerName: "Review",
      flex: 2,
      renderCell: ({ row }) => (
        <Typography sx={{ color: "text.secondary" }}>
          {row.review || "-"}
        </Typography>
      ),
    },
    {
      field: "rating",
      headerName: "Rating",
      flex: 0.5,
      renderCell: ({ row }) => (
        <Typography sx={{ color: "text.secondary" }}>
          {row.rating || "-"}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() => handleEdit(params.row._id)}
          >
            <IconPencil />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => openDeleteConfirmation(params.row._id)}
          >
            <IconTrash />
          </IconButton>
        </>
      ),
    },
  ];

  const breadcrumbItems = [
    { label: "Dashboard", link: "/dashboard" },
    { label: "Reviews" },
  ];

  return (
    <Box className="page-body" sx={{ padding: 2 }}>
      <Breadcrumbs items={breadcrumbItems} />

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/addreview")}
      >
        Add New Review
      </Button>

      <Box sx={{ width: "100%", marginTop: 3 }}>
        <Card>
          <DataGrid
            autoHeight
            rows={reviewsData?.data || []}
            getRowId={(row) => row._id}
            columns={columns}
            disableRowSelectionOnClick
            loading={isLoading}
            pagination
            paginationMode="server"
            rowCount={reviewsData?.total_data || 0}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[10, 25, 50, 100]}
            localeText={{ noRowsLabel: "No Record(s) Found" }}
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                color: "#000",
                fontWeight: "bold",
                fontSize: "16px",
              },
              "& .MuiDataGrid-columnHeader": {
                borderBottom: "2px solid #04aa50",
              },
              "& .MuiDataGrid-cell": {
                display: "flex",
                alignItems: "center",
              },
            }}
          />
        </Card>
      </Box>

      <ConfirmDialog
        open={openDialog}
        title="Remove Review"
        content="Are you sure you want to remove this review?"
        onClose={handleCloseDialog}
        onConfirm={handleDelete}
      />
    </Box>
  );
};

export default ReviewsDataGrid;
