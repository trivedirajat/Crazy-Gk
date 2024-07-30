import React, { useEffect, useState } from "react";
// import Header from "../../component/Header";
// import SideBar from "../../component/SideNav";
// import Footer from "../../component/Footer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { addWhatsNew,getWhatsNewStatus, selectedWhatsNewWithId } from "redux/Slices/WhatsNewSlice";
import { addJobs, getJobsStatus, selectedJobsWithId } from "../../redux/Slices/JobSlice";


const AddNewJob = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const { id } = location.state || {}
  const dispatch = useDispatch()
  const status = useSelector(getJobsStatus)
  const selectedWhatsNew = useSelector(state => selectedJobsWithId(state, id !== undefined ? id : 0))

  const [addNewJobsData, setAddNewJobsData] = useState({
    title: '',
    description: ''
  })

  const navigatpage = async (navname) => {
    console.log("navigatpage -> navname", navname);
    navigate(navname);
  };

  useEffect(() => {
    if (status === 'addSucceeded') {
      navigatpage('/job')
    }

    return () => {

    }
  }, [status])

  useEffect(() => {
    if (id !== undefined) {
      setAddNewJobsData({
        title: selectedWhatsNew[0]?.title ?? '',
        description: selectedWhatsNew[0]?.description ?? ''
      })
    }

    return () => {

    }
  }, [id])

  const handleValueChange = (event) => {
    const { name, value } = event.target;
  
    setAddNewJobsData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }
  const addjobnew = (e) => {
    e.preventDefault()
    const params = id !== undefined ? {
      job_id: id,
      title: addNewJobsData.title ?? '',
      description: addNewJobsData.description ?? ''
    } : {
      title: addNewJobsData.title ?? '',
      description: addNewJobsData.description ?? ''
    }
    dispatch(addJobs(params))
  }

  return (
    <div className="page-body">
      <div class="container-fluid">
        <div class="page-header">
          <div class="row">
            <div class="col">
              <div class="page-header-left">
                <h3>Add New Job </h3>
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="index.html">
                      <i data-feather="home"></i>
                    </a>
                  </li>
                  <li
                    class="breadcrumb-item"
                    onClick={() => {
                      navigatpage("/job");
                    }}
                  >
                    All Job Listing
                  </li>
                  <li class="breadcrumb-item active">Add New Job</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <div class="row ">
          <div class="col-sm-12 ">
            <div class="card">
              <div class="card-header">
                <h5>Add New Job</h5>
              </div>
              <form class="form theme-form">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-8">
                      <div class="form-group">
                        <label for="exampleFormControlLastName">
                          Job Title
                        </label>
                        <input
                          class="form-control"
                          id="exampleFormControlLastName"
                          type="text"
                          placeholder="Title"
                          name="title"
                          value={addNewJobsData?.title}
                          onChange={(e) => handleValueChange(e)}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-8">
                      <div class="form-group">
                        <label for="exampleFormControlLastName">
                          Job Description
                        </label>
                        <input
                          class="form-control"
                          id="exampleFormControlLastName"
                          type="text"
                          placeholder="Description"
                          name="description"
                          value={addNewJobsData?.description}
                          onChange={(e) => handleValueChange(e)}
                        />
                      </div>
                    </div>
                  </div>

                </div>
                <div className="row">
                  <div className="col-md-12 ">
                    <div className="card-footer float-right">
                      <button className="btn btn-color" type="submit" onClick={(e) => { addjobnew(e) }}>
                        Submit
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
