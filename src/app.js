import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./navigation-bar";
import Home from "./home/home";

import ErrorPage from "./commons/errorhandling/error-page";
import styles from "./commons/styles/project-style.css";

import NoteContainer from "./note/note-container";
import NoteContainerDetails from "./note/note-container-details";
import NoteUpdateForm from "./note/components/note-update-form";

import { connect } from "react-redux";

import * as actions from "./store/actions/auth";
import LoginContainer from "./auth/login-container";
import RegisterUserContainer from "./auth/register-user-container";
import PanelContainer from "./panel/panel-container";
import Floor1Container from "./panel/floor1/floor1-container";
import Floor2Container from "./panel/floor2/floor2-container";

class App extends React.Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <div className={styles.back}>
        <Router>
          <div>
            <NavigationBar {...this.props} />
            <Routes>
              <Route exact path="/" component={Home} />

              <Route exact path="/panel" component={PanelContainer} />

              <Route exact path="/panel/floor1" component={Floor1Container} />

              <Route exact path="/panel/floor2" component={Floor2Container} />

              <Route exact path="/login" component={LoginContainer} />

              <Route exact path="/useradd" component={RegisterUserContainer} />

              <Route exact path="/api" component={NoteContainer} />

              <Route
                exact
                path="/api/details/:noteId"
                component={NoteContainerDetails}
              />

              <Route
                exact
                path="/api/update/:noteId"
                component={NoteUpdateForm}
              />

              <Route exact path="/error" component={ErrorPage} />

              <Route component={ErrorPage} />
            </Routes>
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateeToProps = (state) => {
  return {
    isAuthenticated: state.token !== null,
    isAdminUser: state.token === "1c62c5adc6a5deaa4014f28b47094e302e5980b8",
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateeToProps, mapDispatchToProps)(App);
