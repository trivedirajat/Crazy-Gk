import React, { Fragment } from "react";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 footer-copyright">
                        <p className="mb-0">
                            © 2024 CrazyGK. All rights reserved.
                        </p>
                    </div>
                    {/* <div className="col-md-6">
                        <p className="pull-right mb-0">
                            Hand crafted &amp; made with
                            <i className="fa fa-heart" />
                        </p>
                    </div> */}
                </div>
            </div>
        </footer>
    );
};
export default Footer;
