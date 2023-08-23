import { useState, useEffect, Suspense } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Loader } from '../../user/assets/Loader'

const Public = () => {
  const navigate = useNavigate()
    const [checkedLogin, setCheckedLogin]=useState(false)

    useEffect(() => {
      const login= Cookies.get('jwt')
      const admin = Cookies.get('jwt_admin')
      if(login || admin){
        setCheckedLogin(true)   
      }
    }, [])
    
  return (
    <Suspense fallback={<Loader/>}>
    <>
      {
      checkedLogin ?
      <>
      {navigate('/')}
      </>
      :
        <Outlet/>
      }
    </>
    </Suspense>
  )
}

export default Public