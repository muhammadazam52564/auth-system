// import React from 'react'

import { Form, Input } from "antd"

const BankVerification = () => {
  return (
    <>
    <Form.Item
      label="Bank verification number (BVN)"
      name="bvn"
      rules={[
        { required: true,  message: 'Please input your BVN!' },
        { min: 11,  message: 'Please input 11 digits BVN!' }
      ]}
    >
      <Input  size="large"   placeholder="090912345567"/>
    </Form.Item></>
  )
}

export default BankVerification