import profile from "../../../assets/profile.png"
import { GiPartyPopper } from "react-icons/gi";
import { IoChevronBackSharp } from "react-icons/io5";
import "./profile.css"
import { Button, Flex, Avatar, Typography} from "antd";
import { useNavigate } from "react-router-dom";

const textwrappingStyle = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "16rem"
}
const {
  Text,
  Title
} = Typography

type propType = {
  id: number,
  user_type: number,
  full_name: string,
  email: string,
  phone: string,
  address: string,
  country: string,
  bvn: number,
  profile_picture: string
}


const Profile = ({ profileData }: propType) => {
  const navigate = useNavigate()
  const logout = ()=>{
    localStorage.removeItem('token')
    navigate("/login")
  }
  return(
    <Flex vertical className="profile-cover">
      <Flex justify="flex-end" align="center" className="profile-header">
        <Flex vertical justify="end">
          <small style={textwrappingStyle}>{profileData?.full_name}</small>
          <p style={textwrappingStyle}>{profileData?.email}</p>
        </Flex>
        <Avatar src={profile} className="avatar"/>
      </Flex>
      <Flex vertical justify="center" align="center" className="profile-content">
        <div>
          <Title  style={{ fontSize: "2.7rem", marginBottom: "0px" }} >Congratulation <GiPartyPopper className="styleIcon" /></Title>
          <Text style={{ fontSize: "1.2rem" }}>Thanks for Joining the company</Text>
        </div>
      </Flex>
      <Flex className="profile-footer">
        <Button onClick={ logout} type="text" icon={ <IoChevronBackSharp style={{ marginBottom: "-3px" }}/> }> Logout </Button>
      </Flex>

    </Flex>
  )
}
export default Profile