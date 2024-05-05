import { Col, Row } from 'antd'
import SidebarLayout from './Sidebar/Layout/SidebarLayout'
import Quote from './Sidebar/Quote/Quote'
import { useEffect } from 'react'
import  { useAuth }  from "../hooks/useAuth"
import { useNavigate } from 'react-router-dom'
interface PageProps {
  Page: React.ReactNode;
}

const Auth = ({ Page }: PageProps) => {
  const { checkIsLogedIn } = useAuth()
  const navigate = useNavigate()
  const checkLogin = async ()=>{
    const loginStatus: boolean = await checkIsLogedIn()
    if (loginStatus) {
      navigate("/")
    }
  }
  useEffect( ()=>{
    checkLogin()
  })

  return (
    <Row className='main-layout'>
      <Col className='sidebar-column' xs={24} md={11}>
        <SidebarLayout child = { <Quote/> } />
      </Col>
      <Col xs={24} md={13}>
        {Page}
      </Col>
    </Row>
  )
}

export default Auth