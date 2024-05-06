import { useState } from "react"
import { Link } from "react-router-dom"
import { FcGoogle } from "react-icons/fc"
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import  { useAuth }  from "../../../hooks/useAuth"
import {
  publicInstance as axios 
} from "../../../Config/axios"

import "./login.css"

import { 
  Button, 
  Divider, 
  Flex, 
  Form, 
  Input, 
  FormProps,
  Typography,
  Col,
  Row
} from "antd"


const {
  Text,
  Title
} = Typography

type FieldType = {
  email?: string,
  password?: string
}

const Login = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    setLoading(true)
    const response = await axios.post('/login', values)
    const data = response.data
    setLoading(false)
    if (data.success) {
      localStorage.setItem('token', data.token)
      navigate('/')
    }else {
      toast.error(`${data.message}`, {
        position: "top-right",
      })
    }

  }

  const {googleLogin} = useAuth()
  
  return (
    <>
      <Flex vertical className="login-cover">
        <Flex justify="flex-end" align="center" className="login-header">
            <Text type="secondary">Not a member ? <Link to="/signup"> &nbsp;Sign Up</Link></Text>
        </Flex>

        <Row className="p-2">
          <Col 
            
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 24, offset: 0 }}
            md={{ span: 16, offset: 3 }}
            lg={{ span: 14, offset: 4 }}
          >
            <Title style={{ fontSize: "1.9rem" }} >Sign In to your Account!</Title>
            <Text style={{ fontSize: "1rem", color: "rgba(0, 0, 0, 0.45)" }} >To begin this journey, sign in to your account.</Text>
          </Col>
          <Col 
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 24, offset: 0 }}
            md={{ span: 16, offset: 3 }}
            lg={{ span: 14, offset: 4 }}
          >
            
            <Form
              name="login"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              onFinish={onFinish}
              className="py-2"
            >
              <Form.Item<FieldType>
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
                
              >
                <Input  size="large"   placeholder="user@example.com"/>
              </Form.Item>

              <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                
              >
                <Input.Password size="large"  placeholder="********" />
              </Form.Item>

              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit"
                  block
                  size="large"
                  loading={loading}
                >
                  Login
                </Button>
              </Form.Item>

              <Divider> Or </Divider>

              <Form.Item>
                <Button 
                  onClick={()=>{
                    googleLogin()
                  }}
                  type="default" 
                  icon={<FcGoogle/>}
                  block
                  size="large"
                >
                  Signin with Google
                </Button>
              </Form.Item>

            </Form>
            
          </Col>
        </Row>

      </Flex>
    </>

  )
}

export default Login