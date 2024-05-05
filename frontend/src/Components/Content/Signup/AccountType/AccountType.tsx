import { Avatar, Card, Image } from "antd"
import "./accountType.css"
import arrowRight  from "../../../../assets/arrowRight.png"

const {
  Meta
} = Card
import { ReactNode } from "react"

type PropsType = {
  title: string,
  description: string,
  icon: ReactNode,
  handler: ()=> void
}

const AccountType = ({title, description, icon, handler}: PropsType) => {
  return (
    
    <Card 
      hoverable 
      bordered
      className="user-type-button"
      onClick={handler}
    > 
      <Card.Grid
        hoverable={false}
        style={{
          width:"80%",
          display: "flex",
          alignItems: "center"
        }}
       >
        <Meta
          className="flex-align-center"
          avatar={<Avatar src={icon} className="avatar-size" />}
          title={title}
          description={description}
        />
      </Card.Grid>
      <Card.Grid
        hoverable={false}
        className="flex-align-center"
        style={{ width:"20%"}}
       >
        <Image src={arrowRight} className="hover-display" />
      </Card.Grid>
    </Card>
  )
}
export default AccountType
