import { Flex } from "antd";
import Header from "../Header/Header";
import "./sidebarlayout.css"
interface LayoutProps {
  child: React.ReactNode;
}
const SidebarLayout = ({child}: LayoutProps) => {
  return (
    <Flex vertical className='sidebar-content'>
      <Header /> 
      {child}
    </Flex >
  )
}

export default SidebarLayout