import { useGoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { protectedInstance as axios } from "../Config/axios"
import { useNavigate } from 'react-router-dom'

export const  useAuth = () => {
    const navigate = useNavigate()

    const checkIsLogedIn = async function ()  {
        try {
            const token = localStorage.getItem('token')

            if(!token) return false

            const response = await axios.get('/verify', 
                {   
                    headers: {   
                        Authorization: `${token}`  
                    }
                }
            )
            const data = response.data
            if (data.success) {
                return true
              }else {
                // localStorage.removeItem('token')
                return false
              }
            return false
        } catch (error) {
            return false
        }
    }

    const googleAuth = async function (payload: any)  {
        try {
            const response = await axios.post('/googgle-auth', 
                payload
            )
            const data = response.data
            if (data.success) {
                localStorage.setItem('token', data.token)
                navigate('/')
            }else {
                toast.error(`${data.message}`, {
                    position: "top-right",
                })
            }
        } catch (error) {
            toast.error(`Something went wrong try again !`, {
                position: "top-right",
            })
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log(tokenResponse);
            
            await googleAuth({
                 tokenResponse
            })
        },
        onError: ()=>{
            toast.error(`Google Signin could not completed !`, {
                position: "top-right",
            })
        }
    });

    return {
        checkIsLogedIn,
        googleLogin
    }
} 