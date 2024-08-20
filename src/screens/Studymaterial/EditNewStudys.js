import React, { useEffect, useState } from "react";
import Header from "../../component/Header";
import SideBar from "../../component/SideNav";
import Footer from "../../component/Footer";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchSubjects,
  selectAllsubject,
} from "../../redux/Slices/SubjectSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  addStudyMaterials,
  getStudyMaterialsStatus,
  selectedStudyMaterialsWithId,
} from "../../redux/Slices/StudyMaterialSlice";

const EditNewStudys = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const allSubjects = useSelector(selectAllsubject);
  const status = useSelector(getStudyMaterialsStatus);
  const study = useSelector((state) => selectedStudyMaterialsWithId(state, id));
  console.log("study", study);

  const [studyTopicContent, setStudyTopicContent] = useState([
    {
      title: "",
      description: "",
    },
  ]);
  useEffect(() => {
    if (study?.length > 0) {
      setStudyTopicContent(study[0]?.containt);
    }
  }, [id]);
  const [studyData, setStudyData] = useState({
    subject_id: study[0]?.subject_id,
    title: study[0]?.topic_name,
    description: studyTopicContent,
  });

  console.log("studyTopicContent", studyTopicContent);

  useEffect(() => {
    dispatch(
      fetchSubjects({
        limit: 200,
        offset: 0,
      })
    );
  }, []);
  useEffect(() => {
    if (status === "addSucceeded") {
      navigatpage("/studys");
    }

    return () => {};
  }, [status]);

  const navigatpage = async (navname) => {
    console.log("navigatpage -> navname", navname);
    navigate(navname);
  };

  const handleValueChange = (event) => {
    const { name, value, type } = event.target;
    setStudyData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addVideoField = () => {
    setStudyTopicContent([
      ...studyTopicContent,
      { title: "", description: "" },
    ]);
  };

  const removeVideoField = (index) => {
    const updatedContent = [...studyTopicContent];
    updatedContent.splice(index, 1);
    setStudyTopicContent(updatedContent);
  };

  const handleValueChangeContent = (index, field, value) => {
    const updatedContent = [...studyTopicContent];
    // Create a new object with the updated value
    const updatedItem = { ...updatedContent[index], [field]: value };
    // Replace the old object with the new one in the array
    updatedContent[index] = updatedItem;
    setStudyTopicContent(updatedContent);
  };

  const editStudyMaterial = (e) => {
    e.preventDefault();
    const data = {
      topic_id: id,
      subject_id: studyData.subject_id,
      topic_name: studyData.title,
      containt: studyTopicContent,
    };
    dispatch(addStudyMaterials(data));
  };
  console.log("studyData", studyData);

  return (
    <div className="page-body">
      <div class="container-fluid">
        <div class="page-header">
          <div class="row">
            <div class="col">
              <div class="page-header-left">
                <h3>Edit Study Material</h3>
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="index.html">
                      <i data-feather="home"></i>
                    </a>
                  </li>
                  <li
                    class="breadcrumb-item"
                    onClick={() => {
                      navigatpage("/studys");
                    }}
                  >
                    All Study Material Listing
                  </li>
                  <li class="breadcrumb-item active">Edit Study Material</li>
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
                <h5>Edit Study Material</h5>
              </div>
              <form class="form theme-form">
                <div class="card-body">
                  <div class="row ">
                    <div class="col-md-8">
                      <span className="cardText">Subject dropdown</span>
                      <select
                        class="form-control btn-square"
                        id="formcontrol-select1"
                        name="subject_id"
                        value={studyData.subject_id}
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
                  <div class="row">
                    <div class="col-md-8">
                      <div class="form-group">
                        <label for="exampleFormControlLastName">
                          Subject Topics
                        </label>
                        <input
                          class="form-control"
                          id="exampleFormControlLastName"
                          type="text"
                          placeholder="Subject Topic"
                          name="title"
                          value={studyData.title}
                          onChange={(val) => handleValueChange(val)}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-8">
                      <div class="form-group">
                        <label htmlFor="videoTitle">Study Topic Content</label>

                        {studyTopicContent &&
                          studyTopicContent.map((item, index) => (
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
                                    <input
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
                                    />
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
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 ">
                    <div className="card-footer float-right">
                      <button
                        className="btn btn-color"
                        type="submit"
                        onClick={(e) => {
                          editStudyMaterial(e);
                        }}
                      >
                        Update
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
export default EditNewStudys;
