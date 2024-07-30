import {
    Home,
    User,
    Airplay,
    Book,
    Package,
    Youtube,
    Globe,
    Bold,
    Calendar,
    BookOpen,
    Briefcase
} from 'react-feather';

export const MENUITEMS = [
    {
        title: 'Dashboard', icon: Home, path: '/', type: 'link', badgeType: 'primary', active: false
    },
    // {
    //     title: 'Users', icon: User, type: 'sub', active: false, children: [
    //         { path: '/user', title: 'All User', type: 'link' },
    //         { path: '/addnewuser', title: 'Add New User', type: 'link' },
    //     ]
    // },
    {
        title: 'Subjects', icon: Book, type: 'sub', active: false, children: [
            { path: '/subjects', title: 'All Subjects', type: 'link' },
            { path: '/addnewsubjects', title: 'Add New Subjects', type: 'link' },
        ]
    },
    {
        title: 'Study Material', icon: Package, type: 'sub', active: false, children: [
            { path: '/studys', title: 'All Study Material', type: 'link' },
            { path: '/addnewstudy', title: 'Add New Study', type: 'link' },
        ]
    },
    {
        title: 'Study Video', icon: Youtube, type: 'sub', active: false, children: [
            { path: '/studyvideo', title: 'All Study Video', type: 'link' },
            { path: '/addnewstudyvideo', title: 'Add New Study Video', type: 'link' },
        ]
    },
    {

        title: 'Current Affairs', icon: Globe, type: 'sub', active: false, children: [
            { path: '/currentaffairs', title: 'All Current Affairs', type: 'link' },
            { path: '/addnewcurrentaffairs', title: 'Add New Current Affairs', type: 'link' },
        ]
    },
    {

        title: 'Blog', icon: Bold, type: 'sub', active: false, children: [
            { path: '/blog', title: 'All Blogs', type: 'link' },
            { path: '/addEditblogs', title: 'Add New Blog', type: 'link' },
        ]
    },
    {

        title: 'Whats New', icon: Calendar, type: 'sub', active: false, children: [
            { path: '/whatsnew', title: 'All Whats New', type: 'link' },
            { path: '/addwhatsnew', title: 'Add Whats New', type: 'link' },
        ]
    },
    {

        title: 'E-Book', icon: BookOpen, type: 'sub', active: false, children: [
            { path: '/ebook', title: 'All E-Book', type: 'link' },
            { path: '/addebook', title: 'Add E-Book', type: 'link' },
        ]
    },
    {

        title: 'Job', icon: Briefcase, type: 'sub', active: false, children: [
            { path: '/job', title: 'All Job', type: 'link' },
            { path: '/addjob', title: 'Add Job', type: 'link' },
        ]
    },
    {

        title: 'Daily Vocab', icon: Briefcase, type: 'sub', active: false, children: [
            { path: '/dailyvocab', title: 'All Daily Vocab', type: 'link' },
            { path: '/adddailyvocab', title: 'Add Daily Vocab', type: 'link' },
        ]
    },
    {

        title: 'Review', icon: Briefcase, type: 'sub', active: false, children: [
            { path: '/review', title: 'All Review', type: 'link' },
            { path: '/addreview', title: 'Add Review', type: 'link' },
        ]
    },
]
