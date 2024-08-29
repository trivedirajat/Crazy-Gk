import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteStudyMaterials, fetchStudyMaterials, getStudyMaterialsError, getStudyMaterialsStatus, selectAllStudyMaterials } from "../../redux/Slices/StudyMaterialSlice";

const Study = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const allTopics = useSelector(selectAllStudyMaterials)
  const status = useSelector(getStudyMaterialsStatus)
  const error = useSelector(getStudyMaterialsError)
  const [selectedId, setSelectedId] = useState('')
  const navigatpage = async (navname) => {
    console.log("navigatpage -> navname", navname);
    navigate(navname);
  };

  useEffect(() => {
    dispatch(fetchStudyMaterials({
      limit: 200,
      offset: 0
    }))

  }, [navigate])
  useEffect(() => {
    if (status === 'deleteSucceeded') {
      dispatch(fetchStudyMaterials({
        limit: 200,
        offset: 0
      }))
    } else {

    }

  }, [status, error])

  const deleteStudy = (e, id) => {
    dispatch(deleteStudyMaterials({
      topic_id: id
    }))
    setSelectedId('')
  }

  return (
    <div className="page-body">
      {/* Model_start */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Remove Study Materials
              </h5>
              <button
                class="close"
                type="button"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div class="modal-body">
              <p className="text-center">
                <h6>Are You Sure ?</h6>
              </p>
              <p className="text-center">
                <h6>Remove This Study Materials</h6>
              </p>
            </div>
            <div class="modal-footer justify-content-center">
              <button class="btn btn-success mr-5" type="button" data-dismiss="modal" onClick={(e) => deleteStudy(e, selectedId)}>
                Yes
              </button>
              <button
                class="btn btn-primary"
                type="button"
                data-dismiss="modal"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Model_end */}

      <div class="container-fluid">
        <div class="page-header">
          <div class="row">
            <div class="col">
              <div class="page-header-left">
                <h3>All Study Material</h3>
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="index.html">
                      {/* <i data-feather="home"></i> */}
                      <i class="fa fa-home theme-fa-icon" aria-hidden="true"></i>
                    </a>
                  </li>
                  {/* <li class="breadcrumb-item">Add New User</li>
                                            <li class="breadcrumb-item">Form Layout</li> */}
                  <li class="breadcrumb-item active">All Study Material Listing</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div class="row">
          <div class="col-sm-12 col-xl-12">
            {/* <div class="row">
              <div class="col-sm-12">
                <div class="card">
                  <div class="card-body">
                    <form class="theme-form">
                      <div class="row">
                        <div class="col-md-4">
                          <span className="cardText">Start Date</span>
                          <div
                            class="input-group date"
                            id="dt-date"
                            data-target-input="nearest"
                          >
                            <input
                              class="form-control datetimepicker-input digits"
                              type="date"
                              data-target="#dt-date"
                            />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <span className="cardText">End Date</span>
                          <div
                            class="input-group date"
                            id="dt-date"
                            data-target-input="nearest"
                          >
                            <input
                              class="form-control datetimepicker-input digits"
                              type="date"
                            />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <span className="cardText">By Role</span>
                          <select
                            class="form-control btn-square"
                            id="formcontrol-select1"
                          >
                            <option>Admin</option>
                            <option>Sourcing Head</option>
                            <option>Sourcing Manager</option>
                            <option>Channel Partner</option>
                          </select>
                        </div>
                      </div>
                      <div className="row pt-3">
                        <div className="col-md-12 ">
                          <div class="form-group d-flex justify-content-end">
                            <button class="btn btn-warning">Search</button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="row pt-3">
              <div className="col-md-6">
                <div class="form-group">
                  <button
                    class="btn btn-color"
                    onClick={() => navigatpage("/addnewstudy")}
                  >
                    Add New Study Materials
                  </button>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12 col-xl-12">
                <div class="card">
                  <div class="card-header">
                    <h5>List of All Study Materials:</h5>
                  </div>
                  <div class="table-responsive">
                    <table class="table table-border-horizontal">
                      <thead>
                        <tr className="text-center">
                          <th scope="col">Subject</th>
                          <th scope="col">Topics</th>
                          <th scope="col">Subject content</th>
                          <th scope="col">Type</th>
                          <th scope="col">Action</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {allTopics && allTopics.map(item => (<tr className="text-center">

                          <td>{item?.subject_name}</td>
                          <td>{item?.topic_name}</td>
                          <td>{item?.containt}</td>
                          <td>Free</td>
                          <td>
                            <i
                              class="fa fa-edit theme-fa-icon mr-3"
                              aria-hidden="true"
                              title="Edit Study Material"
                              onClick={() => {
                                navigatpage(`/editStudys/${item._id}`);
                              }}
                            ></i>
                            <i
                              class="fa fa-trash theme-fa-icon"
                              aria-hidden="true"
                              title="Delete Study Material"
                              data-toggle="modal"
                              data-original-title="test"
                              data-target="#exampleModal"
                              onClick={() => setSelectedId(item._id)}
                            ></i>
                          </td>

                        </tr>))
                        }

                      </tbody>
                    </table>
                  </div>
                  <hr />
                  <div className="row">
                    <div class="col-12  ">
                      <div class="card ">
                        <div class="card-body ">
                          <nav aria-label="Page navigation example ">
                            <ul class="pagination pagination-primary float-right">
                              <li class="page-item">
                                <a class="page-link">Previous</a>
                              </li>
                              <li class="page-item">
                                <a class="page-link">1</a>
                              </li>
                              <li class="page-item">
                                <a class="page-link">2</a>
                              </li>
                              <li class="page-item">
                                <a class="page-link">3</a>
                              </li>
                              <li class="page-item">
                                <a class="page-link">Next</a>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Study;
