import React from "react";




const Index = () => {


    return (
        <div className="page-body">
            <div className="container-fluid">
                <div className="page-header">
                    <div className="row">
                        <div className="col">
                            <div className="page-header-left">
                                <h3>Dashboard</h3>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <a href="/">
                                            <i class="fa fa-home theme-fa-icon" aria-hidden="true"></i>
                                        </a>
                                    </li>

                                </ol>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="chart-widget-dashboard">
                                            <div className="media">
                                                <div className="media-body">
                                                    <h5 className="mt-0 mb-0 f-w-600">
                                                        <i data-feather="dollar-sign" />
                                                        <span className="counter">Categories</span>
                                                    </h5>
                                                    <h5 classname="dashboard-count">50</h5>
                                                </div>
                                                <i data-feather="tag" />
                                            </div>
                                            <div className="dashboard-chart-container">
                                                <div className="small-chart-gradient-1" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="chart-widget-dashboard">
                                            <div className="media">
                                                <div className="media-body">
                                                    <h5 className="mt-0 mb-0 f-w-600">
                                                        <i data-feather="dollar-sign" />
                                                        <span className="counter">Study Material</span>
                                                    </h5>
                                                    <h5 classname="dashboard-count">20</h5>
                                                </div>
                                                <i data-feather="shopping-cart" />
                                            </div>
                                            <div className="dashboard-chart-container">
                                                <div className="small-chart-gradient-2" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="chart-widget-dashboard">
                                            <div className="media">
                                                <div className="media-body">
                                                    <h5 className="mt-0 mb-0 f-w-600">
                                                        <i data-feather="dollar-sign" />
                                                        <span className="counter">Current Affairs</span>
                                                    </h5>
                                                    <h5 classname="dashboard-count">10</h5>
                                                </div>
                                                <i data-feather="sun" />
                                            </div>
                                            <div className="dashboard-chart-container">
                                                <div className="small-chart-gradient-3" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*<div className="col-lg-12">
                        <div className="card">
                            <div className="card-header b-l-primary"><h5>Property Site </h5></div>
                            <div className="card-body">

                            </div>
                        </div>
    </div>*/}
                    <div className="col-xl-6">
                        <div className="card height-equal">
                            <div className="card-header card-header-border">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <h5>Role</h5>
                                    </div>
                                    {/* <div className="col-sm-6">
                                        <div className="pull-right right-header">
                                            <span>Month</span>
                                            <span>
                                                <button className="btn btn-primary btn-pill">Today</button>
                                            </span>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="new-users">
                                    <div className="media">
                                        <img
                                            className="rounded-circle image-radius m-r-15"
                                            src="../../assets/gktricks/gktricks.jpg"
                                            alt=""
                                        />
                                        <div className="media-body">
                                            <h6 className="mb-0 f-w-700">Nick Stone</h6>
                                            <p>Visual Designer, Github Inc</p>
                                        </div>
                                        {/* <span className="pull-right">
                                            <button className="btn btn-pill btn-outline-light">
                                                Follow
                                            </button>
                                        </span> */}
                                    </div>
                                    <div className="media">
                                        <img
                                            className="rounded-circle image-radius m-r-15"
                                            src="../../assets/gktricks/gktricks.jpg"
                                            alt=""
                                        />
                                        <div className="media-body">
                                            <h6 className="mb-0 f-w-700">Milano Esco</h6>
                                            <p>Visual Designer, Github Inc</p>
                                        </div>
                                        {/* <span className="pull-right">
                                            <button className="btn btn-pill btn-outline-light">
                                                Follow
                                            </button>
                                        </span> */}
                                    </div>
                                    <div className="media">
                                        <img
                                            className="rounded-circle image-radius m-r-15"
                                            src="../../assets/gktricks/gktricks.jpg"
                                            alt=""
                                        />
                                        <div className="media-body">
                                            <h6 className="mb-0 f-w-700">Wiltor Noice</h6>
                                            <p>Visual Designer, Github Inc</p>
                                        </div>
                                        {/* <span className="pull-right">
                                            <button className="btn btn-pill btn-outline-light">
                                                Follow
                                            </button>
                                        </span> */}
                                    </div>
                                    <div className="media">
                                        <img
                                            className="rounded-circle image-radius m-r-15"
                                            src="../../assets/gktricks/gktricks.jpg"
                                            alt=""
                                        />
                                        <div className="media-body">
                                            <h6 className="mb-0 f-w-700">Anna Strong</h6>
                                            <p>Visual Designer, Github Inc</p>
                                        </div>
                                        {/* <span className="pull-right">
                                            <button className="btn btn-pill btn-outline-light">
                                                Follow
                                            </button>
                                        </span> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="card height-equal">
                            <div className="card-header card-header-border">
                                <div className="row">
                                    <div className="col-sm-7">
                                        <h5>Master</h5>
                                    </div>
                                    <div className="col-sm-5">
                                        <div className="pull-right right-header">
                                            {/* <div className="onhover-dropdown">
                                                <button className="btn btn-primary btn-pill" type="button">
                                                    All{" "}
                                                    <span className="pr-0">
                                                        <i className="fa fa-angle-down" />
                                                    </span>
                                                </button>
                                                <div className="onhover-show-div right-header-dropdown">
                                                    <a className="d-block" href="#">
                                                        Order
                                                    </a>
                                                    <a className="d-block" href="#">
                                                        Download
                                                    </a>
                                                    <a className="d-block" href="#">
                                                        Trash
                                                    </a>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body recent-notification">
                                <div className="media">
                                    <h6>09:00</h6>
                                    <div className="media-body">
                                        <span>Lorem ipsum dolor sit amit,consectetur eiusmdd.</span>
                                        <p className="f-12">By Kan</p>
                                    </div>
                                </div>
                                <div className="media">
                                    <h6>10:50</h6>
                                    <div className="media-body">
                                        <span>Lorem ipsum.</span>
                                        <p className="f-12">By Tailer</p>
                                    </div>
                                </div>
                                <div className="media">
                                    <h6>01:00</h6>
                                    <div className="media-body">
                                        <span>Lorem ipsum dolor sit amit,consectetur eiusmdd.</span>
                                        <p className="f-12">By Kaint</p>
                                    </div>
                                </div>
                                <div className="media">
                                    <h6>05:00</h6>
                                    <div className="media-body">
                                        <span>Lorem ipsum dolor sit amit.</span>
                                        <p className="f-12">By call</p>
                                    </div>
                                </div>
                                <div className="media">
                                    <h6>12:00</h6>
                                    <div className="media-body">
                                        <span>Lorem ipsum dolor sit.</span>
                                        <p className="f-12">By Waiter</p>
                                    </div>
                                </div>
                                <div className="media">
                                    <h6>08:20</h6>
                                    <div className="media-body">
                                        <span>
                                            Lorem ipsum dolor sit amit,consectetur eiusmdd dolor sit amit.
                                        </span>
                                        <p className="f-12">By Comman</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Index;
