import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import toast from "react-hot-toast";

import Breadcrumbs from "component/common/Breadcrumbs";
import CustomDialog from "../../component/common/CustomDialog";
import {
  useDeleteQuestionsMutation,
  useGetQuestionsQuery,
} from "../../redux/apis/questionapi";

const QuestionsTable = () => {
  const navigate = useNavigate();
  const [dialog, setDialog] = useState({ open: false, id: "" });
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const { data: questionsData, isLoading } = useGetQuestionsQuery({
    page: paginationModel.page,
    pageSize: paginationModel.pageSize,
  });

  const [deleteQuestions] = useDeleteQuestionsMutation();

  const handleEdit = (id) => {
    navigate(`/EditQuestion/${id}`);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteQuestions(dialog.id).unwrap();
      toast.success("Question deleted successfully");
    } catch (error) {
      toast.error("Could not delete. Try again");
    }
    setDialog({ open: false, id: "" });
  };

  const openDeleteConfirmation = (id) => {
    setDialog({ open: true, id });
  };

  const breadcrumbItems = [
    { label: "Dashboard", link: "/dashboard" },
    { label: "All Questions" },
  ];

  const columns = [
    { field: "question", headerName: "Question", flex: 1 },
    { field: "questionType", headerName: "Question Type", flex: 1 },
    { field: "marks", headerName: "Marks", flex: 1 },
    { field: "time", headerName: "Time (sec)", flex: 1 },
    {
      field: "isPublished",
      headerName: "Published",
      flex: 1,
      renderCell: (params) => (params.value ? "Yes" : "No"),
    },
    {
      field: "subject",
      headerName: "Subject",
      flex: 1,
      renderCell: (params) => params.row.subject?.subject_name || "-",
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

  return (
    <Box className="page-body" sx={{ padding: 2 }}>
      {/* Breadcrumbs Section */}
      <Breadcrumbs items={breadcrumbItems} />

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/addnewquestions")}
      >
        Add New Question
      </Button>

      <Box sx={{ width: "100%", marginTop: 3 }}>
        <Card>
          <DataGrid
            autoHeight
            rows={questionsData?.data || []}
            getRowId={(row) => row._id}
            columns={columns}
            pagination
            paginationMode="server"
            rowCount={questionsData?.total_data || 0}
            paginationModel={paginationModel}
            pageSizeOptions={[10, 25, 50, 100]}
            onPaginationModelChange={setPaginationModel}
            loading={isLoading}
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
            }}
          />
        </Card>
      </Box>

      <CustomDialog
        open={dialog.open}
        title="Are you sure you want to delete this question?"
        onClose={() => setDialog({ open: false, id: "" })}
        onConfirm={handleConfirmDelete}
        confirmText="Confirm"
        cancelText="Cancel"
        cancelButtonColor="error"
      />
    </Box>
  );
};

export default QuestionsTable;
