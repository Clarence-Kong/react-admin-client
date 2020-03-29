import React, {Component} from 'react'
import {
    Button,
    Table,
    Input,
    Select, Card, Tag, message
} from "antd";
import {reqProducts, reqSearchProducts, reqUpdateStatus} from "../../../api";
import {PlusOutlined} from '@ant-design/icons';
import {PAGE_SIZE} from '../../../config/constant'

const Option = Select.Option;
export default class ProductHome extends Component {
    state = {
        products: [],//商品数组
        total: 0,//商品总数量
        loading: true,
        searchName: '',//搜索关键字
        searchType: 'productName',//搜索类型
    };

    initColumns = () => {
        this.columns = [
            {
                title: 'Name',
                dataIndex: 'name',
            },
            {
                title: 'Description',
                dataIndex: 'desc',
            },
            {
                title: 'Price',
                width: 200,
                dataIndex: 'price',
                render: ((price) => '￥' + price)
            }, {
                title: "Status",
                width: 15,
                render: (product) => {
                    const {status, _id} = product;
                    let color = status === 1 ? "green" : "geekblue";
                    return (
                        <div style={{textAlign: 'center'}}>
                            <Button
                                onClick={() => {
                                    this.updateStatus(_id, status === 1 ? 2 : 1)
                                }}
                                style={{margin: "10px 0"}}
                                type={"primary"}>{status === 1 ? "DownShelf" : "OnSale"}</Button>
                            <Tag color={color} style={{margin: 0}}>{status === 1 ? "OnSale" : "DownShelfe"}</Tag>
                        </div>
                    )
                }
            }, {
                title: "Action",
                width: 150,
                render: (product) => {
                    return (
                        <span>
                            <a style={{display: "block"}}
                               onClick={() => this.props.history.push('/product/detail', {product})}>Detail</a>
                           <a onClick={console.log()}>update</a>
                        </span>

                    )
                }
            }
        ];
    };

    componentWillMount() {
        this.initColumns()
    }

    getProducts = async (pageNum) => {
        this.setState({
            loading:true,
        });
        const {searchType, searchName} = this.state;
        this.pageNum = pageNum;//保存当前页数
        console.log(searchType, searchName);
        let result;
        if (searchType && searchName) {
            result = await reqSearchProducts({pageNum, pageSize: PAGE_SIZE, searchName, searchType})
        } else {
            result = await reqProducts(pageNum, 3);
        }

        this.setState({loading: true});

        const {total, list} = result.data;
        this.setState({
            loading: false,
            total,
            products: list,
        })

    };

    componentDidMount() {
        this.getProducts(1);
    }

    updateStatus = async (_id, status) => {
        const result = await reqUpdateStatus(_id, status);
        if (result.status === 0) {
            message.success("status refresh!");
            this.getProducts(this.pageNum)
        }
    };

    render() {
        const {products, total, loading, searchName, searchType} = this.state;
        const title = (
            <div>
                <Select defaultValue={searchType} value={searchType} style={{width: 150}}
                        onChange={value => this.setState({searchType: value})}>
                    <Option value={'productName'}>Search by name</Option>
                    <Option value={'productDesc'}> Search by description </Option>
                </Select>
                <Input value={searchName} style={{width: 150, margin: "0 15px"}} placeholder={"Input"}
                       onChange={e => this.setState({searchName: e.target.value})}/>
                <Button type={"primary"} onClick={() => this.getProducts(1)}>Search</Button>
            </div>
        );
        const extra = (
            <Button type={"primary"} onClick={()=>this.props.history.push('/product/update')}><PlusOutlined/>Add Commodity</Button>
        );

        return (
            <Card title={title} bordered={false} extra={extra} style={{height: 540}}>
                <Table
                    bordered
                    loading={loading}
                    rowKey='_id'
                    // loading={loading}
                    dataSource={products} columns={this.columns}
                    pagination={{total, showQuickJumper: true, defaultPageSize: 3, onChange: this.getProducts}}
                />
            </Card>
        )
    }
}