// import React from "react";
// import { useNavigate } from "react-router-dom";

// const ViewUser = () => {
//   const navigate = useNavigate();

//   const navigatpage = async (navname) => {
//     console.log("navigatpage -> navname", navname);
//     navigate(navname);
//   };

//   return (
//     <div className="page-body">
//       <div class="container-fluid">
//         <div class="page-header">
//           <div class="row">
//             <div class="col">
//               <div class="page-header-left">
//                 <h3>User</h3>
//                 <ol class="breadcrumb">
//                   <li class="breadcrumb-item">
//                     <a href="index.html">
//                       <i data-feather="home"></i>
//                     </a>
//                   </li>
//                   <li
//                     class="breadcrumb-item"
//                     onClick={() => {
//                       navigatpage("/user");
//                     }}
//                   >
//                     User Listing
//                   </li>
//                   {/* <li class="breadcrumb-item " onClick={() => { navigatpage("/addnewuser") }}>Add New User</li> */}
//                   <li class="breadcrumb-item active">View User Details</li>
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
//                 <h5>View User Details</h5>
//               </div>
//               <form class="form theme-form">
//                 <div class="card-body">
//                   <div class="row ">
//                     <div class="col-md-8 ">
//                       <div class="form-group">
//                         <label for="exampleFormControlFirstName">
//                           Project Name
//                         </label>
//                         <input
//                           class="form-control"
//                           id="exampleFormControlFirstName"
//                           type="text"
//                           placeholder="Project Name"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div class="row">
//                     <div class="col-md-8">
//                       <div class="form-group">
//                         <label for="exampleFormControlLastName">
//                           Last Interacted
//                         </label>
//                         <input
//                           class="form-control"
//                           id="exampleFormControlInput1"
//                           type="date"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div class="row">
//                     <div class="col-md-8">
//                       <div class="form-group">
//                         <label for="exampleFormControlInput1">Source</label>
//                         <input
//                           class="form-control"
//                           id="exampleFormControlInput1"
//                           type="email"
//                           placeholder="Source"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div class="row">
//                     <div class="col-md-8">
//                       <div class="form-group">
//                         <label for="exampleInputMobileNo">Status</label>
//                         <input
//                           class="form-control"
//                           id="exampleInputMobileNo"
//                           type="number"
//                           placeholder="Status"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* <div class="row pb-3">
//                     <div class="row pl-4">
//                       <label for="exampleInputMobileNo " className="pr-2">
//                         Gender
//                       </label>
//                       <div class="form-check pr-2">
//                         <input
//                           class="form-check-input "
//                           type="radio"
//                           name="flexRadioDefault"
//                           id="flexRadioDefault1"
//                         />
//                         <label class="form-check-label" for="flexRadioDefault1">
//                           Male
//                         </label>
//                       </div>
//                       <div class="form-check">
//                         <input
//                           class="form-check-input"
//                           type="radio"
//                           name="flexRadioDefault"
//                           id="flexRadioDefault2"
//                           checked
//                         />
//                         <label class="form-check-label" for="flexRadioDefault2">
//                           Female
//                         </label>
//                       </div>
//                     </div>
//                   </div>
//                   <div class="row">
//                     <div class="col-md-8">
//                       <div class="form-group">
//                         <label for="exampleInputMobileNo">DOB</label>
//                         <input
//                           class="form-control"
//                           id="exampleInputMobileNo"
//                           type="date"
//                           placeholder="DOB"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div class="row">
//                     <div class="col-md-8">
//                       <div class="form-group">
//                         <label for="exampleFormControlSelect9">Role</label>
//                         <select
//                           class="form-control digits"
//                           id="exampleFormControlSelect9"
//                         >
//                           <option>Source Head</option>
//                           <option>Other</option>
//                         </select>
//                       </div>
//                     </div>
//                   </div> */}
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* property required */}
//       <div class="container-fluid">
//         <div class="row ">
//           <div class="col-sm-12 ">
//             <div class="card">
//               <div class="card-header">
//                 <h5>Property Required</h5>
//               </div>
//               <form class="form theme-form">
//                 <div class="card-body">
//                   <div class="row">
//                     {/* <div class="col-md-7">
//                       <div class="form-group">
//                         <label for="exampleFormControlSelect9">
//                           Type Of Property
//                         </label>
//                         <select
//                           class="form-control digits"
//                           id="exampleFormControlSelect9"
//                         >
//                           <option>Flat</option>
//                           <option>Plot</option>
//                         </select>
//                       </div>
//                     </div> */}
//                     {/* <div class="col-md-4 d-flex align-items-end">
//                         <div for="exampleFormControlSelect9">Costing</div>
//                       </div> */}
//                   </div>
//                   <div class="row">
//                     <div class="col-md-11 row">
//                       <div class="col-md-4">
//                         <div class="form-group">
//                           <label for="exampleFormControlSelect9">
//                             Configuration
//                           </label>

//                           <select
//                             class="form-control digits"
//                             id="exampleFormControlSelect9"
//                           >
//                             <option>1 BHK</option>
//                             <option>2 BHK</option>
//                           </select>
//                         </div>
//                       </div>
//                       <div class="col-md-3">
//                         <div class="form-group">
//                           <label for="exampleFormControlSelect9">Area</label>
//                           <input
//                             class="form-control"
//                             id="exampleFormControlInput1"
//                             type="text"
//                           />
//                         </div>
//                       </div>
//                       <div class="col-md-2">
//                         <div class="form-group">
//                           <label for="exampleFormControlSelect9">Budget</label>
//                           <div class="d-flex flex-direction-row">
//                             <input
//                               class="form-control"
//                               id="exampleFormControlInput1"
//                               type="text"
//                               placeholder="Budget"
//                             />
//                             <select
//                               // class="form-control digits"
//                               class=""
//                               id="exampleFormControlSelect9"
//                             >
//                               <option>L</option>
//                               <option>C</option>
//                             </select>
//                           </div>
//                         </div>
//                       </div>

//                       <div class="col-md-3">
//                         <div class="form-group">
//                           <label for="exampleFormControlSelect9">
//                             Nature Of Funding
//                           </label>

//                           <select
//                             class="form-control digits"
//                             id="exampleFormControlSelect9"
//                             placeholder="Nature Of Funding"
//                           >
//                             <option>Loan</option>
//                             <option>option2</option>
//                           </select>
//                         </div>
//                       </div>

//                       <div class="col-md-4">
//                         <div class="form-group">
//                           <label for="exampleFormControlSelect9">Purpose</label>

//                           <select
//                             class="form-control digits"
//                             id="exampleFormControlSelect9"
//                             placeholder="Purpose"
//                           >
//                             <option>End Use</option>
//                             <option>option2</option>
//                           </select>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* <div className="row">
//                   <div className="col-md-12 d-flex justify-content-end">
//                     <div className="card-footer">
//                       <button
//                         className="btn btn-success"
//                         type="button"
//                         onClick={() => navigatpage("/addnewpropertynext")}
//                       >
//                         Next
//                       </button>
//                     </div>
//                   </div>
//                 </div> */}
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* Customer Details */}
//       <div class="container-fluid">
//         <div class="row ">
//           <div class="col-sm-12 ">
//             <div class="card">
//               <div class="card-header">
//                 <h5>Customer Details</h5>
//               </div>
//               <form class="form theme-form">
//                 <div class="card-body">
//                   <div class="row ">
//                     <div class="col-md-8 ">
//                       <div class="form-group">
//                         <label for="exampleFormControlFirstName">
//                           Visitor Name
//                         </label>
//                         <input
//                           class="form-control"
//                           id="exampleFormControlFirstName"
//                           type="text"
//                           placeholder="Visitor Name"
//                         />
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div class="row">
//                     <div class="col-md-8">
//                       <div class="form-group">
//                         <label for="exampleInputMobileNo">Location</label>
//                         <input
//                           class="form-control"
//                           id="exampleInputMobileNo"
//                           type="text"
//                           placeholder="Location"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div class="row">
//                     <div class="col-md-8">
//                       <div class="form-group">
//                         <label for="exampleInputMobileNo">Age</label>
//                         <input
//                           class="form-control"
//                           id="exampleInputMobileNo"
//                           type="number"
//                           placeholder="Location"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div class="row pb-3">
//                     <div class="row pl-4">
//                       <label for="exampleInputMobileNo " className="pr-2">
//                         Gender
//                       </label>
//                       <div class="form-check pr-2">
//                         <input
//                           class="form-check-input "
//                           type="radio"
//                           name="flexRadioDefault"
//                           id="flexRadioDefault1"
//                         />
//                         <label class="form-check-label" for="flexRadioDefault1">
//                           Male
//                         </label>
//                       </div>
//                       <div class="form-check">
//                         <input
//                           class="form-check-input"
//                           type="radio"
//                           name="flexRadioDefault"
//                           id="flexRadioDefault2"
//                           checked
//                         />
//                         <label class="form-check-label" for="flexRadioDefault2">
//                           Female
//                         </label>
//                       </div>
//                     </div>
//                   </div>
//                   {/* <div class="row">
//                     <div class="col-md-8">
//                       <div class="form-group">
//                         <label for="exampleInputMobileNo">DOB</label>
//                         <input
//                           class="form-control"
//                           id="exampleInputMobileNo"
//                           type="date"
//                           placeholder="DOB"
//                         />
//                       </div>
//                     </div>
//                   </div> */}
                  
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* Company Details */}
//       <div class="container-fluid">
//         <div class="row ">
//           <div class="col-sm-12 ">
//             <div class="card">
//               <div class="card-header">
//                 <h5>Company Details</h5>
//               </div>
//               <form class="form theme-form">
//                 <div class="card-body">
//                   <div class="row ">
//                     <div class="col-md-8 ">
//                       <div class="form-group">
//                         <label for="exampleFormControlFirstName">
//                           Name Of Occupation
//                         </label>
//                         <input
//                           class="form-control"
//                           id="exampleFormControlFirstName"
//                           type="text"
//                           placeholder="Name Of Occupation"
//                         />
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div class="row">
//                     <div class="col-md-8">
//                       <div class="form-group">
//                         <label for="exampleInputMobileNo">Company Name</label>
//                         <input
//                           class="form-control"
//                           id="exampleInputMobileNo"
//                           type="text"
//                           placeholder="Company Name"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div class="row">
//                     <div class="col-md-8">
//                       <div class="form-group">
//                         <label for="exampleInputMobileNo">Designation</label>
//                         <input
//                           class="form-control"
//                           id="exampleInputMobileNo"
//                           type="number"
//                           placeholder="Designation"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div class="row">
//                     <div class="col-md-8">
//                       <div class="form-group">
//                         <label for="exampleInputMobileNo">Office Address</label>
//                         <input
//                           class="form-control"
//                           id="exampleInputMobileNo"
//                           type="number"
//                           placeholder="Office Address"
//                         />
//                       </div>
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
// export default ViewUser;
