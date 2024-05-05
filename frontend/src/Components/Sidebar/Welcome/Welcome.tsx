import { Flex, Typography } from "antd"
const {
  Text
} = Typography
import "./welcome.css"
const Welcome= () => {
  return (
    <Flex align="center" justify="center" className="welcome">
      <Text className="text">Welcome to<br/> the  <b>Company.</b></Text>
    </Flex>
  )
}

export default Welcome