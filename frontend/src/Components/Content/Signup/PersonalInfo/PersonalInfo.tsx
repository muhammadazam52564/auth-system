import { Form, Input } from "antd"
const PersonalInfo = () => {
  return (
    <>
    <Form.Item
      label="Your fullame"
      name="full_name"
      rules={[{ required: true, message: 'Please input your fullname!' }]}
    >
        <Input  size="large"   placeholder="Muhammad"/>
    </Form.Item>

    <Form.Item
      label="Email address"
      name="email"
      rules={[
        { required: true,  message: 'Please input your email!' },
        { type: 'email', message: 'Please input valid Email!'}
      ]}
    >
      <Input  size="large"   placeholder="user@example.com"/>
    </Form.Item>

    <Form.Item
      label="Create password"
      name="password"
      preserve
      rules={[
        { required: true, message: 'Please input your password!' },
        { min: 6, message: 'Please input at least 6 characters!' }

      ]}
    >
      <Input.Password size="large"  placeholder="********" />
    </Form.Item>
    </>
  )
}

export default PersonalInfo