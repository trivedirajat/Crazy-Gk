import React from "react";
import { Route, Routes } from "react-router-dom";

import Header from "../component/Header";
import SideBar from "../component/SideNav";
import Footer from "../component/Footer";
import Default from "../screens/Dashboard";
import User from "../screens/Users/index";
import EditUser from "../screens/Users/EditUser";
import ViewUser from "../screens/Users/ViewUser";
import AddNewUser from "../screens/Users/AddNewUser";
import AddQuiz from "../screens/Quiz/AddQuiz";
import Quiz from "../screens/Quiz/Quiz";
import EditCategories from "screens/Categories/EditCategories";
import AddQuestions from "screens/Questions/AddQuestions";
import Subjects from "screens/Categories";
import SubjectsListing from "screens/Categories/AddNewSubjects";
import Study from "screens/Studymaterial";
import AddStudysMaterial from "screens/Studymaterial/AddNewStudys";
import StudyVideoList from "screens/Studyvideo";
import AddStudyVideo from "screens/Studyvideo/AddNewVideo";
import CurrentAffairsList from "screens/Currentaffairs";
import AddCurrentAffairs from "screens/Currentaffairs/AddNewAffairs";
import Blog from "screens/blog";
import AddBlogs from "screens/blog/AddNewBlogs";
import EditNewStudys from "screens/Studymaterial/EditNewStudys";
import EditStudyVideo from "screens/Studyvideo/EditNewVideo";
import EditCurrentAffairs from "screens/Currentaffairs/EditAffairs";
import WhatsNew from "screens/Whatsnew";
import AddWhatsNew from "screens/Whatsnew/AddNewWhatsNew";
import EBook from "screens/E-book";
import AddEBook from "screens/E-book/AddNewEbook";
import Job from "screens/Job";
import AddNewJob from "screens/Job/AddNewJob";
import DailyVocab from "screens/DailyVocab";
import AddNewDailyVocab from "screens/DailyVocab/AddNewDailyVocabs";
import Reviews from "screens/Review";
import ReviewsListing from "screens/Review/AddNewReview";
import { useSelector } from "react-redux";
import { selectValidate } from "../redux/Slices/AuthSlice";
import AllQuestions from "screens/Questions/AllQuestions";
import EditQuestion from "screens/Questions/EditQuestion";
import UserTable from "screens/Users/UserTable";

function AppRoutes() {
  return (
    <div class="page-wrapper">
      <Header />
      <div className="page-body-wrapper">
        <SideBar />
        <Routes>
          <Route path={`${process.env.PUBLIC_URL}/`} element={<Default />} />
          {/* <Route path={`${process.env.PUBLIC_URL}/user/*`} element={<User />}>
        <Route path={`edituser`} element={<EditUser />} />
        <Route path={`viewuser`} element={<ViewUser />} />
        <Route path={`addnewuser`} element={<AddNewUser />} />
        </Route> */}
          {/*<Route path={`${process.env.PUBLIC_URL}/login/*`} element={<Signin />} />*/}
          <Route path={`${process.env.PUBLIC_URL}/user/*`} element={<User />} />
          <Route
            path={`${process.env.PUBLIC_URL}/edituser`}
            element={<EditUser />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/viewuser`}
            element={<ViewUser />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/addnewuser`}
            element={<AddNewUser />}
          />
          {/* // Categories */}
          <Route
            path={`${process.env.PUBLIC_URL}/subjects/*`}
            element={<Subjects />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/studys/*`}
            element={<Study />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/studyvideo/*`}
            element={<StudyVideoList />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/currentaffairs/*`}
            element={<CurrentAffairsList />}
          />
          <Route path={`${process.env.PUBLIC_URL}/blog/*`} element={<Blog />} />
          <Route
            path={`${process.env.PUBLIC_URL}/addnewstudy`}
            element={<AddStudysMaterial />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/editStudys/:id`}
            element={<EditNewStudys />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/addnewstudyvideo`}
            element={<AddStudyVideo />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/editstudyvideo/:id`}
            element={<EditStudyVideo />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/addnewcurrentaffairs`}
            element={<AddCurrentAffairs />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/editcurrentaffairs/:id`}
            element={<EditCurrentAffairs />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/addEditblogs`}
            element={<AddBlogs />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/editcategories/:id`}
            element={<EditCategories />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/addnewsubjects/`}
            element={<SubjectsListing />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/whatsnew/`}
            element={<WhatsNew />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/addwhatsnew/`}
            element={<AddWhatsNew />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/ebook/`}
            element={<EBook />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/addebook/`}
            element={<AddEBook />}
          />
          <Route path={`${process.env.PUBLIC_URL}/job/`} element={<Job />} />
          <Route
            path={`${process.env.PUBLIC_URL}/addjob/`}
            element={<AddNewJob />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/editjob/:jobID`}
            element={<AddNewJob edit />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/dailyvocab/`}
            element={<DailyVocab />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/adddailyvocab/`}
            element={<AddNewDailyVocab />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/review/`}
            element={<Reviews />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/addreview/`}
            element={<ReviewsListing />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/editreview/:reviewID`}
            element={<ReviewsListing edit />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/addnewquestions/`}
            element={<AddQuestions />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/Questions/`}
            element={<AllQuestions />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/EditQuestion/:Questionid`}
            element={<EditQuestion />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/addnewquiz/`}
            element={<AddQuiz />}
          />
          <Route path={`${process.env.PUBLIC_URL}/quiz/`} element={<Quiz />} />
          <Route
            path={`${process.env.PUBLIC_URL}/editQuiz/:Quizid`}
            element={<AddQuiz Isedit />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/users`}
            element={<UserTable />}
          />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}
function Routers() {
  // const [isValidate, setisValidate] = useState(false)
  const isValidate = useSelector(selectValidate);
  console.log("isValidate", isValidate);
  return (
    <div>
      {
        // isValidate ? <AppRoutes /> : <DefaultRouters />
        <AppRoutes />
      }
    </div>
  );
}
export default Routers;

// import React from "react";
// import {
//   createBrowserRouter,
//   Outlet,
//   Route,
//   RouterProvider,
//   Routes,
// } from "react-router-dom";

// import Header from "../component/Header";
// import SideBar from "../component/SideNav";
// import Footer from "../component/Footer";
// import Default from "../screens/Dashboard";
// import User from "../screens/Users/index";
// import EditUser from "../screens/Users/EditUser";
// import ViewUser from "../screens/Users/ViewUser";
// import AddNewUser from "../screens/Users/AddNewUser";
// import AddQuiz from "../screens/Quiz/AddQuiz";
// import Quiz from "../screens/Quiz/Quiz";
// import EditCategories from "screens/Categories/EditCategories";
// import AddQuestions from "screens/Questions/AddQuestions";
// import Subjects from "screens/Categories";
// import SubjectsListing from "screens/Categories/AddNewSubjects";
// import Study from "screens/Studymaterial";
// import AddStudysMaterial from "screens/Studymaterial/AddNewStudys";
// import StudyVideoList from "screens/Studyvideo";
// import AddStudyVideo from "screens/Studyvideo/AddNewVideo";
// import CurrentAffairsList from "screens/Currentaffairs";
// import AddCurrentAffairs from "screens/Currentaffairs/AddNewAffairs";
// import Blog from "screens/blog";
// import AddBlogs from "screens/blog/AddNewBlogs";
// import EditNewStudys from "screens/Studymaterial/EditNewStudys";
// import EditStudyVideo from "screens/Studyvideo/EditNewVideo";
// import EditCurrentAffairs from "screens/Currentaffairs/EditAffairs";
// import WhatsNew from "screens/Whatsnew";
// import AddWhatsNew from "screens/Whatsnew/AddNewWhatsNew";
// import EBook from "screens/E-book";
// import AddEBook from "screens/E-book/AddNewEbook";
// import Job from "screens/Job";
// import AddNewJob from "screens/Job/AddNewJob";
// import DailyVocab from "screens/DailyVocab";
// import AddNewDailyVocab from "screens/DailyVocab/AddNewDailyVocabs";
// import Reviews from "screens/Review";
// import ReviewsListing from "screens/Review/AddNewReview";
// import AllQuestions from "screens/Questions/AllQuestions";
// import EditQuestion from "screens/Questions/EditQuestion";
// import Login from "screens/login/Login";
// import ScrollToTop from "ScrollToTop";

// const router = createBrowserRouter([
//   {
//     path: "/login",
//     element: <AuthLayout />,
//     children: [
//       {
//         path: "",
//         element: <Login />,
//       },
//     ],
//   },
//   {
//     path: "/",
//     element: <MainLayout />,
//     children: [
//       {
//         path: "",
//         element: <Default />,
//       },
//       {
//         path: "/user",
//         element: <User />,
//       },
//       {
//         path: "/edituser",
//         element: <EditUser />,
//       },
//       {
//         path: "/viewuser",
//         element: <ViewUser />,
//       },
//       {
//         path: "/addnewuser",
//         element: <AddNewUser />,
//       },
//       {
//         path: "/subjects",
//         element: <Subjects />,
//       },
//       {
//         path: "/studys",
//         element: <Study />,
//       },
//       {
//         path: "/studyvideo",
//         element: <StudyVideoList />,
//       },
//       {
//         path: "/currentaffairs",
//         element: <CurrentAffairsList />,
//       },
//       {
//         path: "/blog",
//         element: <Blog />,
//       },
//       {
//         path: "/addnewstudy",
//         element: <AddStudysMaterial />,
//       },
//       {
//         path: "/editStudys/:id",
//         element: <EditNewStudys />,
//       },
//       {
//         path: "/addnewstudyvideo",
//         element: <AddStudyVideo />,
//       },
//       {
//         path: "/editstudyvideo/:id",
//         element: <EditStudyVideo />,
//       },
//       {
//         path: "/addnewcurrentaffairs",
//         element: <AddCurrentAffairs />,
//       },
//       {
//         path: "/editcurrentaffairs/:id",
//         element: <EditCurrentAffairs />,
//       },
//       {
//         path: "/addEditblogs",
//         element: <AddBlogs />,
//       },
//       {
//         path: "/editcategories/:id",
//         element: <EditCategories />,
//       },
//       {
//         path: "/addnewsubjects",
//         element: <SubjectsListing />,
//       },
//       {
//         path: "/whatsnew",
//         element: <WhatsNew />,
//       },
//       {
//         path: "/addwhatsnew",
//         element: <AddWhatsNew />,
//       },
//       {
//         path: "/ebook",
//         element: <EBook />,
//       },
//       {
//         path: "/addebook",
//         element: <AddEBook />,
//       },
//       {
//         path: "/job",
//         element: <Job />,
//       },
//       {
//         path: "/addjob",
//         element: <AddNewJob />,
//       },
//       {
//         path: "/editjob/:jobID",
//         element: <AddNewJob edit />,
//       },
//       {
//         path: "/dailyvocab",
//         element: <DailyVocab />,
//       },
//       {
//         path: "/adddailyvocab",
//         element: <AddNewDailyVocab />,
//       },
//       {
//         path: "/review",
//         element: <Reviews />,
//       },
//       {
//         path: "/addreview",
//         element: <ReviewsListing />,
//       },
//       {
//         path: "/editreview/:reviewID",
//         element: <ReviewsListing edit />,
//       },
//       {
//         path: "/addnewquestions",
//         element: <AddQuestions />,
//       },
//       {
//         path: "/Questions",
//         element: <AllQuestions />,
//       },
//       {
//         path: "/EditQuestion/:Questionid",
//         element: <EditQuestion />,
//       },
//       {
//         path: "/addnewquiz",
//         element: <AddQuiz />,
//       },
//       {
//         path: "/quiz",
//         element: <Quiz />,
//       },
//       {
//         path: "/editQuiz/:Quizid",
//         element: <AddQuiz Isedit />,
//       },
//     ],
//   },
// ]);

// // Example of MainLayout (Header, Sidebar, Footer)K
// function MainLayout({ children }) {
//   return (
//     <ScrollToTop>
//       <div className="page-wrapper">
//         <Header />
//         <div className="page-body-wrapper">
//           <SideBar />
//           <div className="page-content">{<Outlet />}</div>
//         </div>
//         <Footer />
//       </div>
//     </ScrollToTop>
//   );
// }

// function AuthLayout({ children }) {
//   return <div className="auth-wrapper">{<Outlet />}</div>;
// }
// function Routers() {
//   return <RouterProvider router={router} />;
// }
// export default Routers;
