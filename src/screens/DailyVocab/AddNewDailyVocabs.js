// import React, { useEffect, useState } from "react";
// // import Header from "../../component/Header";
// // import SideBar from "../../component/SideNav";
// // import Footer from "../../component/Footer";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addDailyVocabs,getDailyVocabsStatus, selectedDailyVocabsWithId } from "../../redux/Slices/DailyVocabSlice";

// const AddNewDailyVocab = () => {
//   const navigate = useNavigate();
//   const location = useLocation()
//   const { id } = location.state || {}
//   const dispatch = useDispatch()
//   const status = useSelector(getDailyVocabsStatus)
//   const selectedDailyVocabs = useSelector(state => selectedDailyVocabsWithId(state, id !== undefined ? id : 0))

//   const [addNewDailyVocabData, setAddNewDailyVocabData] = useState({
//     // image: '',
//     title: '',
//     description: ''
//   })

//   const navigatpage = async (navname) => {
//     console.log("navigatpage -> navname", navname);
//     navigate(navname);
//   };

//   useEffect(() => {
//     if (status === 'addSucceeded') {
//       navigatpage('/dailyvocab')
//     }

//     return () => {

//     }
//   }, [status])

//   useEffect(() => {
//     if (id !== undefined) {
//       setAddNewDailyVocabData({
//         // image: selectedBlog[0]?.image ?? '',
//         title: selectedDailyVocabs[0]?.title ?? '',
//         description: selectedDailyVocabs[0]?.description ?? ''
//       })
//     }

//     return () => {

//     }
//   }, [id])

//   const handleValueChange = (event) => {
//     const { name, value, type } = event.target;

//     if (type === 'file') {
//       const file = event.target.files[0];

//       setAddNewDailyVocabData(prevState => ({
//         ...prevState,
//         [name]: file
//       }));
//     } else {
//       setAddNewDailyVocabData(prevState => ({
//         ...prevState,
//         [name]: value
//       }));
//     }
//   }

//   // const addDailyVocab = (e) => {
//   //   e.preventDefault()
//   //   const formData = new FormData()
//   //   if (id !== undefined) {
//   //     formData.append('addnewjob_id', id)
//   //   }
//   //   // formData.append('image', blogData.image)
//   //   formData.append('title', addNewDailyVocabData.title)
//   //   formData.append('description', addNewDailyVocabData.description)
//   //   dispatch(addDailyVocabs(formData))
//   // }
//   const addDailyVocab = (e) => {
//     e.preventDefault()
//     const formData = new FormData()
//     formData.append('addDalyVocab_id', id)
//     formData.append('title', addNewDailyVocabData.title)
//     formData.append('description', addNewDailyVocabData.description)
//     dispatch(addDailyVocabs(formData))
//   }

//   return (
//     <div className="page-body">
//       <div class="container-fluid">
//         <div class="page-header">
//           <div class="row">
//             <div class="col">
//               <div class="page-header-left">
//                 <h3>Add New Daily Vocab </h3>
//                 <ol class="breadcrumb">
//                   <li class="breadcrumb-item">
//                     <a href="index.html">
//                       <i data-feather="home"></i>
//                     </a>
//                   </li>
//                   <li
//                     class="breadcrumb-item"
//                     onClick={() => {
//                       navigatpage("/dailyvocab");
//                     }}
//                   >
//                     All Daily Vocab Listing
//                   </li>
//                   <li class="breadcrumb-item active">Add New Daily Vocab</li>
//                 </ol>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div class="container-fluid">
//         <div class="row ">
//           <div class="col-sm-12 ">
//             <div class="card">
//               <div class="card-header">
//                 <h5>Add New Daily Vocab</h5>
//               </div>
//               <form class="form theme-form">
//                 <div class="card-body">
//                   <div class="row">
//                     <div class="col-md-8">
//                       <div class="form-group">
//                         <label for="exampleFormControlLastName">
//                            Title
//                         </label>
//                         <input
//                           class="form-control"
//                           id="exampleFormControlLastName"
//                           type="text"
//                           placeholder="Subject Title"
//                           name="title"
//                           value={addNewDailyVocabData?.title}
//                           onChange={(e) => handleValueChange(e)}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div class="row">
//                     <div class="col-md-8">
//                       <div class="form-group">
//                         <label for="exampleFormControlLastName">
//                            Description
//                         </label>
//                         <input
//                           class="form-control"
//                           id="exampleFormControlLastName"
//                           type="text"
//                           placeholder="Description"
//                           name="description"
//                           value={addNewDailyVocabData?.description}
//                           onChange={(e) => handleValueChange(e)}
//                         />
//                       </div>
//                     </div>
//                   </div>

//                 </div>
//                 <div className="row">
//                   <div className="col-md-12 ">
//                     <div className="card-footer float-right">
//                       <button className="btn btn-color" type="submit" onClick={(e) => { addDailyVocab(e) }}>
//                         Submit
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default AddNewDailyVocab;

import React, { useEffect, useState } from "react";
import Header from "../../component/Header";
import SideBar from "../../component/SideNav";
import Footer from "../../component/Footer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addDailyVocabs,
  getDailyVocabsStatus,
  selectedDailyVocabsWithId,
} from "../../redux/Slices/DailyVocabSlice";
import QuillTextEditor from "screens/Studymaterial/QuillTextEditor";

const AddNewDailyVocab = () => {
  const location = useLocation();
  const { id } = location.state || {};
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const status = useSelector(getDailyVocabsStatus);
  const selectedDailyVocabs = useSelector((state) =>
    selectedDailyVocabsWithId(state, id !== undefined ? id : 0)
  );
  const [content, setContent] = useState(
    selectedDailyVocabs[0]?.description ?? ""
  );
  const [dailyVocabsData, setDailyVocabsData] = useState({
    title: "",
    description: "",
  });
  const navigatpage = async (navname) => {
    console.log("navigatpage -> navname", navname);
    navigate(navname);
  };

  useEffect(() => {
    if (status === "addSucceeded") {
      navigatpage("/dailyvocab");
    }

    return () => {};
  }, [status]);
  useEffect(() => {
    if (id !== undefined) {
      setDailyVocabsData({
        title: selectedDailyVocabs[0]?.title ?? "",
        description: selectedDailyVocabs[0]?.description ?? "",
      });
    }

    return () => {};
  }, [id]);

  const handleValueChange = (event) => {
    const { name, value } = event.target;

    setDailyVocabsData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // }
  };

  const adddailyvocab = (e) => {
    e.preventDefault();
    const params =
      id !== undefined
        ? {
            dalyVocab_id: id,
            title: dailyVocabsData.title ?? "",
            description: content ?? "",
          }
        : {
            title: dailyVocabsData.title ?? "",
            description: content ?? "",
          };
    dispatch(addDailyVocabs(params));
  };
  // const adddailyvocab = (e) => {
  //   e.preventDefault()
  //   dispatch(addDailyVocabs({
  //     title: dailyVocabsData.title ?? '',
  //     description: dailyVocabsData.description ?? ''
  //   }))
  // }

  return (
    <div className="page-body">
      <div className="container-fluid">
        <div className="page-header">
          <div className="row">
            <div className="col">
              <div className="page-header-left">
                <h3>Daily vocabs</h3>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="index.html">
                      <i data-feather="home"></i>
                    </a>
                  </li>
                  <li
                    className="breadcrumb-item"
                    onClick={() => {
                      navigatpage("/dailyvocabs");
                    }}
                  >
                    Daily vocabs Listing
                  </li>
                  <li className="breadcrumb-item active">
                    Add New Daily vocabs
                  </li>
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
                <h5>Add New Daily vocabs</h5>
              </div>
              <form className="form theme-form">
                <div className="card-body">
                  <div className="row ">
                    <div className="col-md-8 ">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlFirstName">
                          Title
                        </label>
                        <input
                          className="form-control"
                          id="exampleFormControlFirstName"
                          type="text"
                          placeholder="Title"
                          name="title"
                          value={dailyVocabsData.title}
                          onChange={(e) => handleValueChange(e)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-8">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlLastName">
                          Description
                        </label>
                        <QuillTextEditor
                          id="exampleFormControlLastName"
                          value={content}
                          setContent={(newContent) => setContent(newContent)}
                          style={{ padding: "0" }}
                        />
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
                          adddailyvocab(e);
                        }}
                      >
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
export default AddNewDailyVocab;
