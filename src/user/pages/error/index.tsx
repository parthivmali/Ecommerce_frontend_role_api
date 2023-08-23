import { Link } from 'react-router-dom'

const index = () => {
  return (
      <div>
          <div className="flex items-center justify-center w-screen h-screen">
              <div className="text-center">
                  <h1 className="font-bold text-black text-7xl">404</h1>
                  <p className="text-2xl text-black"> <span className="text-red-600">Opps!</span> Page not found.</p>
                  <p className="text-black text-xl">
                      The page you’re looking for doesn’t exist.
                      </p>
                  <Link to={'/'}><div className='mt-4'><button className='border h-10 w-36 border-none bg-red-600 rounded-2xl hover:bg-red-700 text-slate-100  text-sm font-bold'>&larr; Go Back To Home</button></div></Link>
              </div>
                <img
                    src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
                    alt=""
                    className="absolute inset-0 -z-10 h-full w-full object-cover opacity-50"/>
                <div
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                aria-hidden="true"></div>
          </div>
      </div>
  )
}

export default index