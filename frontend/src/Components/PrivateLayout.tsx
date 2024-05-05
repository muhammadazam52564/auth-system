import { Col, Row } from 'antd'
import SidebarLayout from './Sidebar/Layout/SidebarLayout'
import Welcome from './Sidebar/Welcome/Welcome'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import  { useAuth }  from "../hooks/useAuth"
interface PageProps {
  Page: React.ReactNode;
}

const Private = ({Page}: PageProps) => {
  const { checkIsLogedIn } = useAuth()
  const navigate = useNavigate()
  const checkLogin = async ()=>{
    const logiStatus =  await checkIsLogedIn()
    if(!logiStatus){
      navigate("/signup")
    }
  }
  useEffect( ()=>{
    checkLogin()
  })

  return (
    <Row className='main-layout'>
      <Col className='sidebar-column' xs={24} md={11}>
        <SidebarLayout child = {<Welcome/>} />
      </Col>
      <Col xs={24} md={13}>
        {Page}
      </Col>
    </Row>
  )
}

export default Private