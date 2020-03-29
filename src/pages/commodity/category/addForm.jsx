import React, {Component} from 'react'
import {Form, Select, Input} from "antd";

const {Option} = Select;
export default class AddForm extends Component {
    formRef = React.createRef();

    componentDidMount() {
        this.props.setForm(this.formRef,this)
    }

    render() {
        const {categories, fields, onChange, parentId} = this.props;

        return (
            <Form
                fields={fields}
                onFieldsChange={(changedFields, allFields) => {
                    onChange(allFields);
                }}
                ref={this.formRef}
            >
                <h1>Please enter the tag level:</h1>
                <Form.Item
                    name={parentId}
                    valuePropName={parentId}
                >
                    <Select defaultValue={parentId}>
                        <Option value={"0"}>Father</Option>
                        {

                            categories.map(category => <Option key={category._id}
                                                               value={category._id}>{category.name}</Option>)

                        }
                    </Select>
                </Form.Item>
                <h1>Please enter the name:</h1>
                <Form.Item
                    name="categoryName"
                    rules={[
                        {
                            required: true,
                            message: 'name is required!',
                        },
                    ]}>

                    <Input placeholder={"name"}/>
                </Form.Item>
            </Form>
        )
    }

}