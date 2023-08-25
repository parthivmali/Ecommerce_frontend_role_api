import { Suspense, useEffect, useState } from 'react'
import Footer from '../../user/components/Footer'
import Navbar from '../../user/components/header/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Loader } from '../../user/assets/Loader'

const Private = () => {
    const navigate = useNavigate()
    const [checkLogin, setCheckLogin] = useState(false)

    useEffect(() => {
      const login = Cookies.get('jwt')
      if(login){
        setCheckLogin(true)
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
            <Navbar/>
            <Outlet/>
            <Footer/>
          </Suspense>
        </div>
      :
      null
      }
    </>
  )
}

export default Private