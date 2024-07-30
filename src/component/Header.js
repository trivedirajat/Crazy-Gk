import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate();
    const [sidebar, setSidebar] = useState(false)


    const openclose = () => {
        if (sidebar) {
            setSidebar(!sidebar)
            document.querySelector(".page-main-header").classList.remove('open');
            document.querySelector(".page-sidebar").classList.remove('open');
        } else {
            setSidebar(!sidebar)
            document.querySelector(".page-main-header").classList.add('open');
            document.querySelector(".page-sidebar").classList.add('open');
        }

    }



    return (

        <div className="page-main-header">
            <div className="main-header-right row">
                <div className="main-header-left d-lg-none">
                    <div className="logo-wrapper">
                        {/*<a href="index.html">
                            <img src="/assets/images/endless-logo.png" alt="" />
    </a>*/}
                    </div>
                </div>
                <div className="mobile-sidebar d-block">
                    <div className="media-body text-right switch-sm">
                        <label className="switch">
                            <a onClick={() => openclose()}>
                                <i class="fa fa-bars theme-fa-icon" aria-hidden="true"></i>
                            </a>
                        </label>
                    </div>
                </div>
                <div className="nav-right col p-0">
                    <ul className="nav-menus">
                        {/* <li>
                            <form className="form-inline search-form" action="#" method="get">
                                <div className="form-group">
                                    <div className="Typeahead Typeahead--twitterUsers">
                                        <div className="u-posRelative">
                                            <input
                                                className="Typeahead-input form-control-plaintext"
                                                id="demo-input"
                                                type="text"
                                                name="q"
                                                placeholder="Search..."
                                            />
                                            <div
                                                className="spinner-border Typeahead-spinner"
                                                role="status"
                                            >
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                            <span className="d-sm-none mobile-search">
                                                <i data-feather="search" />
                                            </span>
                                        </div>
                                        <div className="Typeahead-menu" />
                                    </div>
                                </div>
                            </form>
                        </li> */}
                        <li>
                            <a
                                className="text-dark"
                                href="#!"
                                onclick="javascript:toggleFullScreen()"
                            >
                                <i data-feather="maximize" />
                            </a>
                        </li>

                    </ul>
                    <div className="d-lg-none mobile-toggle pull-right">
                        <i data-feather="more-horizontal" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;