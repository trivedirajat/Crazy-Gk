import {
  IconBold,
  IconBook,
  IconBriefcase,
  IconCalendar,
  IconGlobe,
  IconLayoutDashboard,
  IconPackage,
  IconPencil,
  IconUserPlus,
  IconVideo,
} from "@tabler/icons-react";

const Menuitems = [
  // {
  //   navlabel: true,
  //   subheader: "Home",
  // },
  {
    id: 1,
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/dashboard",
  },
  {
    id: 6,
    title: "Users",
    icon: IconUserPlus,
    href: "/users",
  },
  {
    id: 9,
    title: "Subjects",
    icon: IconBook,
    type: "sub",
    children: [
      {
        id: 10,
        title: "All Subjects",
        href: "/subjects",
      },
      {
        id: 11,
        title: "Add New Subjects",
        href: "/subjects/addnew",
      },
    ],
  },
  {
    id: 12,
    title: "Study Material",
    icon: IconPackage,
    type: "sub",
    children: [
      {
        id: 13,
        title: "All Study Material",
        href: "/studys",
      },
      {
        id: 14,
        title: "Add New Study",
        href: "/addnewstudy",
      },
    ],
  },
  {
    id: 15,
    title: "Study Video",
    icon: IconVideo,
    type: "sub",
    children: [
      {
        id: 16,
        title: "All Study Video",
        href: "/studyvideo",
      },
      {
        id: 17,
        title: "Add New Study Video",
        href: "/addnewstudyvideo",
      },
    ],
  },
  {
    id: 18,
    title: "Current Affairs",
    icon: IconGlobe,
    type: "sub",
    children: [
      {
        id: 19,
        title: "All Current Affairs",
        href: "/currentaffairs",
      },
      {
        id: 20,
        title: "Add New Current Affairs",
        href: "/addnewcurrentaffairs",
      },
    ],
  },
  {
    id: 21,
    title: "Blog",
    icon: IconBold,
    type: "sub",
    children: [
      {
        id: 22,
        title: "All Blogs",
        href: "/blog",
      },
      {
        id: 23,
        title: "Add New Blog",
        href: "/addblog",
      },
    ],
  },
  {
    id: 24,
    title: "Questions",
    icon: IconPencil,
    type: "sub",
    children: [
      {
        id: 25,
        title: "All Questions",
        href: "/questions",
      },
      {
        id: 26,
        title: "Add New Questions",
        href: "/addnewquestions",
      },
    ],
  },
  {
    id: 27,
    title: "Quiz",
    icon: IconPencil,
    type: "sub",
    children: [
      {
        id: 28,
        title: "All Quiz",
        href: "/quiz",
      },
      {
        id: 29,
        title: "Add New Quiz",
        href: "/addnewquiz",
      },
    ],
  },
  {
    id: 30,
    title: "Whats New",
    icon: IconCalendar,
    type: "sub",
    children: [
      {
        id: 31,
        title: "All Whats New",
        href: "/whatsnew",
      },
      {
        id: 32,
        title: "Add Whats New",
        href: "/addwhatsnew",
      },
    ],
  },
  {
    id: 33,
    title: "E-Book",
    icon: IconBook,
    type: "sub",
    children: [
      {
        id: 34,
        title: "All E-Book",
        href: "/ebooks",
      },
      {
        id: 35,
        title: "Add E-Book",
        href: "/addebook",
      },
    ],
  },
  {
    id: 36,
    title: "Job",
    icon: IconBriefcase,
    type: "sub",
    children: [
      {
        id: 37,
        title: "All Job",
        href: "/job",
      },
      {
        id: 38,
        title: "Add Job",
        href: "/addjob",
      },
    ],
  },
  {
    id: 39,
    title: "Daily Vocab",
    icon: IconBriefcase,
    type: "sub",
    children: [
      {
        id: 40,
        title: "All Daily Vocab",
        href: "/dailyvocab",
      },
      {
        id: 41,
        title: "Add Daily Vocab",
        href: "/adddailyvocab",
      },
    ],
  },
  {
    id: 42,
    title: "Review",
    icon: IconBriefcase,
    type: "sub",
    children: [
      {
        id: 43,
        title: "All Review",
        href: "/review",
      },
      {
        id: 44,
        title: "Add Review",
        href: "/addreview",
      },
    ],
  },
];

export default Menuitems;
