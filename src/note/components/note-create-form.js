import React from 'react';
import Button from "react-bootstrap/Button";
import * as API_USERS from "../api/note-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';
import validate from "./validators/note-validator";
import {connect} from "react-redux";



class NoteCreateForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: false,

            formControls: {
                title: {
                    value: '',
                    placeholder: 'Title of note',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },
                content: {
                    value: '',
                    placeholder: 'Write your note',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                }
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleForm() {
        this.setState({collapseForm: !this.state.collapseForm});
    }


    handleChange = event => {

        const name = event.target.name;
        const value = event.target.value;

        const updatedControls = this.state.formControls;

        const updatedFormElement = updatedControls[name];

        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);
        updatedControls[name] = updatedFormElement;

        let formIsValid = true;
        for (let updatedFormElementName in updatedControls) {
            formIsValid = updatedControls[updatedFormElementName].valid && formIsValid;
        }

        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });

    };

    registerNote(tok,note) {
        return API_USERS.postNote(tok,note, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully posted note with id: " + result);
                this.reloadHandler();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }

    handleSubmit() {
        var today = new Date()
        let note = {
            title: this.state.formControls.title.value,
            content: this.state.formControls.content.value,
            date : today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
        };

        console.log('token is ',this.props.token);
        console.log('date  ',note.date)
        this.registerNote(this.props.token,note);
    }

    render() {
        return (
            <div>

                <FormGroup id='title'>
                    <Label for='titleField'> Title: </Label>
                    <Input name='title' id='titleField' placeholder={this.state.formControls.title.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.title.value}
                           touched={this.state.formControls.title.touched? 1 : 0}
                           valid={this.state.formControls.title.valid}
                           required
                    />
                    {this.state.formControls.title.touched && !this.state.formControls.title.valid &&
                    <div className={"error-message row"}> * Name must have at least 3 characters </div>}
                </FormGroup>

                <FormGroup id='content'>
                    <Label for='contentField'> Content: </Label>
                    <Input name='content' id='contentField' placeholder={this.state.formControls.content.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.content.value}
                           touched={this.state.formControls.content.touched? 1 : 0}
                           valid={this.state.formControls.content.valid}
                           required
                    />
                    {this.state.formControls.content.touched && !this.state.formControls.content.valid &&
                    <div className={"error-message"}> * Email must have a valid format</div>}
                </FormGroup>

                <Row>
                    <Col sm={{size: '4', offset: 8}}>
                        <Button type={"submit"} disabled={!this.state.formIsValid} onClick={this.handleSubmit}>  Submit </Button>
                    </Col>
                </Row>

                {
                    this.state.errorStatus > 0 &&
                    <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>
                }
            </div>
        ) ;
    }
}

const mapStateToProps = state => {
    return {
        token: state.token
    }

}

// export default NoteCreateForm;
export default connect(mapStateToProps)(NoteCreateForm);