import Loadable from "component/shared/Loadable";
import React, { lazy } from "react";
import { Navigate } from "react-router-dom";

/* ***Layouts**** */
const MainLayout = Loadable(lazy(() => import("../Layout/MainLayout")));
const BlankLayout = Loadable(lazy(() => import("../Layout/BlankLayout")));

/* ****Pages***** */
const User = Loadable(lazy(() => import("../screens/Users/UserTable")));
const EditUser = Loadable(lazy(() => import("../screens/Users/EditUser")));
const ViewUser = Loadable(lazy(() => import("../screens/Users/ViewUser")));
const AddNewUser = Loadable(lazy(() => import("../screens/Users/AddNewUser")));
const AddQuiz = Loadable(lazy(() => import("../screens/Quiz/AddQuiz")));
const Quiz = Loadable(lazy(() => import("../screens/Quiz/Quiz")));
const AddQuestions = Loadable(
  lazy(() => import("screens/Questions/AddQuestions"))
);
const Subjects = Loadable(lazy(() => import("screens/Categories")));
const AddEditSubjects = Loadable(
  lazy(() => import("screens/Categories/AddEditSubjects"))
);
const Study = Loadable(lazy(() => import("screens/Studymaterial")));
const AddEditStudyMaterial = Loadable(
  lazy(() => import("screens/Studymaterial/AddEditStudyMaterial"))
);
const StudyVideoList = Loadable(lazy(() => import("screens/Studyvideo")));
const AddEditStudyVideo = Loadable(
  lazy(() => import("screens/Studyvideo/AddEditStudyVideo"))
);
const CurrentAffairsList = Loadable(
  lazy(() => import("screens/Currentaffairs"))
);
const AddEditCurrentAffairs = Loadable(
  lazy(() => import("screens/Currentaffairs/AddEditCurrentAffairs"))
);
const Blog = Loadable(lazy(() => import("screens/blog")));
const AddEditBlog = Loadable(lazy(() => import("screens/blog/AddEditBlog")));

const WhatsNew = Loadable(lazy(() => import("screens/Whatsnew")));
const AddEditWhatsNew = Loadable(
  lazy(() => import("screens/Whatsnew/AddEditWhatsNew"))
);
const EBook = Loadable(lazy(() => import("screens/E-book")));
const AddEditEbooks = Loadable(
  lazy(() => import("screens/E-book/AddEditEbooks"))
);
const Job = Loadable(lazy(() => import("screens/Job")));
const AddEditJob = Loadable(lazy(() => import("screens/Job/AddEditJob")));
const DailyVocab = Loadable(lazy(() => import("screens/DailyVocab")));
const AddEditDailyVocab = Loadable(
  lazy(() => import("screens/DailyVocab/AddEditDailyVocab"))
);
const Reviews = Loadable(lazy(() => import("screens/Review")));
const ReviewsListing = Loadable(
  lazy(() => import("screens/Review/AddNewReview"))
);
const AllQuestions = Loadable(
  lazy(() => import("screens/Questions/AllQuestions"))
);
const EditQuestion = Loadable(
  lazy(() => import("screens/Questions/EditQuestion"))
);
const Login = Loadable(lazy(() => import("screens/login/Login")));

const Dashboard = Loadable(lazy(() => import("screens/Dashboard/index")));
const Error = Loadable(lazy(() => import("../component/shared/Error")));

const Router = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Navigate to="/dashboard" /> },
      { path: "/dashboard", exact: true, element: <Dashboard /> },
      {
        path: "/users",
        element: <User />,
      },
      {
        path: "/edituser",
        element: <EditUser />,
      },
      {
        path: "/viewuser",
        element: <ViewUser />,
      },
      {
        path: "/addnewuser",
        element: <AddNewUser />,
      },
      {
        path: "/subjects",
        element: <Subjects />,
      },
      {
        path: "/studys",
        element: <Study />,
      },
      {
        path: "/studyvideo",
        element: <StudyVideoList />,
      },
      {
        path: "/currentaffairs",
        element: <CurrentAffairsList />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/addnewstudy",
        element: <AddEditStudyMaterial />,
      },
      {
        path: "/editStudys/:id",
        element: <AddEditStudyMaterial isEdit />,
      },
      {
        path: "/addnewstudyvideo",
        element: <AddEditStudyVideo />,
      },
      {
        path: "/editstudyvideo/:id",
        element: <AddEditStudyVideo isEdit />,
      },
      {
        path: "/addnewcurrentaffairs",
        element: <AddEditCurrentAffairs />,
      },
      {
        path: "/editcurrentaffairs/:id",
        element: <AddEditCurrentAffairs isEdit />,
      },
      {
        path: "/addblog",
        element: <AddEditBlog />,
      },
      {
        path: "/editblog/:id",
        element: <AddEditBlog isEdit />,
      },
      {
        path: "/editsubject/:id",
        element: <AddEditSubjects isedit />,
      },
      {
        path: "/subjects/addnew",
        element: <AddEditSubjects />,
      },
      {
        path: "/whatsnew",
        element: <WhatsNew />,
      },
      {
        path: "/addwhatsnew",
        element: <AddEditWhatsNew />,
      },
      {
        path: "/editwhatsnew/:id",
        element: <AddEditWhatsNew isEdit />,
      },
      {
        path: "/ebooks",
        element: <EBook />,
      },
      {
        path: "/addebook",
        element: <AddEditEbooks />,
      },
      {
        path: "/editebook/:id",
        element: <AddEditEbooks isEdit />,
      },

      {
        path: "/job",
        element: <Job />,
      },
      {
        path: "/addjob",
        element: <AddEditJob />,
      },
      {
        path: "/editjob/:id",
        element: <AddEditJob edit />,
      },
      {
        path: "/dailyvocab",
        element: <DailyVocab />,
      },
      {
        path: "/adddailyvocab",
        element: <AddEditDailyVocab />,
      },
      {
        path: "/editDailyVocab/:id",
        element: <AddEditDailyVocab isEdit />,
      },
      {
        path: "/review",
        element: <Reviews />,
      },
      {
        path: "/addreview",
        element: <ReviewsListing />,
      },
      {
        path: "/editreview/:reviewID",
        element: <ReviewsListing edit />,
      },
      {
        path: "/addnewquestions",
        element: <AddQuestions />,
      },
      {
        path: "/Questions",
        element: <AllQuestions />,
      },
      {
        path: "/EditQuestion/:Questionid",
        element: <EditQuestion />,
      },
      {
        path: "/addnewquiz",
        element: <AddQuiz />,
      },
      {
        path: "/quiz",
        element: <Quiz />,
      },
      {
        path: "/editQuiz/:Quizid",
        element: <AddQuiz Isedit />,
      },
      // { path: "*", element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: "/auth",
    element: <BlankLayout />,
    children: [
      { path: "404", element: <Error /> },
      //   { path: "/auth/register", element: <Register /> },
      { path: "/auth/login", element: <Login /> },
      { path: "*", element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
