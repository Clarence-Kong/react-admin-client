/**
 * @fileoverview 抽离左侧菜单,
 * @author clarencekong
 * Copyright 2020. All Rights Reserved.
 */

const menuList = [
    {
        key: '/home',
        icon: 'icon-home',
        text: 'HomePage'
    },
    {
        key: '/commodity',
        icon: 'icon-appstore',
        text: 'Commodity',
        children: [{
            key: '/product',
            icon: 'icon-unorderedlist',
            text: 'Product',
        }, {
            key: '/category',
            icon: 'icon-tag',
            text: 'Category',
        }]
    }, {
        key: '/graphs',
        icon: 'icon-areachart',
        text: 'Graph',
        children: [{
            key: '/graphs/bar',
            icon: 'icon-barchart',
            text: 'Bar',
        }, {
            key: '/graphs/line',
            icon: 'icon-linechart',
            text: 'Line',
        }, {
            key: '/graphs/pie',
            icon: 'icon-piechart',
            text: 'Pie',
        }]
    },
    {
        key: '/user',
        icon: 'icon-meh',
        text: 'User',
    },{
        key: '/role',
        icon: 'icon-user',
        text: 'Role',
    }
];
export default menuList