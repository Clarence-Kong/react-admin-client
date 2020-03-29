import React, {Component} from "react";
import './login.less'
import logo from '../../assets/images/logo.png'
import {Form, Input, Button, Checkbox, message} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {reqLogin} from '../../api'
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import {Redirect} from 'react-router-dom'
/*
* 登录组件
* */

export default class Login extends Component {

    render() {
        const user = memoryUtils.user;
        console.log(user)
        if (user._id) {
            return <Redirect to={'/'}/>
        }
        const onFinish = async values => {
            console.log('Received values of form: ', values);
            const {username, password, remember} = values;
            console.log(username, password);
            const result = await reqLogin(username, password);
            console.log("请求成功", result);
            if (result.status === 0) {
                const user = result.data;
                message.success("Login succesefully!");
                memoryUtils.user = user//用户存入内存
                console.log(remember,"remember")
                if (remember) {
                    storageUtils.saveUser(user)//用户存入localStorge
                }
                this.props.history.replace('/');
            } else {
                message.error("登陆失败！" + result.msg)
            }
        };
        const onFinishFailed = ({values, errorFields, outOfDate}) => {
            console.log('failed ', values, errorFields, outOfDate)
        };
        return (
            <div className={"login"}>
                <div className={'mask'}></div>
                <header className={"login-header"}>
                    <img src={logo} alt=""/>
                    <h1>Welcome to my practise project</h1>
                </header>
                <section className={"login-container"}>

                    <h2>User Login</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!',
                                }, {
                                    pattern: /(^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$)|(^[1][38579]\d{9}$)/,
                                    message: '请输入正确的邮箱格式！或电话'
                                }
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                }, {
                                    lens: 8,
                                    message: '长度至少为8位！'
                                }
                                , {
                                    pattern: /(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}/g,
                                    message: '包含数字、字母和特殊字符'
                                }, {
                                    max: 30,
                                    message: '不超过30位！'
                                }
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon"/>}
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>

                </section>
            </div>
        )
    }

}