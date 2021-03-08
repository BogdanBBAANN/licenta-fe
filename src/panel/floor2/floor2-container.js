import React from "react";
import Button from "react-bootstrap/Button";


class Floor2Container extends React.Component{

    turnOnLed = () => {
        console.log('white on')
    }

    turnOffLed = () => {
        console.log('white off')
    }

    render(){
        return(
            <div>
                <h1>Floor 2 management</h1><br/>
                <Button className={'but1'} onClick={this.turnOnLed}>Turn on the lights</Button><br/>
                <Button className={'but2'} onClick={this.turnOffLed}>Turn off the lights</Button>
            </div>
        );
    }

}

export default Floor2Container;