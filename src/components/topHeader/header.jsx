import React, {Component} from 'react'
import './header.less'
import {withRouter} from 'react-router-dom'
import {reqWeather, reqLocation} from '../../api/index'
import dayUtils from "../../utils/dayUtils";
import user from '../../utils/memoryUtils'
import menuList from '../../config/menuConfig'
import {Modal} from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";

class Header extends Component {
    state = {currentTime: dayUtils(), dayPictureUrl: '', weather: ''};

    getWeather = async () => {
        const {city} = await reqLocation();
        const {dayPictureUrl, weather} = await reqWeather(city)
        this.setState({dayPictureUrl, weather})
    };
    getTitle = () => {
        const path = this.props.location.pathname;
        console.log(path,"path")
        let title;
        menuList.forEach((item) => {
            if (item.key === path)
                title = item.text;
            else if (item.children) {
                const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0);
                if (cItem) {
                    title = cItem.text
                }
            }
        });
        return title
    };
    logOut = () => {


        Modal.confirm({
            title: 'Are you sure yo log out?',
            icon: <ExclamationCircleOutlined/>,
            onOk: () => {
                memoryUtils.user = {};
                storageUtils.removeUser();
                this.props.history.replace('/login')
            }
        });
    }

    componentDidMount() {
        //启动定时器，获取时间
        this.intervalID = setInterval(() => {
            const currentTime = dayUtils();
            this.setState({currentTime})
        }, 1000)
        this.getWeather();
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    render() {
        const name = user.user.username;
        const title = this.getTitle();
        const {currentTime, dayPictureUrl, weather} = this.state;
        return (
            <header className={'topHeader'}>
                <div className={'up'}><span>Welcome,{name}</span>
                    <a onClick={this.logOut}>Log Out</a></div>
                <div className={'down'}>
                    <div className={'left-title'}>
                        <h1>{title}</h1>
                    </div>
                    <div className={'right-info'}>
                        <span>{currentTime} </span>
                        <img src={dayPictureUrl} alt=""/>
                        {weather}
                    </div>
                </div>
            </header>
        )
    }
}

export default withRouter(Header)