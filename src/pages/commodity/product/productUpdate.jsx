import React, {Component} from 'react'
import {ArrowLeftOutlined} from '@ant-design/icons';
import {Card, Form, Input} from 'antd'

const Item = Form.Item;

const {TextArea} = Input;
export default class ProductDetail extends Component {
    render() {
        const formItemLayout = {
            labelCol: {span: 2},  // 左侧label的宽度
            wrapperCol: {span: 8}, // 右侧包裹的宽度
        };
        const title = (
            <span>
        <a>
         <ArrowLeftOutlined
             type='arrow-left'
             style={{marginRight: 10, fontSize: 20}}/>, // 右侧包裹的宽度
        </a>
            </span>
        );

        return (
            <Card title={title}>
                <Form {...formItemLayout}>
                    <Item label={"Product name"}
                          name={"name"}
                          rules={[{required: true, message: 'Please input the name !'}]}>
                        <Input placeholder={"please enter the name:"}/>
                    </Item>
                    <Item label={"Product name"}
                          name={"desc"}
                          rules={[{required: true, message: 'Please input the description !'}]}>
                        <TextArea placeholder={"please enter the description:"} autoSize={{minRows: 2, maxRows: 6}}/>
                    </Item>
                    <Item label={"Product Price"}
                          name={"Price"}

                          rules={[{required: true, message: 'Please input the price !'}]}>
                        <Input type={"number"} prefix="￥" suffix="RMB"/>
                    </Item>
                </Form>
            </Card>
        )
    }
}