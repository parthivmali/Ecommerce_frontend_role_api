import { PureComponent } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

// Dummy data of chart
const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
];

// Chart color variable
const COLORS = [ '#22c55e', '#f97316'];


const RADIAN = Math.PI / 180;
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index } : any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}`}
    </text>
  );
};

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/pie-chart-with-customized-label-dlhhj';

  render() {
    return (
      <>
        <div className='relative top-10 left-10 z-40'>
            <span className='h-2 w-5 bg-green-500 inline-block mx-1'></span>In Stock
            <br /> 
            <span className='h-2 w-5 bg-orange-500 inline-block mx-1'></span>Out Of Stock 
        </div>
        <div className='absolute right-3'>
        <PieChart width={625} height={350} className='bg-white rounded'>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
        </div>
      </>
    );
  }
}