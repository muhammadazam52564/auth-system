import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProfilePage from './Pages/ProfilePage'
import LoginPage from './Pages/LoginPage'
import SignupPage from './Pages/SignupPage'
import { ToastContainer } from 'react-toastify'


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
    <>
      <ToastContainer position="top-right" />
      <RouterProvider router={router}/>
    </>
  )
}

export default MainLayout
