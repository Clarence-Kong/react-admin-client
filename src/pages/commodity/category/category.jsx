import React, {Component, useState} from 'react'
import {Card, Button} from "antd";
import {PlusOutlined, ArrowRightOutlined} from '@ant-design/icons';
import {Table, Tag} from 'antd';
import {reqAddCategory, reqCategories, reqUpdateCategory} from '../../../api'
import {Modal, message} from 'antd';
import AddForm from './addForm'
import UpdateForm from './updateForm'

export default class Category extends Component {
    state = {
        categories: [],//一级分类列表
        loading: true,//数据获取前状态
        parentId: '0',//需要显示的列表分类ID
        parentName: '',//需要显示的列表父类名称
        subCategories: [],//二级分类列表
        showModal: 0,//0---不显示，1---显示添加，2---显示修改
        fields: [
            {
                "name": [
                    "parentId"
                ],
                "value": '0'
            },
            {
                "name": [
                    "categoryName"
                ],
                "value": ""
            }
        ],
        fieldsUpdate: [
            {
                "name": [
                    "update"
                ],
                "value": ''
            }
        ]
    };

    //初始化列表名称
    initColumns = () => {
        this.columns = [
            {
                title: 'Category Name',
                dataIndex: 'name',
                key: 'name',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Action',
                key: 'action',
                width: 300,
                render: (category) => (
                    <span>
        <a onClick={() => this.showUpdateModal(category)} style={{marginRight: 16}}>Update</a>
        <a onClick={() => this.showSubCategories(category)}>subCategory</a>
      </span>
                ),
            },

        ];
    };
    //获取分类列表
    getCategories = async (parentId) => {
        this.setState({loading: false});
        parentId = parentId || this.state.parentId;
        const result = await reqCategories(parentId);
        const categories = result.data;

        if (!result.status) {
            if (parentId === '0') {
                this.setState({categories})
            } else {
                this.setState({subCategories: categories});
                this.getCategories();
            }
        } else {
            message.error("wrong status for category")
        }
    };
    //展示添加的Modal
    showAddModal = () => {
        this.setState({
            showModal: 1
        })
    };
    //展示更新的Modal
    showUpdateModal = (category) => {
        this.category = category;
        this.setState({
            showModal: 2
        })
    };
    //关闭更新或者添加的Modal
    handleCancel = (e) => {
        this.form.resetFields()
        this.setState({
            showModal: 0
        })
        this.clearFields()
    };
    //获取二级分类的数据
    showSubCategories = (category) => {
        this.setState({parentId: category._id, parentName: category.name}, () => {
            this.getCategories();
            console.log()
        });

    };
    //添加分类
    addCategory = async () => {
        this.setState({showModal: 0});
        const [parent, category] = this.state.fields;
        await reqAddCategory(category.value, parent.value)
        this.getCategories();
        this.clearFields()

    };
    clearFields = () => {
        const that = this.that;
        const form = that.formRef
        form.current.resetFields()
    };
    //更新分类
    updateCategory = async () => {
        this.setState({showModal: 0});
        const categorytId = this.category._id;
        const [category] = this.state.fieldsUpdate;
        console.log(categorytId, category.value);

        const result = await reqUpdateCategory(categorytId, category.value);
        if (result.status === 0) {
            this.getCategories()
        } else message.error("wrong update")
        this.clearFields()
    };
    //返回上级列表
    showCategories = () => {
        // 更新为显示一列表的状态
        this.setState({
            parentId: '0',
            parentName: '',
            subCategorys: []
        })
    }

    componentWillMount() {
        this.initColumns();
    }

    componentDidMount() {
        this.getCategories();

    }

    render() {

        const {categories, loading, showModal, parentId, fields, fieldsUpdate, subCategories, parentName} = this.state;
        const category = this.category || {};
        const title = parentId === '0' ? "一级分类列表" : (<div>
            <a onClick={this.showCategories}>Categories</a> <ArrowRightOutlined/> <span> {parentName} </span>
        </div>);
        const extra = (
            <Button onClick={this.showAddModal} type={"primary"}><PlusOutlined/>Add</Button>
        );
        return (
            <Card title={title} extra={extra} style={{maxHeight:540}}
            >
                <Table bordered
                       columns={this.columns}
                       loading={loading}
                       dataSource={parentId === '0' ? categories : subCategories}
                       rowKey='_id'
                       pagination={{defaultPageSize: 6, hideOnSinglePage: true, showQuickJumper: true}}

                />
                <Modal
                    title="Add Category"
                    visible={showModal === 1}
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}
                >
                    <AddForm categories={categories} parentId={parentId} fields={fields}
                             setForm={(form, that) => {
                                 this.form = form
                                 this.that = that
                             }}
                             onChange={(fields, form) => {
                                 this.setState({fields: fields})
                             }}/>

                </Modal>
                <Modal
                    title="Update Category"
                    visible={showModal === 2}
                    onOk={this.updateCategory}
                    onCancel={this.handleCancel}
                >
                    <UpdateForm
                        categoryName={category.name}
                        fieldsUpdate={fieldsUpdate}
                        setForm={(form) => {
                            this.form = form
                        }}
                        onChange={fieldsUpdate => this.setState({fieldsUpdate: fieldsUpdate})}
                    />
                </Modal>
            </Card>
        )
    }
}