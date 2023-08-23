import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import MonthlySalesChart from './MonthlySalesChart';
import StockInOut from './StockInOut';



const Index = () => {
  
  return (
    <div className='h-screen overflow-auto'>
      {/* Here showing a total selling products amount */}
      <div className='text-center bg-gray-600 text-white font-medium rounded mb-3'>
        <h1>Total Amount</h1>
        <span><CountUp start={0} end={100000} duration={3}/></span>
      </div>
      
      {/* Here showing a three main point's of dashboard which is admin can get easyly access (Product List, Order List, User's List) */}
      <div className='grid grid-cols-4 gap-3 my-3 bg-white p-3'>
        <Link to="/users" className='flex items-center justify-center text-center mx-auto w-full shadow h-24 rounded bg-red-500 text-white font-bold'>
          <div>
            <h1>Users</h1>
            <span><CountUp start={0} end={100} duration={3}/></span>
          </div>
        </Link>
        <Link to='/products' className='flex items-center justify-center text-center mx-auto w-full shadow h-24 rounded bg-orange-500 text-white font-bold'>
          <div>
            <h1>Products</h1>
            <span><CountUp start={0} end={10} duration={3}/></span>
          </div>
        </Link>
        <Link to="/categories" className='flex items-center justify-center text-center mx-auto w-full shadow h-24 rounded bg-green-500 text-white font-bold'>  
          <div>
            <h1>Categories</h1>
            <span><CountUp start={0} end={8} duration={3}/></span>
          </div>
        </Link>
        <Link to="/orders" className='flex items-center justify-center text-center mx-auto w-full shadow h-24 rounded bg-blue-500 text-white font-bold'>  
          <div>
            <h1>Orders</h1>
            <span><CountUp start={0} end={5} duration={3}/></span>
          </div>
        </Link>
      </div>

      {/* Here showing a two chart's one of is showing selling monthly vise & second one is showing how much stock is In or Out */}
      <div className='flex gap-3'>
        <MonthlySalesChart/>
        <StockInOut/>
      </div>

    </div>
  )
}

export default Index