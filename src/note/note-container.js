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

import * as API_USERS from "./api/note-api"
import NoteListLayout from "./components/note-list-layout";
import NoteCreateForm from "./components/note-create-form";
import {connect} from "react-redux";



class NoteContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selected: false,
            collapseForm: false,
            tableData: [],
            isLoaded: false,
            errorStatus: 0,
            error: null,
            msj: ''
        };

        this.toggleForm = this.toggleForm.bind(this);
        this.reload = this.reload.bind(this);
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps)
        this.fetchNotes(newProps.token);
    }

    componentDidMount() {
        // console.log(this.props)
        //this.fetchNotes();
    }

    fetchNotes(tok) {
        return API_USERS.getNotes(tok,(result, status, err) => {

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

    toggleForm() {
        console.log(this.props.token)
        if(this.props.token !== null)
            this.setState({selected: !this.state.selected});
        else
            this.setState({
                msj: 'permission denied'
            })
        //this.setState({selected: !this.state.selected});
    }


    reload() {
        //console.log('note container reload',this.props.token)
        this.setState({
            isLoaded: false
        });
        this.toggleForm();
        this.fetchNotes(this.props.token);
    }

    render() {
        let tabData = this.state.tableData
        return (
            <div>
                <CardHeader>
                    <strong> All notes </strong>
                </CardHeader>
                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            <Button color="primary" onClick={this.toggleForm}>Add Note </Button>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoaded}

                            <NoteListLayout data={tabData}/>
                            {this.state.msj}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                                            errorStatus={this.state.errorStatus}
                                                            error={this.state.error}
                                                        />   }
                        </Col>
                    </Row>
                </Card>

                <Modal isOpen={this.state.selected} toggle={this.toggleForm}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleForm}> Add Person: </ModalHeader>
                    <ModalBody>
                        <NoteCreateForm reloadHandler={this.reload}/>
                    </ModalBody>
                </Modal>

            </div>
        )

    }
}

const mapStateToProps = state => {
    return {
        token: state.token
    }

}


// export default NoteContainer;
export default connect(mapStateToProps)(NoteContainer);
