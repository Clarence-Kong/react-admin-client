/**
 * @fileoverview 用户组件,
 * @author clarencekong
 * Copyright 2020. All Rights Reserved.
 */
import React, {Component} from "react";
import {Redirect, Route, Switch} from 'react-router-dom'
import memoryUtils from "../../utils/memoryUtils";
import {Layout} from 'antd';
import Header from "../../components/topHeader/header";
import Nav from "../../components/nav/nav";
import {HeartTwoTone} from '@ant-design/icons';
import Home from "../home/home";
import Bar from "../graphs/bar";
import Pie from "../graphs/pie";
import Product from "../commodity/product/product";
import Role from "../role/role";
import User from "../user/user";
import Line from "../graphs/line";
import Category from '../commodity/category/category'

const {Footer, Sider, Content} = Layout;
export default class Admin extends Component {
    render() {
        const user = memoryUtils.user;
        if (!user._id) {
            return <Redirect to={'/login'}/>
        }
        return (
            <Layout style={{height: '100%'}}>
                <Sider breakpoint="lg"
                       collapsedWidth="0"
                       style={{background: "#223e36"}}
                       onBreakpoint={broken => {
                           console.log(broken);
                       }}
                       onCollapse={(collapsed, type) => {
                           console.log(collapsed, type);
                       }}><Nav/></Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{background: "white", margin: "20px",height:540}}>
                        <Switch>
                            <Route path={'/home"'} component={Home}/>
                            <Route path={'/graphs/pie'} component={Pie}/>
                            <Route path={'/graphs/line'} component={Line}/>
                            <Route path={'/graphs/bar'} component={Bar}/>
                            <Route path={'/user/user'} component={User}/>
                            <Route path={'/product'} component={Product}/>
                            <Route path={'/category'} component={Category}/>
                            <Route path={'/role'} component={Role}/>
                            <Redirect to={'/home'}/>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign: 'center', fontSize: '18px', color: 'ccc'}}>Practice make
                        better <HeartTwoTone twoToneColor="#eb2f96"/></Footer>
                </Layout>
            </Layout>
        )
    }

}