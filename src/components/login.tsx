import {Button, Checkbox, Divider, Form, Icon, Input, message, Tabs, Typography, Spin} from 'antd';
import React, {useState} from 'react';
import {auth, session_type} from "../firebase";
import withAuthContext from "../context/AuthConsumer";
import {Redirect} from "react-router";
const {Title} = Typography;
const {TabPane} = Tabs;

const MyLogin: React.FC = (props: any) => {
    const {getFieldDecorator} = props.form;
    console.log("Logged in ", !!auth.currentUser);
    console.log("Login page props", props);
    let [loginState, setLoginState] = useState(false);
    console.log(loginState);
    const handleSuccess = () =>{
        message.success("Login Success!");
        console.log("Login successful");

        setLoginState(false);

    }

    const buttonStyle = {
        width: '100%',
        height: '40px',
    };

    const logout = () => {
        auth.signOut()
            .then(()=>message.success("Logged out!"));
    }
    const handleLogin = (e: any) => {
        e.preventDefault();
        setLoginState(true);
        console.log("coming for login");
        props.form.validateFields(['loginMail', 'loginPassword'], (err: object, values: object) => {
            if (err) {
                setLoginState(false);
                return;
            }
            auth
                .setPersistence(session_type)
                .then(() => console.log('state set successfully!!'))
                .catch(function (error) {
                    console.log("Error in setting persistence", error.code, '-', error.message);
                });


            // @ts-ignore
            return auth.signInWithEmailAndPassword(values.loginMail, values.loginPassword)
                .then(handleSuccess)
                .catch(function (error: any) {
                    message.error(error.code + ' - ' + error.message);
                    console.log('Sign in failed!', error.code, ' and ', error.message);
                    setLoginState(false);
                });
        });

    }

    if (loginState){
        console.log("Going in loading state");
        return <div style={{textAlign: 'center', paddingTop: '5%'}}>
            <div style={{display: 'inline-block'}}>
                <Spin/>
            </div>
        </div>
    }

    if (props.context.isAuthenticated){
        //Redirect to landing
        console.log("Going to redirect");
        return <Redirect to="/one"/>;
    }


    return (
        <div style={{textAlign: 'center', paddingTop: '5%'}}>
            <div style={{display: 'inline-block'}}>
                <Title>BillMonger</Title>
                <Tabs
                    // onChange={(key) => callback(key)}
                    type="card"
                    style={{boxShadow: '0 6px 16px 0 rgba(0,0,0,1)', width: '320px', height: '450px'}}
                >
                    <TabPane tab="Login" key="1">
                        <div style={{width: '300px', height: '450px', display: 'inline-block'}}>
                            <Form onSubmit={handleLogin}>
                                <Form.Item>
                                    {getFieldDecorator('loginMail', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please enter valid email address',
                                                type: 'email'
                                            }
                                        ]
                                    })(<Input
                                        prefix={<Icon type="mail"/>}
                                        placeholder="Email"
                                        style={buttonStyle}
                                    />)}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('loginPassword', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please enter password'
                                            }
                                        ]
                                    })(<Input.Password
                                        prefix={<Icon type="lock"/>}
                                        type="password"
                                        placeholder="Password"
                                        style={buttonStyle}
                                    />)}
                                </Form.Item>
                                <Form.Item>
                                    <Checkbox style={{float: 'left'}}>Remember me</Checkbox>
                                    <a href="" style={{float: 'right'}}>
                                        Forgot password
                                    </a>
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" style={buttonStyle}>
                                        Login
                                    </Button>
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" style={buttonStyle} onClick={logout}>
                                        Logout
                                    </Button>
                                </Form.Item>
                                <Form.Item>
                                    <Divider>or connect with</Divider>
                                    <Divider>
                                        <div style={{maxHeight: '3em'}}>
                                            <Icon type="google" style={{fontSize: '2.5em', color: '#1890ff'}}/>
                                        </div>
                                    </Divider>
                                </Form.Item>
                            </Form>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
}

export const NewLogin = withAuthContext(Form.create()(MyLogin));
