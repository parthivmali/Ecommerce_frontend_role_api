import { useFormik } from "formik";
import { login } from "../../services/Auth-services";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { LoginSchemas } from "../../schemas/LoginSchemas";

const LoginUser = () => {
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            email:'',
            password:''
        },
        validationSchema:LoginSchemas,
        onSubmit :  (values) => {
            const {email, password} = values
            const logValue = {
                email,
                password,
            }
            login(logValue)
            .then((res) => {
              if(res){
                
                void Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                }).then(() => {
                    if (res.role === 'admin') {
                       navigate('/admin/dashboard');
                    } else {
                        navigate('/home');
                    }
                });
              }
            })
            .catch((err) =>{
                console.log(err);
            })
        }
    })
  return (
    <div className="flex min-h-screen flex-1">
        <div className="relative hidden w-0 flex-1 lg:block bg-slate-950">
          <h2 className="absolute inset-0 font-extrabold text-5xl text-white text-center translate-y-2/4">Login Ecommerce website </h2>
        </div>
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96">
                <div>
                    <img
                    className="h-20 w-20 mx-auto"
                    src="/images/registration_icon.svg"
                    alt="Your Company"
                    />
                    <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-600">
                      Welcome To Ecommerce website
                    </h2>
                </div>
                <div className="mt-10">
                    <div>
                        <form className="space-y-2" method="POST" onSubmit={formik.handleSubmit}>
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
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Password</label>
                                    <div className="text-sm">
                                        <Link to={"/email-send"} className="font-semibold text-indigo-600 hover:text-indigo-500">
                                            Forgot password?
                                        </Link>
                                    </div>

                                </div>
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
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                    <p className="mt-5 text-center text-sm text-gray-700">
                        Not a member?{' '}
                        <Link to="/user-register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-800">
                        Create a new user
                        </Link>
                    </p>
                </div>
            </div>
        </div>      
    </div>
  )
}

export default LoginUser