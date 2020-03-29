import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import ProductUpdate from "./productUpdate";
import ProductDetail from './detail'
import ProductHome from "./home";

export default class Product extends Component {
    render() {

        return (
            <Switch>
                <Route exact path={'/product'} component={ProductHome}/>
                <Route path={'/product/detail'} component={ProductDetail}/>
                <Route path={'/product/update'} component={ProductUpdate}/>
                <Redirect to={'/product'}/>
            </Switch>        )
    }
}