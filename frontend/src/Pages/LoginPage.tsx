import Auth from "../Components/PublicLayout"
import Login from "../Components/Content/Login/Login"

const LoginPage = () => {
  return (
    <Auth Page={<Login/>}/>
  )
}

export default LoginPage