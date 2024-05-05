import {
    protectedInstance as axios 
  } from "../Config/axios"

export const  useAuth = () => {
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

    return {
        checkIsLogedIn
    }
} 