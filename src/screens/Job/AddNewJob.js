import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addJobs,
  getJobsStatus,
  selectedJobsWithId,
  UpdateJobs,
} from "../../redux/Slices/JobSlice";

const AddNewJob = ({ edit = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};
  const dispatch = useDispatch();
  const status = useSelector(getJobsStatus);
  const selectedWhatsNew = useSelector((state) =>
    selectedJobsWithId(state, id !== undefined ? id : 0)
  );

  const [addNewJobsData, setAddNewJobsData] = useState({
    title: "",
    description: "",
    apply_date: "",
    job_link: "", // Added job_link to the state
  });

  const navigatpage = async (navname) => {
    navigate(navname);
  };

  useEffect(() => {
    if (status === "addSucceeded") {
      navigatpage("/job");
    }
  }, [status]);

  useEffect(() => {
    if (id !== undefined) {
      setAddNewJobsData({
        title: selectedWhatsNew[0]?.title ?? "",
        description: selectedWhatsNew[0]?.description ?? "",
        apply_date: selectedWhatsNew[0]?.apply_date ?? "",
        job_link: selectedWhatsNew[0]?.job_link ?? "", // Initialize job_link if editing
      });
    }
  }, [id]);

  const handleValueChange = (event) => {
    const { name, value } = event.target;
    setAddNewJobsData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addjobnew = async (e) => {
    e.preventDefault();

    if (edit) {
      const data = {
        JobId: id,
        title: addNewJobsData.title,
        description: addNewJobsData.description,
        apply_date: addNewJobsData.apply_date,
        job_link: addNewJobsData.job_link,
      };
      const res = await dispatch(UpdateJobs(data));
      if (res?.meta.requestStatus === "fulfilled") {
        navigatpage("/job");
      }
    } else {
      const data = {
        title: addNewJobsData.title,
        description: addNewJobsData.description,
        apply_date: addNewJobsData.apply_date,
        job_link: addNewJobsData.job_link,
      };
      dispatch(addJobs(data));
    }
  };

  return (
    <div className="page-body">
      <div className="container-fluid">
        <div className="page-header">
          <div className="row">
            <div className="col">
              <div className="page-header-left">
                <h3>Add New Job</h3>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="index.html">
                      <i data-feather="home"></i>
                    </a>
                  </li>
                  <li
                    className="breadcrumb-item"
                    onClick={() => {
                      navigatpage("/job");
                    }}
                  >
                    All Job Listing
                  </li>
                  <li className="breadcrumb-item active">Add New Job</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Add New Job</h5>
              </div>
              <form className="form theme-form">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-8">
                      <div className="form-group">
                        <label>Job Title</label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Title"
                          name="title"
                          value={addNewJobsData?.title}
                          onChange={handleValueChange}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className="row">
                    <div className="col-md-8">
                      <div className="form-group">
                        <label>Job Description</label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Description"
                          name="description"
                          value={addNewJobsData?.description}
                          onChange={handleValueChange}
                        />
                      </div>
                    </div>
                  </div> */}
                  <div className="row">
                    <div className="col-md-8">
                      <div className="form-group">
                        <label>Apply Date</label>
                        <input
                          className="form-control"
                          type="date"
                          placeholder="Apply Date"
                          name="apply_date"
                          value={addNewJobsData?.apply_date}
                          onChange={handleValueChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-8">
                      <div className="form-group">
                        <label>Job Link</label>
                        <input
                          className="form-control"
                          type="url"
                          placeholder="https://example.com"
                          name="job_link"
                          value={addNewJobsData?.job_link}
                          onChange={handleValueChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="card-footer float-right">
                      <button
                        className="btn btn-color"
                        type="submit"
                        onClick={addjobnew}
                      >
                        {edit ? "Update" : "Submit"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewJob;
