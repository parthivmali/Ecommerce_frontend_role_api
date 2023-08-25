import {  Suspense, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Loader } from '../../user/assets/Loader'

const AdminRoutes = () => {
  const navigate = useNavigate()
    const [checkLogin, setCheckLogin] = useState('')

    useEffect(() => {
      const login = Cookies.get('jwt_admin')
      if(login){
        setCheckLogin(login)
      }else{
        navigate('/')
      }
    }, [navigate])
    
  return (
    <>
      {checkLogin 
      ?
        <div>
          <Suspense fallback={<Loader/>}>
            <Outlet/>
          </Suspense>
        </div>
      :
      null
      }
    </>
  )
}

export default AdminRoutes

