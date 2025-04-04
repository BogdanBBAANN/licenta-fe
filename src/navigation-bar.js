import React from "react";
import bulb from "./commons/images/bulb.png";

import { Nav, Navbar, NavbarBrand, NavLink } from "reactstrap";
import * as actions from "./store/actions/auth";
import { connect } from "react-redux";
import myWithRouter from "./myWithRouter/withRouter";

const textStyle = {
  color: "white",
  textDecoration: "none",
};

const NavigationBar = (props) => (
  <div>
    <Navbar color="dark" light expand="md">
      <NavbarBrand href="/">
        <img src={bulb} width={"50"} height={"35"} />
      </NavbarBrand>
      {props.isAuthenticated ? (
        <>
          <Nav className="mr-auto" navbar>
            <NavLink style={textStyle} href="/panel">
              Main control panel
            </NavLink>
            <NavLink style={textStyle} href="/api">
              Notes
            </NavLink>
          </Nav>
          <Nav className="ml-auto" navbar>
            <NavLink
              style={textStyle}
              align={"rightTop"}
              onClick={props.logout}
            >
              Logout
            </NavLink>
            {props.isAdminUser ? (
              <NavLink style={textStyle} href="/useradd">
                Add user to system
              </NavLink>
            ) : (
              <></>
            )}
          </Nav>
        </>
      ) : (
        <NavLink style={textStyle} align={"rightTop"} href="/login">
          Login
        </NavLink>
      )}
    </Navbar>
  </div>
);

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};

export default connect(null, mapDispatchToProps)(myWithRouter(NavigationBar));
