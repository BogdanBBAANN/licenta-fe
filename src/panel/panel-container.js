import React from "react";
import { Button } from "react-bootstrap";
import "./panel-container.css";
import * as API_USERS from "./api/panel-api";
import { connect } from "react-redux";

class PanelContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: false,
      collapseForm: false,
      tableData: [],
      isLoaded: false,
      errorStatus: 0,
      error: null,
      msj: "",
    };
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps.token);
    this.fetchUser(newProps.token);
  }

  fetchUser(tok) {
    return API_USERS.getUser(tok, (result, status, err) => {
      if (result !== null && status === 200) {
        this.setState({
          tableData: result,
          isLoaded: true,
        });
      } else {
        this.setState({
          errorStatus: status,
          error: err,
        });
      }
    });
  }

  render() {
    let tabData = this.state.tableData;
    let gr = tabData.map((value, index) => {
      if (index === 0) {
        return value.groups[0];
      }
    });

    return (
      <div className={"panel"}>
        {gr[0] === 2 ? (
          <></>
        ) : (
          <Button className={"leftPanel"} href={"/panel/floor1"}>
            Floor 1
          </Button>
        )}
        <div className={"centerPanel"}>
          <h2>Welcome to control panel</h2>
        </div>
        {gr[0] === 1 ? (
          <></>
        ) : (
          <Button className={"rightPanel"} href={"/panel/floor2"}>
            Floor 2
          </Button>
        )}
        <br />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

export default connect(mapStateToProps)(PanelContainer);
