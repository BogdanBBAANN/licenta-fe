import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import * as actions from "../store/actions/auth";
import {connect} from "react-redux";

// const onFinish = values => {
//     console.log('Received values of form: ', values);
// }

class LoginContainer extends React.Component{

    constructor(props) {
        super(props);

    }

    onFinish = (values) => {
        console.log('Received values of form: ', values);
        this.props.onAuth(values.username, values.password);
        this.props.history.push('/');
    }

    // handleSubmit = (e) => {
    //     //e.preventDefault();
    //     this.props.form.validateFields((err, values) => {
    //       if (!err) {
    //         // this.props.onAuth(values.userName, values.password);
    //         // this.props.history.push('/');
    //           console.log(values)
    //       }
    //     });
    // }

    render() {
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        return (
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish = {this.onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon"/>}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        );
    };
}
// export default LoginContainer;
const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(LoginContainer);