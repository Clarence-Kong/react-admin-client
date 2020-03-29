import React, {Component} from 'react'
import {Form, Input} from 'antd'

export default class UpdateForm extends Component {

    render() {
        const {categoryName, fieldsUpdate, onChange,setForm} = this.props;
        return (
            <Form
                fields={fieldsUpdate}

                onFieldsChange={(changedFiles, allFields) => {
                    onChange(allFields)
                    console.log('lll')
                }}>
                <h1>{categoryName}</h1>
                <Form.Item
                    name="update"
                    rules={[{require: true, message: "the name can't not be empty"}]}
                >
                    <Input placeholder={'Input the name '}/>
                </Form.Item>
            </Form>
        )
    }
}