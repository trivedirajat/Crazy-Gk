import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { CircularProgress } from "@mui/material";
import toast from "react-hot-toast";
import { apiEndPoints } from "utils/ApiEndPoints";
import { BASE_URL } from "utils/Global";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const fetchUsers = async (page, pageSize) => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}${apiEndPoints.getUser}`, {
        params: {
          page: page + 1,
          limit: pageSize,
        },
      });
      const { data, total } = response.data;
      setUsers(data);
      setRowCount(total);
    } catch (error) {
      toast.error("Error fetching users");
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page, pageSize);
  }, [page, pageSize]);

  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      valueGetter: (params) => params?.row?.email || "N/A",
    },
    { field: "gender", headerName: "Gender", width: 100 },
    { field: "mobile", headerName: "Mobile", width: 150 },
    // { field: "status", headerName: "Status", width: 100, type: "boolean" },
    { field: "user_type", headerName: "User Type", width: 150 },
    { field: "verified", headerName: "Verified", width: 100, type: "boolean" },
    {
      field: "createdDate",
      headerName: "Created Date",
      width: 200,
      type: "dateTime",
      valueGetter: (params) => new Date(params?.row?.createdDate),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 0.11,
      renderCell: (params) => (
        <i
          className="fa fa-trash theme-fa-icon"
          aria-hidden="true"
          title="Delete Blog"
          data-toggle="modal"
          data-target="#exampleModal"
          onClick={() => setSelectedId(params.row._id)}
        ></i>
      ),
    },
  ];
  const deleteUser = async (e, id) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}${apiEndPoints.deleteUser}/${id}`
      );
      if (response.status === 200) {
        toast.success("User deleted successfully");
        fetchUsers(page, pageSize);
      }
    } catch (error) {
      toast.error("Error deleting user");
      console.error("Error deleting user:", error);
    }
    setSelectedId("");
  };
  return (
    <div className="page-body">
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Remove Blog
                  </h5>
                  <button
                    className="close"
                    type="button"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p className="text-center">
                    <h6>Are You Sure?</h6>
                  </p>
                  <p className="text-center">
                    <h6>You want to delete this user</h6>
                  </p>
                </div>
                <div className="modal-footer justify-content-center">
                  <button
                    className="btn btn-success mr-5"
                    type="button"
                    data-dismiss="modal"
                    onClick={(e) => deleteUser(e, selectedId)}
                  >
                    Yes
                  </button>
                  <button
                    className="btn btn-primary"
                    type="button"
                    data-dismiss="modal"
                    onClick={() => setSelectedId("")}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="page-header">
              <div className="row">
                <div className="col">
                  <div className="page-header-left">
                    <h3>All Users</h3>
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="index.html">
                          <i
                            className="fa fa-home theme-fa-icon"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </li>
                      <li className="breadcrumb-item active">All Users</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12 col-xl-12">
                <div className="row">
                  <div className="col-sm-12 col-xl-12">
                    <div className="card">
                      <div className="card-header">
                        <h5>List of Blogs:</h5>
                      </div>
                      <DataGrid
                        rows={users || []}
                        columns={columns}
                        pagination
                        paginationMode="server"
                        rowCount={rowCount}
                        pageSize={pageSize}
                        rowsPerPageOptions={[5, 10, 20]}
                        page={page}
                        onPageChange={(newPage) => setPage(newPage)}
                        onPageSizeChange={(newPageSize) =>
                          setPageSize(newPageSize)
                        }
                        loading={loading}
                        getRowId={(row) => row?._id}
                        rowSelection={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserTable;
