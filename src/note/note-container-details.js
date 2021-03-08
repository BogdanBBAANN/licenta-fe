import React from 'react';
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import {
    Button,
    Card,
    CardHeader,
    Col,
    Modal,
    ModalBody,
    ModalHeader,
    Row
} from 'reactstrap';
// import NoteForm from "./components/note-form";

import * as API_USERS from "./api/note-api";
import {Link} from "react-router-dom";
import NoteContainer from "./note-container";
import {connect} from "react-redux";



class NoteContainerDetails extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selected: false,
            collapseForm: false,
            tableData: [],
            isLoaded: false,
            errorStatus: 0,
            error: null,
            cnt: 0
        };
    }

    componentWillReceiveProps(newProps) {
        console.log('note id este ',this.props.match.params.noteId)
        console.log('token este ',newProps.token)
        if(newProps.token !== null)
            this.setState({
                cnt: 1
            })
        else
            this.setState({cnt: 0})
        this.fetchNote(newProps.token,this.props.match.params.noteId);
    }

    componentDidMount() {
        console.log('note id este ',this.props.match.params.noteId)
        console.log('token este ',this.props.token)
        // this.fetchNote(this.props.token,this.props.match.params.noteId);
    }

    fetchNote(tok,id) {
        return API_USERS.getNoteById(tok,id,(result, status, err) => {

            if (result !== null && status === 200) {
                this.setState({
                    tableData: result,
                    isLoaded: true
                });
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }

    removeNote(tok,id){
        return API_USERS.deleteNote(tok,id, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully deleted note with id: " + result);
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }

    handleDelete = (event) => {
        let noteId = this.props.match.params.noteId
        console.log('noteId = ',noteId)
        console.log('token = ',this.props.token)
        this.removeNote(this.props.token,noteId)
        this.props.history.push(`/api`);
        window.location.reload(false);
    }

    render() {
        let tabData = this.state.tableData
        return (
            <div>
                <p>
                    {tabData.title}
                </p>
                <br/>
                {tabData.content}
                <br/>
                {this.state.cnt ?

                    <form onSubmit={this.handleDelete}>
                        <Button type='danger' htmlType='submit'>Delete</Button>
                    </form>

                :
                    <h>Operation not allowed </h>
                }

            </div>
        )

    }
}

const mapStateToProps = state => {
    return {
        token: state.token
    }

}


export default connect(mapStateToProps)(NoteContainerDetails);
// export default NoteContainerDetails;
