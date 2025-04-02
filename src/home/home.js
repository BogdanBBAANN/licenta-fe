import React from "react";
import BackgroundImg from "../commons/images/backgr.jpg";
import { Container } from "reactstrap";

const backgroundStyle = {
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  width: "100%",
  height: "1920px",
  backgroundImage: `url(${BackgroundImg})`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "5rem",
};

const textStyle = { color: "black", textAlign: "center" };

class Home extends React.Component {
  render() {
    return (
      <div style={backgroundStyle}>
        <Container>
          <h1 className="display-5" style={textStyle}>
            Smart building management system
          </h1>
        </Container>
      </div>
    );
  }
}

export default Home;
