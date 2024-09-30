import React, { useState } from "react";
import { Box, Button, Card, IconButton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate, Link } from "react-router-dom";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import toast from "react-hot-toast";
import ConfirmDialog from "component/common/ConfirmDialog";
import {
  useDeleteQuizMutation,
  useGetQuizQuery,
} from "../../redux/apis/quizapi";
import Breadcrumbs from "component/common/Breadcrumbs";

const Quiz = () => {
  const navigate = useNavigate();
  const [dialog, setDialog] = useState({
    open: false,
    id: "",
  });
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const { data: quizData = [], isLoading } = useGetQuizQuery({
    page: paginationModel.page,
    pageSize: paginationModel.pageSize,
  });

  const [deleteQuiz] = useDeleteQuizMutation();

  const handleEdit = (id) => {
    navigate(`/editQuiz/${id}`);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteQuiz(dialog.id).unwrap();
      toast.success("Quiz deleted successfully");
      setDialog({ open: false, id: "" });
    } catch (error) {
      toast.error("Failed to delete the quiz");
    }
  };

  const openDeleteConfirmation = (id) => {
    setDialog({ open: true, id });
  };

  const handleCloseDialog = () => {
    setDialog({ open: false, id: "" });
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
      field: "description",
      headerName: "Description",
      flex: 2,
      renderCell: ({ row }) => (
        <Typography sx={{ color: "text.secondary" }}>
          {row.description || "-"}
        </Typography>
      ),
    },
    {
      field: "subject",
      headerName: "Subject",
      flex: 1,
      renderCell: (params) => (
        <Typography sx={{ color: "text.secondary" }}>
          {params.row?.subject?.subject_name || "-"}
        </Typography>
      ),
    },
    {
      field: "totalMarks",
      headerName: "Total Marks",
      flex: 1,
      renderCell: ({ row }) => <div>{row.totalMarks || "-"}</div>,
    },
    {
      field: "isPublished",
      headerName: "Published",
      flex: 1,
      renderCell: (params) => (
        <Typography sx={{ color: "text.secondary" }}>
          {params.value ? "Yes" : "No"}
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
    { label: "Quiz" },
  ];

  return (
    <Box className="page-body" sx={{ padding: 2 }}>
      <Breadcrumbs items={breadcrumbItems} />

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/addnewquiz")}
      >
        Add New Quiz
      </Button>

      <Box sx={{ width: "100%", marginTop: 3 }}>
        <Card>
          <DataGrid
            autoHeight
            rows={quizData?.data || []}
            columns={columns}
            disableRowSelectionOnClick
            loading={isLoading}
            pagination
            paginationMode="server"
            rowCount={quizData?.total_data || 0}
            getRowId={(row) => row._id}
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
        open={dialog.open}
        title="Remove Quiz"
        content="Are you sure you want to remove this quiz?"
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
};

export default Quiz;
