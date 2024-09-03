import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchSubjects,
  selectAllsubject,
} from "../../redux/Slices/SubjectSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  addStudyMaterials,
  getStudyMaterialsStatus,
} from "../../redux/Slices/StudyMaterialSlice";

import "../../App.css";
import QuillTextEditor from "./QuillTextEditor";

const AddStudysMaterial = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allSubjects = useSelector(selectAllsubject);
  const status = useSelector(getStudyMaterialsStatus);
  const editor = useRef(null);
  const [content, setContent] = useState("");

  // const config = useMemo(
  //   {
  //     height: '500px',
  //     width: '100%',
  //     removeButtons: ['brush', 'superscript', 'subscript', 'Insert className', 'aboutjodit', 'print', 'speechRecognize'],
  //   },
  //   [editor]
  // );
  const [studyTopicContent, setStudyTopicContent] = useState([
    {
      title: "",
      description: "",
    },
  ]);
  const [studyData, setStudyData] = useState({
    subject_id: "",
    title: "",
    description: studyTopicContent,
  });

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
    updatedContent[index][field] = value;
    setStudyTopicContent(updatedContent);
  };

  const addStudyMaterial = (e) => {
    e.preventDefault();
    const data = {
      subject_id: studyData.subject_id,
      topic_name: studyData.title,
      containt: content,
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
                <h3>Add New Study Material</h3>
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
                  <li class="breadcrumb-item active">Add New Study Material</li>
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
                <h5>Add New Study Material</h5>
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
                  <br />
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
                  {/* <div class="row">
                    <div class="col-md-8">
                      <div class="form-group">
                        <label htmlFor="videoTitle">Study Topic Content</label>

                        {studyTopicContent && studyTopicContent.map((item, index) => (
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
                                    onChange={(e) => handleValueChangeContent(index, 'title', e.target.value)}
                                  />
                                  <input
                                    className="form-control"
                                    id="videoTitle"
                                    type="text"
                                    placeholder="Description"
                                    name="description"
                                    value={item.description}
                                    onChange={(e) => handleValueChangeContent(index, 'description', e.target.value)}
                                  />
                                </div>

                              </div>
                            </div>
                            <div className="col-md-4">
                              {index === 0 ? (
                                <button type="button" className="btn btn-success" onClick={addVideoField}>+</button>
                              ) : (
                                <>
                                  <button type="button" className="btn btn-success" onClick={addVideoField}>+</button>
                                  <button type="button" className="btn btn-danger" onClick={() => removeVideoField(index)}>-</button>
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div> */}
                  <div
                    className="row"
                    style={{ width: "100%", height: "100%" }}
                  >
                    <div style={{ width: "100%", height: "50%" }}>
                      {/* Old editor */}
                      {/* <JoditEditor
                        ref={editor}
                        value={content}
                        config={config}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                        onChange={newContent => setContent(newContent)}
                      /> */}

                      {/* New Editor */}
                      <QuillTextEditor
                        ref={editor}
                        value={content}
                        setContent={(newContent) => setContent(newContent)}
                      />

                      {/* {content} */}
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
                          addStudyMaterial(e);
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
export default AddStudysMaterial;
