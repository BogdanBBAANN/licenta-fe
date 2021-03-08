import React from 'react';

import BackgroundImg from '../commons/images/backgr.jpg';

import {Button, Container, Jumbotron} from 'reactstrap';

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "1920px",
    backgroundImage: `url(${BackgroundImg})`
};
const textStyle = {color: 'black', 'text-align': 'center' };

class Home extends React.Component {


    render() {

        return (

            <div>
                <Jumbotron fluid style={backgroundStyle}>
                    <Container fluid>
                        <h1 className="display-5" style={textStyle}>Smart building management system</h1>
                    </Container>
                </Jumbotron>
            </div>
        )
    };
}

export default Home
