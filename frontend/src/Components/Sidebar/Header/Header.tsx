import { Col, Image, Row } from "antd"
import logo from "../../../assets/logo.png"
import './header.css'
const Header = () => {
  return (
    <Row>
      <Col xs={24} className="header-layout">
        <Image className="logo" src={logo} /> &nbsp; <span>Oasis.</span>
      </Col>
    </Row>
  )
}

export default Header