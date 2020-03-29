/**
 * @fileoverview 所有请求接口
 * @author clarencekong
 * Copyright 2020. All Rights Reserved.
 */
import ajax from "./ajax";
import jsonp from 'jsonp'
import {message} from "antd";

const BASE = "";
//登录
export const reqLogin = (username, password) => ajax(BASE + '/login', {username, password}, 'POST');
//添加用户
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add', {user}, 'POST');

//百度地图获取天气信息
export const reqWeather = (city) => {
    return new Promise((resolve, reject) => {
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=beijing&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url, {}, (error, data) => {
            if (!error && data.status === 'success') {
                const {dayPictureUrl, weather} = data.results[0].weather_data[0];
                console.log(dayPictureUrl, weather, "url,weather")
                resolve({dayPictureUrl, weather})
            } else {
                message.error("获取天气失败" + error)
            }
        })
    })
};
//高德开发者平台获取用户地理位置
export const reqLocation = () => {
    return new Promise((resolve, reject) => {
        const url = `https://restapi.amap.com/v3/ip?&output=json&key=d3ce4e56cb321e43d0e6cefad109b62b`;
        jsonp(url, {}, (error, data) => {
            if (!error && data.status === '1') {
                const {city} = data;
                resolve(city)
            } else {
                message.error("获取地理位置失败，默认显示深圳市天气" + error)
            }
        })
    })
};
//获取后台Category分类列表
export const reqCategories = (parentId) => ajax(BASE + '/manage/category/list', {parentId}, 'GET')

//根据id获取分类名称
export const reqCategory = (categoryId) => ajax(BASE + '/manage/category/info', {categoryId})

//添加Categoty分类
export const reqAddCategory = (categoryName, parentId) => ajax(BASE + '/manage/category/add', {
    categoryName,
    parentId
}, 'POST')

//更新Categoty分类
export const reqUpdateCategory = (categoryId, categoryName) => ajax(BASE + '/manage/category/update', {
    categoryId,
    categoryName
}, 'POST')
//获取产品列表
export const reqProducts = (pageNum, pageSize) => ajax(BASE + '/manage/product/list', {pageNum, pageSize});
//根据搜索类型不同，搜索产品列表
export const reqSearchProducts = ({pageNum, pageSize, searchName, searchType}) => ajax(BASE + '/manage/product/search', {
    pageNum,
    pageSize,
    [searchType]: searchName
});
//更新商品状态，上架或下架
export const reqUpdateStatus = (productId, status) => ajax(BASE + '/manage/product/updateStatus', {productId, status}, 'POST')