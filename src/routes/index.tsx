import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Loader } from '../user/assets/Loader';
import Cookies from 'js-cookie';
const Home = React.lazy(() => import('../user/pages/Home'))
const RegisterUser = React.lazy(() => import('../user/components/authentication/RegisterUser'));
const LoginUser = React.lazy(() => import('../user/components/authentication/LoginUser'));
const Offer = React.lazy(() => import('../user/pages/Offer'));
const Products = React.lazy(() => import('../user/pages/Products'));
const Private = React.lazy(() => import('./private'));
const Public = React.lazy(() => import('./public'));
const AdminRoutes = React.lazy(() => import('./adminRoutes'));
const Error = React.lazy(() => import('../user/pages/error/index'));
const SideAndTopBar = React.lazy(() => import('../admin/components/SideAndTopBar'));


const index = () => {
    const getToken = Cookies.get('jwt')
    const isLoggedIn = !!getToken;
    console.log("isLogged =>",isLoggedIn);
    

  return (
    <div>
      <Suspense fallback={<Loader/>}>
        <Routes>
          {isLoggedIn ? 
          <>
            {/* User Routes */}
              <Route element={<Private/>}>
                <Route path="/home" element={<Home/>}/>
                <Route path="/offers" element={<Offer/>}/>
                <Route path="/products" element={<Products/>}/>
              </Route>
          </>
          :
          <>
            {/* Admin Routes */}
              <Route element={<AdminRoutes/>}>
                <Route path="admin/*" element={<SideAndTopBar/>}/>
              </Route>
          </>
          }
          {/* Authentication Routes */}
          <Route element={<Public/>}>
            <Route path="/user-register" element={<RegisterUser/>}/>
            <Route path="/" element={<LoginUser/>}/>
          </Route>

          {/* Error Page Routes */}
          <Route path="*" element={<Error/>}/>

        </Routes>
      </Suspense>
    </div>
  )
}

export default index