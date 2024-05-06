import { useEffect, useState } from "react"
import Profile from "../Components/Content/Profile/Profile"
import Private from "../Components/PrivateLayout"
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";
import {
  protectedInstance as axios 
} from "../Config/axios"
import { Flex, Typography} from "antd";
const { Title } = Typography
const ProfilePage = () => {

  const [loading, setLoading] = useState(true)
  const [profileData, setProfileData] = useState({})
  const [profileError, setprofileError] = useState(false)
  const navigate = useNavigate()
  const getProfile = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('/verify',
        {   
          headers: {   
              Authorization: `${token}`  
          }
        }
      )
      const data = response.data
      setLoading(false)
      if (data.success) {
        setProfileData(data.data)
      }else {
        // toast.error(`${data.message}`, {
        //   position: "top-right",
        // })
        navigate("/login")
      }
    } catch (error) {
        setLoading(false)
        setprofileError(true)
        toast.error(`Something went wrong`, {
          position: "top-right",
        })
    }

  }
  useEffect(() => {
    getProfile()
  }, [1])
  


  return (
    !loading ? 
      !profileError ?  
        (<Private Page={<Profile profileData={profileData}/>} />): 
            (<Flex style={{ width:"100%", height: "100%" }}>
              <Title> Something went wrong please try Again </Title>
            </Flex>)
          : 
          (<Flex style={{ width:"100%", height: "100%" }}>
            <Title> Loading ... </Title>
          </Flex>)
  )
}

export default ProfilePage