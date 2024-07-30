import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAllreviews,fetchReviews,deleteReviews ,getreviewError,getreviewStatus} from "../../redux/Slices/ReviewsSlice";

const Reviews = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  
  
  
//   selectAllreviews
// getreviewStatus
// getreviewError
// addEditResponse
// selectedreviewWithId
  const allReviews = useSelector(selectAllreviews)
  const status = useSelector(getreviewStatus)
  const error = useSelector(getreviewError)
  const [selectedId, setSelectedId] = useState('')
  const navigatpage = async (navname) => {
    console.log("navigatpage -> navname", navname);
    navigate(navname);
  };

  useEffect(() => {
    dispatch(fetchReviews({
      limit: 200,
      offset: 0
    }))

  }, [navigate])

  useEffect(() => {
  if(status === 'deleteSucceeded'){
    
  }else {
    
  }

  }, [status,error])

  const deleteReview = (e, id) => {
    dispatch(deleteReviews({
      review_id: id
    }))
    setSelectedId('')
  }

  return (
    <div className="page-body">
      {/* Model_start */}
      <div
        class="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Remove Review
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
                <h6>Remove This Review</h6>
              </p>
            </div>
            <div class="modal-footer justify-content-center">
              <button class="btn btn-success mr-5" type="button" data-dismiss="modal" onClick={(e) => deleteReview(e, selectedId)}>
                Yes
              </button>
              <button
                class="btn btn-primary"
                type="button"
                data-dismiss="modal"
                onClick={() => setSelectedId('')}
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
                <h3>Reviews</h3>
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="index.html">
                      {/* <i data-feather="home"></i> */}
                      <i class="fa fa-home theme-fa-icon" aria-hidden="true"></i>
                    </a>
                  </li>
                  {/* <li class="breadcrumb-item">Add New User</li>
                                            <li class="breadcrumb-item">Form Layout</li> */}
                  <li class="breadcrumb-item active">Reviews Listing</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div class="row">
          <div class="col-sm-12 col-xl-12">
            <div className="row pt-3">
              <div className="col-md-6">
                <div class="form-group">
                  <button
                    class="btn btn-color"
                    onClick={() => navigatpage("/addreview")}
                  >
                    Add New Reviews
                  </button>
                </div>
              </div>
            </div>
            {/* All subject List */}
            <div class="row">
              <div class="col-sm-12 col-xl-12">
                <div class="card">
                  <div class="card-header">
                    <h5>List of Reviews:</h5>
                  </div>
                  <div class="table-responsive">
                    <table class="table table-border-horizontal">
                      <thead>
                        <tr className="text-center">
                          <th scope="col">Reviews</th>
                          <th scope="col">FeedBacks</th>
                          <th scope="col">User Name</th>
                          <th scope="col">Action</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {allReviews && allReviews.map((item, index) => (
                          <tr className="text-center">

                          <td>{item?.review}</td>
                          <td>{item?.rating}</td>
                          <td>{item?.user_name}</td>
                            <td>
                            <i
                                class="fa fa-edit theme-fa-icon mr-3"
                                aria-hidden="true"
                                title="Edit Review"
                                onClick={() => {
                                  navigate(`/addreview`, { state: { id: item?._id } })
                                }}
                              ></i>
                             { /*<i
                                class="fa fa-edit theme-fa-icon mr-3" 
                                aria-hidden="true"
                                title="Edit Subject"
                                onClick={() => {
                                  navigatpage(`/addreview`, { state: { id: item?._id } });
                                }}
                              ></i>*/}
                              <i
                                class="fa fa-trash theme-fa-icon"
                                aria-hidden="true"
                                title="Delete Review"
                                data-toggle="modal"
                                data-original-title="test"
                                data-target="#exampleModal"
                                onClick={() => setSelectedId(item._id)}
                              ></i>
                            </td>

                          </tr>
                        ))}
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
export default Reviews;
