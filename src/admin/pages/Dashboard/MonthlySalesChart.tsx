import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';


const MonthlySalesChart = () => {
    // Dummy data of chart
    const data = [
        {name: 'Page A', uv: 550, pv: 2400, amt: 2400},
        {name: 'Page B', uv: 200, pv: 2200, amt: 2200},
        {name: 'Page C', uv: 300, pv: 2300, amt: 2300},
        {name: 'Page D', uv: 500, pv: 2500, amt: 2500},
        {name: 'Page E', uv: 200, pv: 2200, amt: 2200},
        {name: 'Page A', uv: 550, pv: 2400, amt: 2400},
        {name: 'Page B', uv: 200, pv: 2200, amt: 2200},
        {name: 'Page C', uv: 300, pv: 2300, amt: 2300},
        {name: 'Page D', uv: 500, pv: 2500, amt: 2500},
        {name: 'Page E', uv: 200, pv: 2200, amt: 2200},
        {name: 'Page D', uv: 500, pv: 2500, amt: 2500},
        {name: 'Page E', uv: 200, pv: 2200, amt: 2200},
    ];

  return (
    <BarChart width={625} height={350} data={data} className='bg-white rounded'>
        <XAxis dataKey="name" stroke="#8884d8" />
        <YAxis />
        <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
        <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Bar dataKey="uv" fill="#4b5563" barSize={30} />
    </BarChart>
  )
}

export default MonthlySalesChart