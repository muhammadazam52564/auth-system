type PropsType = {
  custonStyle: React.CSSProperties,
  url: string
}
import {
  Image as Img
} from "antd"

const Image = (props: PropsType) => {
  return (
    <div  style={props.custonStyle}>
      <Img src={props.url} />
    </div>
  )
}

export default Image