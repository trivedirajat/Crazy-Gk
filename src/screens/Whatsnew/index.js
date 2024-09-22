import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, IconButton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import toast from "react-hot-toast";
import ConfirmDialog from "component/common/ConfirmDialog";
import { stripHtmlTags } from "utils/stripHtmlTags";
import {
  useDeleteWhatsNewMutation,
  useGetWhatsNewQuery,
} from "../../redux/apis/whatsnewapis";
import Breadcrumbs from "component/common/Breadcrumbs";

const WhatsNew = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [openDialog, setOpenDialog] = useState(false);

  const { data: whatsNewData, isLoading } = useGetWhatsNewQuery({
    page: paginationModel.page,
    pageSize: paginationModel.pageSize,
  });

  const [deleteWhatsNew] = useDeleteWhatsNewMutation();

  const handleEdit = (id) => {
    navigate(`/editwhatsnew/${id}`);
  };

  const handleDelete = async () => {
    if (selectedId) {
      try {
        await deleteWhatsNew(selectedId).unwrap();
        toast.success("WhatsNew item deleted successfully");
        setOpenDialog(false);
      } catch (error) {
        toast.error("Failed to delete the WhatsNew item");
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
    whatsNewData?.data.map((item) => ({
      id: item._id,
      title: item.title,
      description: item.description,
    })) || [];

  const breadcrumbItems = [
    { label: "Dashboard", link: "/dashboard" },
    { label: "Whats New" },
  ];

  return (
    <Box className="page-body" sx={{ padding: 2 }}>
      <Breadcrumbs items={breadcrumbItems} />

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/addwhatsnew")}
      >
        Add New WhatsNew
      </Button>

      <Box sx={{ width: "100%", marginTop: 3 }}>
        <Card>
          <DataGrid
            autoHeight
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
            loading={isLoading}
            pagination
            paginationMode="server"
            rowCount={whatsNewData?.total_data || 0}
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
        title="Remove WhatsNew"
        content="Are you sure you want to remove this item?"
        onClose={handleCloseDialog}
        onConfirm={handleDelete}
      />
    </Box>
  );
};

export default WhatsNew;
