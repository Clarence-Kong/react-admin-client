import React, {Component} from 'react'
import logo from '../../assets/images/logo.png'
import {Link, withRouter} from "react-router-dom";
import './nav.less'
import {Menu} from 'antd';
import {createFromIconfontCN} from '@ant-design/icons';
import menuItem from "../../config/menuConfig";

const {SubMenu} = Menu;
const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1698776_ocd8px7aux.js',
});

class Nav extends Component {

    getMenuItems = (menuList) => {
        const path = this.props.location.pathname;
        return menuList.map((menuItem) => {
            if (menuItem.children) {
                const cItem = menuItem.children.find(cItem => path.indexOf(cItem.key) === 0);
                if (cItem)
                    this.openKey = menuItem.key;
                return <SubMenu
                    key={menuItem.key}
                    title={
                        <span>
               <IconFont type={menuItem.icon}/>
                <span>{menuItem.text}</span>
              </span>}>
                    {
                        this.getMenuItems(menuItem.children)
                    }
                </SubMenu>
            } else {
                return <Menu.Item key={menuItem.key}>
                    <Link to={menuItem.key}>
                        <IconFont type={menuItem.icon}/> <span>{menuItem.text}</span>
                    </Link>
                </Menu.Item>
            }
        })

    };

    componentWillMount() {
        this.menu = this.getMenuItems(menuItem);
    }

    render() {
        let path = this.props.location.pathname;
        if (path.indexOf('/product') === 0) {
            path = '/product'
        }
        return (

            <div className={'top-nav'}>
                <Link to={'/home'} className={'left-nav-header'}>
                    <img src={logo} alt="logo.png"/>
                    <div className={"header-title"}>
                        <h1>Clarence's</h1>
                        <h1> Market</h1>
                    </div>
                </Link>
                <Menu
                    defaultSelectedKeys={['/Home']}
                    defaultOpenKeys={[this.openKey]}
                    selectedKeys={[path]}
                    mode="inline"
                    theme="dark"
                    style={{background: "#223e36"}}
                >

                    {
                        this.menu
                    }
                </Menu>
            </div>
        )
    }
}

export default withRouter(Nav)