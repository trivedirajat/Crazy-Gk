import React, { useEffect, useState } from "react";
import "./SwitchButton.css";
import Header from "../../component/Header";
import SideBar from "../../component/SideNav";
import Footer from "../../component/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import {
  fetchSubjects,
  selectAllsubject,
} from "../../redux/Slices/SubjectSlice";
import { useDispatch, useSelector } from "react-redux";
import { addVideos, getVideoStatus } from "../../redux/Slices/VideoSlice";
import QuillTextEditor from "screens/Studymaterial/QuillTextEditor";

const AddStudyVideo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allSubjects = useSelector(selectAllsubject);
  const status = useSelector(getVideoStatus);

  const [videoContent, setVideoContent] = useState([
    {
      tital: "",
      description: "",
    },
  ]);
  const [videoData, setVideoData] = useState({
    subject_id: "",
    title: "",
    video_url: "",
    description: videoContent,
    is_trending: "",
  });

  const navigatpage = async (navname) => {
    console.log("navigatpage -> navname", navname);
    navigate(navname);
  };

  useEffect(() => {
    dispatch(
      fetchSubjects({
        limit: 200,
        offset: 0,
      })
    );
  }, [navigate]);
  useEffect(() => {
    if (status === "addSucceeded") {
      navigatpage("/studyvideo");
    }

    return () => {};
  }, [status]);

  const handleValueChange = (event) => {
    const { name, value, type } = event.target;

    if (type === "file") {
      const file = event.target.files[0];

      setVideoData((prevState) => ({
        ...prevState,
        [name]: file,
      }));
    } else {
      setVideoData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const addVideoField = () => {
    setVideoContent([...videoContent, { title: "", description: "" }]);
  };

  const removeVideoField = (index) => {
    const updatedContent = [...videoContent];
    updatedContent.splice(index, 1);
    setVideoContent(updatedContent);
  };

  const handleValueChangeContent = (index, field, value) => {
    const updatedContent = [...videoContent];
    updatedContent[index][field] = value;
    setVideoContent(updatedContent);
  };

  const addVideo = (e) => {
    e.preventDefault();
    const data = {
      subject_id: videoData.subject_id,
      title: videoData.title,
      video_url: videoData.video_url,
      description: videoContent,
      is_trending: isRight,
    };
    dispatch(addVideos(data));
  };

  const [isRight, setIsRight] = useState(false);

  const handleClick = () => {
    setIsRight((prevState) => !prevState); // Toggle the isRight state
    setVideoData((prevState) => ({
      ...prevState,
      is_trending: !prevState.isRight, // Update is_trending based on the new state of isRight
    }));
  };
  return (
    <div className="page-body">
      <div class="container-fluid">
        <div class="page-header">
          <div class="row">
            <div class="col">
              <div class="page-header-left">
                <h3>Add New Study Video</h3>
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="index.html">
                      <i data-feather="home"></i>
                    </a>
                  </li>
                  <li
                    class="breadcrumb-item"
                    onClick={() => {
                      navigatpage("/studyvideo");
                    }}
                  >
                    All Study Video Listing
                  </li>
                  <li class="breadcrumb-item active">Add New Study Video</li>
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
                <h5>Add New Video Material</h5>
              </div>
              <form class="form theme-form">
                <div class="card-body">
                  <div class="row ">
                    <div class="col-md-8">
                      <span className="cardText">Trending Videos</span>
                      <div class="checkbox-wrapper-6">
                        <input
                          class="tgl tgl-light"
                          id="cb1-6"
                          type="checkbox"
                          onClick={handleClick}
                          checked={isRight}
                          // onClick={handleClick}
                          // checked={isRight}  // Ensure the checked state reflects the isRight state
                        />
                        <label class="tgl-btn" for="cb1-6" />
                      </div>
                    </div>
                  </div>
                  <div class="row ">
                    <div class="col-md-8">
                      <span className="cardText">Select Subject</span>
                      <select
                        class="form-control btn-square"
                        id="formcontrol-select1"
                        name="subject_id"
                        value={videoData.subject_id}
                        onChange={(e) => handleValueChange(e)}
                      >
                        <option value={""}>Select Subject</option>
                        {allSubjects &&
                          allSubjects.map((item) => (
                            <option value={item._id}>
                              {item?.subject_name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  {/* <div class="row">
                    <div class="col-md-8">
                      <div class="form-group">
                        <label for="exampleFormControlLastName">
                          Thumb Image
                        </label>
                        <input
                          class="form-control"
                          id="exampleFormControlLastName"
                          type="file"
                          placeholder="Subject Topic"
                        />
                      </div>
                    </div>
                  </div> */}
                  <div class="row">
                    <div class="col-md-8">
                      <div class="form-group">
                        <label for="exampleFormControlLastName">
                          Video Title
                        </label>
                        <input
                          class="form-control"
                          id="exampleFormControlLastName"
                          type="text"
                          placeholder="Subject Title"
                          name="title"
                          value={videoData.title}
                          onChange={(e) => handleValueChange(e)}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-8">
                      <div class="form-group">
                        <label for="exampleFormControlLastName">
                          Video URL
                        </label>
                        <input
                          class="form-control"
                          id="exampleFormControlLastName"
                          type="text"
                          placeholder="Description"
                          name="video_url"
                          value={videoData.video_url}
                          onChange={(e) => handleValueChange(e)}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Video content */}
                  <label htmlFor="videoTitle">Video Content</label>

                  {videoContent &&
                    videoContent.map((item, index) => (
                      <div className="row">
                        <div className="col-md-8">
                          <div className="form-group">
                            <div>
                              <input
                                className="form-control"
                                id="videoTitle"
                                type="text"
                                placeholder="Title"
                                name="title"
                                value={item.title}
                                onChange={(e) =>
                                  handleValueChangeContent(
                                    index,
                                    "title",
                                    e.target.value
                                  )
                                }
                              />
                              <label
                                htmlFor="editor"
                                style={{ marginTop: "1rem" }}
                              >
                                Description
                              </label>
                              <QuillTextEditor
                                value={item.description}
                                style={{
                                  margin: 0,

                                  padding: 0,
                                  height: "100%",
                                }}
                                placeholder="Write your description here..."
                                // ref={editor}
                                // value={content}
                                setContent={(content) => {
                                  handleValueChangeContent(
                                    index,
                                    "description",
                                    content
                                  );
                                }}
                              />
                              {/* <input
                                className="form-control"
                                id="videoTitle"
                                type="text"
                                placeholder="Description"
                                name="description"
                                value={item.description}
                                onChange={(e) =>
                                  handleValueChangeContent(
                                    index,
                                    "description",
                                    e.target.value
                                  )
                                }
                              /> */}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          {index === 0 ? (
                            <button
                              type="button"
                              className="btn btn-success"
                              onClick={addVideoField}
                            >
                              +
                            </button>
                          ) : (
                            <>
                              <button
                                type="button"
                                className="btn btn-success"
                                onClick={addVideoField}
                                style={{ marginRight: "0.5rem" }}
                              >
                                +
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => removeVideoField(index)}
                              >
                                -
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
                <div className="row">
                  <div className="col-md-12 ">
                    <div className="card-footer float-right">
                      <button
                        className="btn btn-color"
                        type="submit"
                        onClick={(e) => {
                          addVideo(e);
                        }}
                      >
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
export default AddStudyVideo;
