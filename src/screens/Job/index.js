import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, IconButton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import toast from "react-hot-toast";
import ConfirmDialog from "component/common/ConfirmDialog";
import {
  useGetJobsQuery,
  useDeleteJobMutation,
} from "../../redux/apis/jobapis";
import moment from "moment";
import Breadcrumbs from "component/common/Breadcrumbs";

const Job = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [openDialog, setOpenDialog] = useState(false);

  const { data: jobData, isLoading } = useGetJobsQuery({
    limit: paginationModel.pageSize,
    offset: paginationModel.page,
  });

  const [deleteJob] = useDeleteJobMutation();

  const handleEdit = (id) => {
    navigate(`/editjob/${id}`);
  };

  const handleDelete = async () => {
    if (selectedId) {
      try {
        await deleteJob(selectedId).unwrap();
        toast.success("Job deleted successfully");
        setOpenDialog(false);
      } catch (error) {
        toast.error("Failed to delete the job");
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
      headerName: "Job Title",
      flex: 1,
      renderCell: ({ row }) => (
        <Typography sx={{ color: "text.secondary" }}>
          {row.title || "-"}
        </Typography>
      ),
    },
    {
      field: "apply_date",
      headerName: "Apply Date",
      flex: 1,

      renderCell: ({ row }) => {
        const date = row.apply_date;
        const formattedDate = moment(date).isValid()
          ? moment(date).format("MMM DD, YYYY hh:mm A")
          : "-";

        return (
          <Typography sx={{ color: "text.secondary" }}>
            {formattedDate}
          </Typography>
        );
      },
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
    { label: "Job" },
  ];
  return (
    <Box className="page-body" sx={{ padding: 2 }}>
      <Breadcrumbs items={breadcrumbItems} />
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/addjob")}
      >
        Add Job
      </Button>

      <Box sx={{ width: "100%", marginTop: 3 }}>
        <Card>
          <DataGrid
            autoHeight
            rows={jobData?.data || []}
            getRowId={(row) => row._id}
            columns={columns}
            disableRowSelectionOnClick
            pagination
            paginationMode="server"
            rowCount={jobData?.total_data || 0}
            paginationModel={paginationModel}
            pageSizeOptions={[10, 25, 50, 100]}
            onPaginationModelChange={setPaginationModel}
            localeText={{ noRowsLabel: "No Record(s) Found" }}
            loading={isLoading}
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
        title="Remove Job"
        content="Are you sure you want to remove this job?"
        onClose={handleCloseDialog}
        onConfirm={handleDelete}
      />
    </Box>
  );
};

export default Job;
