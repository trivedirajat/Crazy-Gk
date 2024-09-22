import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, IconButton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import toast from "react-hot-toast";
import ConfirmDialog from "component/common/ConfirmDialog";
import {
  useGetDailyVocabQuery,
  useDeleteDailyVocabMutation,
} from "../../redux/apis/dailyvocabapis";
import { stripHtmlTags } from "utils/stripHtmlTags";
import Breadcrumbs from "component/common/Breadcrumbs";

const DailyVocab = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const { data: dailyVocabData, isLoading } = useGetDailyVocabQuery(
    {
      offset: paginationModel.page,
      limit: paginationModel.pageSize,
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }
  );

  const [deleteDailyVocab] = useDeleteDailyVocabMutation();

  const handleEdit = (id) => {
    navigate(`/editDailyVocab/${id}`);
  };

  const handleDelete = async () => {
    if (selectedId) {
      try {
        await deleteDailyVocab(selectedId).unwrap();
        toast.success("Daily vocab deleted successfully");
        setOpenDialog(false);
      } catch (error) {
        toast.error("Failed to delete the daily vocab");
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
      field: "title",
      headerName: "Title",
      flex: 1,
      renderCell: ({ row }) => (
        <Typography sx={{ color: "text.secondary" }}>
          {row.title || "-"}
        </Typography>
      ),
    },
    {
      field: "description",
      headerName: "Description",
      flex: 2,
      renderCell: ({ row }) => (
        <Typography sx={{ color: "text.secondary" }}>
          {stripHtmlTags(row.description) || "-"}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleEdit(params.row.id)}>
            <IconPencil />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => openDeleteConfirmation(params.row.id)}
          >
            <IconTrash />
          </IconButton>
        </>
      ),
    },
  ];

  const rows =
    dailyVocabData?.data.map((vocab) => ({
      id: vocab._id,
      title: vocab.title,
      description: vocab.description,
    })) || [];

  const breadcrumbItems = [
    { label: "Dashboard", link: "/dashboard" },
    { label: "Daily Vocab" },
  ];
  return (
    <Box className="page-body" sx={{ padding: 2 }}>
      <Breadcrumbs items={breadcrumbItems} />
      {/* <Typography variant="h4">All Daily Vocab</Typography> */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/adddailyvocab")}
        sx={{ marginBottom: 2 }}
      >
        Add Daily Vocab
      </Button>

      <Box sx={{ width: "100%" }}>
        <Card>
          <DataGrid
            autoHeight
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
            loading={isLoading}
            pagination
            paginationMode="server"
            rowCount={dailyVocabData?.total_data || 0}
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
        title="Remove Daily Vocab"
        content="Are you sure you want to remove this daily vocab?"
        onClose={handleCloseDialog}
        onConfirm={handleDelete}
      />
    </Box>
  );
};

export default DailyVocab;
