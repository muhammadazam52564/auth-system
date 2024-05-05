import { Col, Flex, Row, Typography} from "antd"
const {
  Text
} = Typography
import { ImQuotesLeft } from "react-icons/im";
import Signature from "../Signature/Signature"
import vector from "../../../assets/vector.png"
import "./quote.css"
import Image from "../Image/Image"


const Quote = () => {
  const custonStyle = {
    display: "flex",
    justifyContent: "end",
    paddingRight: "1.2rem"
  }
  return (
    <Flex justify="center" align="center" className="quote">
      <Row>
        <Col xs={20} md={19} offset={2}>
          <ImQuotesLeft className="quote-icon-style"/>
          <Text>The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software.</Text>
          <Signature />
          <Image url={vector} custonStyle={custonStyle} />
        </Col>
      </Row>
    </Flex>
  )
}

export default Quote