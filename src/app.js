import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NavigationBar from './navigation-bar'
import Home from './home/home';

import ErrorPage from './commons/errorhandling/error-page';
import styles from './commons/styles/project-style.css';

import NoteContainer from "./note/note-container";
import 'antd/dist/antd.css';
import NoteContainerDetails from "./note/note-container-details";
import NoteUpdateForm from "./note/components/note-update-form";

import {connect} from 'react-redux';
import mapStateToProps from "react-redux/lib/connect/mapStateToProps";

import * as actions from './store/actions/auth';
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
                    <NavigationBar {...this.props}/>
                    <Switch>

                        <Route
                            exact
                            path='/'
                            // render={() => <Home/>}
                            component={Home}
                        />

                        <Route
                            exact
                            path='/panel'
                            // render={() => <Home/>}
                            component={PanelContainer}
                        />

                        <Route
                            exact
                            path='/panel/floor1'
                            // render={() => <Home/>}
                            component={Floor1Container}
                        />

                        <Route
                            exact
                            path='/panel/floor2'
                            // render={() => <Home/>}
                            component={Floor2Container}
                        />

                        <Route
                            exact
                            path='/login'
                            component={LoginContainer}
                        />

                        <Route
                            exact
                            path='/useradd'
                            component={RegisterUserContainer}
                        />

                        <Route
                            exact
                            path='/api'
                            // render={() => <NoteContainer/>}
                            component={NoteContainer}
                        />

                        <Route
                            exact
                            path='/api/details/:noteId'
                            // render={() => <NoteContainer/>}
                            component={NoteContainerDetails}
                        />

                        <Route
                            exact
                            path='/api/update/:noteId'
                            // render={() => <NoteContainer/>}
                            component={NoteUpdateForm}
                        />

                        {/*Error*/}
                        <Route
                            exact
                            path='/error'
                            // render={() => <ErrorPage/>}
                            component={ErrorPage}
                        />

                        <Route component={ErrorPage}  />
                    </Switch>
                </div>
            </Router>
            </div>
        )
    };
}

const mapStateeToProps = state => {
    return {
        isAuthenticated: state.token !== null,
        isAdminUser: state.token === "1c62c5adc6a5deaa4014f28b47094e302e5980b8"
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}


export default connect(mapStateeToProps,mapDispatchToProps)(App);