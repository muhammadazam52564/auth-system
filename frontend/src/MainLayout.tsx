import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProfilePage from './Pages/ProfilePage'
import LoginPage from './Pages/LoginPage'
import SignupPage from './Pages/SignupPage'
import { ToastContainer } from 'react-toastify'
import { GoogleOAuthProvider } from "@react-oauth/google";
const clientId = "300710204973-eajqckie8m62es09f0jk8dc8q1act7ik.apps.googleusercontent.com"

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProfilePage />,
  },
  {
    path: "/login",
    element: <LoginPage/>
  },
  {
    path: "/signup",
    element: <SignupPage/>
  } 
  
])

function MainLayout() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <ToastContainer position="top-right" />
      <RouterProvider router={router}/>
    </GoogleOAuthProvider>
  )
}

export default MainLayout
