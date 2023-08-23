import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Toaster from '../../hooks/Toaster';
import { AxiosError, AxiosResponse } from 'axios';
import { RegisterSchemas } from '../../schemas/RegisterSchemas';
import { register } from '../../services/Auth-services';
import { IRegisterRes, IRegisterUser } from '../../interfaces';

const RegisterUser = () => {
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
          name: '',
          email:'',
          password:'',
        },
        validationSchema:RegisterSchemas,
        onSubmit : (values:IRegisterUser) => {
          console.log("Values =>",values);
          
            const {name, email, password} = values
            const regValue = {
              name,
              email,
              password
            }
            register(regValue)
            .then((res:AxiosResponse<IRegisterRes>)=>{
                if(!res.data.success){
                    console.log("Please check your credentials");
                    
                }
                void Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful',
                }).then(() => {
                    navigate('/user-login')
                });    
            }).catch((err:AxiosError<string>)=>{
                if(err.response && err.response.data){
                    Toaster.error(err.response.data)
                }else{
                    console.log("Please check your credentials");
                    
                }
                
            });
        }
    })
    return (
        <>
          <div className="flex min-h-screen flex-1">
            <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div>
                        <img
                        className="h-20 w-20 mx-auto"
                        src="https://img.icons8.com/?size=512&id=z6yts2rWqz4y&format=png"
                        alt="Your Company"
                        />
                        <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-600">
                        Register Your Account
                        </h2>
                    </div>
                    <div className="mt-10">
                        <div>
                            <form className="space-y-2" method="POST" onSubmit={formik.handleSubmit}>
                                
                              {/* First Name */}
                              <div>
                                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">First name</label>
                                  <input 
                                  type="text" 
                                  id="name" 
                                  name='name'
                                  autoComplete='name'
                                  onChange={formik.handleChange}
                                  value={formik.values.name}
                                  className="bg-gray-100 border border-gray-400 text-gray-900 text-sm rounded-lg block w-full p-1.5"/>
                                  {formik.errors.name && formik.touched.name ? <p className="text-red-500">{formik.errors.name}</p> : null}

                              </div>
                          
                              {/* Email */}
                              <div className="mb-5">
                                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Email address</label>
                                  <input 
                                  type="email" 
                                  id="email" 
                                  name='email'
                                  onChange={formik.handleChange}
                                  value={formik.values.email}
                                  autoComplete="email"
                                  className="bg-gray-100 border border-gray-400 text-gray-900 text-sm rounded-lg block w-full p-1.5"/>
                                  {formik.errors.email && formik.touched.email ? <p className="text-red-500">{formik.errors.email}</p> : null}
                              </div>
                          
                              {/* Password */} 
                              <div className="mb-5">
                                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Password</label>
                                  <input 
                                  type="password" 
                                  id="password" 
                                  name='password'
                                  onChange={formik.handleChange}
                                  value={formik.values.password}
                                  autoComplete="new-password"
                                  className="bg-gray-100 border border-gray-400 text-gray-900 text-sm rounded-lg block w-full p-1.5"/>
                                  {formik.errors.password && formik.touched.password ? <p className="text-red-500">{formik.errors.password}</p> : null}

                              </div>
                              
                            <div style={{marginTop:'20px'}}>
                                <button type="submit" className="flex w-full justify-center rounded-md bg-gray-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-200" >
                                    Register
                                </button>
                            </div>
                            </form>
                        </div>
                        <p className="my-3 text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to={'/user-login'}>
                                <span className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Login</span>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <div className="relative hidden w-0 flex-1 lg:block bg-slate-950">
              <h2 className="absolute inset-0 font-extrabold text-5xl text-white text-center translate-y-2/4">Registered Ecommerce website</h2>
            </div>
          </div>
        </>
      )
}

export default RegisterUser