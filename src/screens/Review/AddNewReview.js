import React, { useEffect, useState } from "react";
import Header from "../../component/Header";
import SideBar from "../../component/SideNav";
import Footer from "../../component/Footer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addReviews, getreviewStatus,selectedreviewWithId } from "../../redux/Slices/ReviewsSlice";

const ReviewsListing = () => {
  const location = useLocation()
  const { id } = location.state || {}
  console.log("id",id)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const status = useSelector(getreviewStatus)
  const selectedReview = useSelector(state => selectedreviewWithId(state, id !== undefined ? id : 0))
  const [reviewData, setReviewData] = useState({
    review: '',
    // user_name: '',
    rating: ''
  })
  const navigatpage = async (navname) => {
    console.log("navigatpage -> navname", navname);
    navigate(navname);
  };

  useEffect(() => {
    if (status === 'addSucceeded') {
      navigatpage('/review')
    }

    return () => {

    }
  }, [status])
  useEffect(() => {
    if (id !== undefined) {
      setReviewData({
        review: selectedReview[0]?.review ?? '',
        rating: selectedReview[0]?.rating ?? '',
        // // user_name: selectedReview[0]?.user_name ?? ''
      })
    }

    return () => {

    }
  }, [id])



  // const handleValueChange = (event) => {
  //   const { name, value, type } = event.target;

  //   if (type === 'file') {
  //     const file = event.target.files[0];

  //     setReviewData(prevState => ({
  //       ...prevState,
  //       [name]: file
  //     }));
  //   } else {
  //     setReviewData(prevState => ({
  //       ...prevState,
  //       [name]: value
  //     }));
  //   }
  // }
  const handleValueChange = (event) => {
    const { name, value } = event.target;
  
    setReviewData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }
  // const addReview = (e) => {
  //   e.preventDefault()
  //   const formData = new FormData()
  //   // formData.append('user_name', reviewData.user_name)
  //   formData.append('rating', reviewData.rating)
  //   formData.append('review', reviewData.review)
  //   dispatch(addReviews(formData))
  // }
  const addReview = (e) => {
    e.preventDefault()
    dispatch(addReviews({
      rating: reviewData.rating ?? '',
      review: reviewData.review ?? ''
    }))
  }

  return (
    <div className="page-body">
      <div className="container-fluid">
        <div className="page-header">
          <div className="row">
            <div className="col">
              <div className="page-header-left">
                <h3>Reviews</h3>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="index.html">
                      <i data-feather="home"></i>
                    </a>
                  </li>
                  <li
                    className="breadcrumb-item"
                    onClick={() => {
                      navigatpage("/review");
                    }}
                  >
                    Reviews Listing
                  </li>
                  <li className="breadcrumb-item active">Add New Reviews</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row ">
          <div className="col-sm-12 ">
            <div className="card">
              <div className="card-header">
                <h5>Add New Reviews</h5>
              </div>
              <form className="form theme-form">
                <div className="card-body">
                {/*  <div className="row ">
                    <div className="col-md-8 ">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlFirstName">
                          Image
                        </label>
                        <input
                          className="form-control"
                          id="exampleFormControlFirstName"
                          type="file"
                          placeholder="Image"
                          name="image"
                          onChange={(e) => handleValueChange(e)}
                        />
                      </div>
                    </div>
                  </div>*/}
                  <div className="row ">
                    <div className="col-md-8 ">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlFirstName">
                        Reviews
                        </label>
                        <input
                          className="form-control"
                          id="exampleFormControlFirstName"
                          type="text"
                          placeholder="Title"
                          name="review"
                          value={reviewData?.review}
                          onChange={(e) => handleValueChange(e)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-8">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlLastName">
                        Rating
                        </label>
                        <input
                          className="form-control"
                          id="exampleFormControlLastName"
                          type="text"
                          placeholder="rating"
                          name="rating"
                          value={reviewData?.rating}
                          onChange={(e) => handleValueChange(e)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 ">
                    <div className="card-footer float-right">
                      <button className="btn btn-color" type="submit" onClick={(e) => { addReview(e) }}>
                        Add
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
export default ReviewsListing;
