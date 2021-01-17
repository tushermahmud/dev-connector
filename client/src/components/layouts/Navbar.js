import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
const Navbar = ({ auth, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="#!" onClick={logout}>
          <i className="fas fa-sign-out-alt"></i>
          Logout{" "}
        </Link>{" "}
      </li>{" "}
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <i className="fas fa-user"></i>
        <Link to="/dashboard"> Dashboard </Link>{" "}
      </li>{" "}
      <li>
        <Link to="/register"> Register </Link>{" "}
      </li>{" "}
      <li>
        <Link to="/login"> Login </Link>{" "}
      </li>{" "}
    </ul>
  );
  return (
    <nav className="navbar bg-dark">
      <h1>
        <a href="index.html">
          <i className="fas fa-code"> </i> DevConnector{" "}
        </a>{" "}
      </h1>{" "}
      {!auth.loading && (
        <Fragment> {auth.isAuthenticated ? authLinks : guestLinks} </Fragment>
      )}{" "}
    </nav>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Navbar);
