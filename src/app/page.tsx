'use client'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ReactECharts from 'echarts-for-react';

export default function Page() {
  const barChart = {
    title: {
      text: 'Sample Bar Chart',
    },
    tooltip: {},
    xAxis: {
      data: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'],
    },
    yAxis: {},
    series: [
      {
        name: 'Sample Data',
        type: 'bar',
        data: [20, 50, 36, 70, 30],
      },
    ],
  };

  const pieChart = {
    title: {
      text: 'Sample Bar Chart',
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series: [
      {
        name: 'Sample Data',
        type: 'pie',
        data: [
          { value: 20, name: 'Category 1' },
          { value: 50, name: 'Category 2' },
          { value: 36, name: 'Category 3' },
          { value: 70, name: 'Category 4' },
          { value: 30, name: 'Category 5' },
        ],
        radius: '55%',
        center: ['50%', '50%'],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      },
    ],
  };

  return (
    <>
      <div className="flex w-full gap-3 mb-3 flex-wrap">
        <div className=' flex-auto shadow-md p-3 border border-gray-300 rounded-xl bg-white transition-all relative hover:bg-purple-600 cursor-pointer group'>
          <span className='absolute right-3 bg-purple-300 text-purple-600 p-3 flex items-center justify-center top-3 rounded-xl group-hover:bg-white group-hover:text-purple-600'><ShoppingCartOutlinedIcon /></span>
          <p className='h-10 text-gray-600 text-base group-hover:text-white'>ABC&apos;s</p>
          <p className='h-10 text-xl group-hover:text-white'>2023</p>
          <p className='h-10 group-hover:text-white'><b className=' text-purple-600 group-hover:text-yellow-200'>3 new</b> Since last visit</p>
        </div>
        <div className=' flex-auto shadow-md p-3 border border-gray-300 rounded-xl bg-white transition-all relative hover:bg-purple-600 cursor-pointer group'>
          <span className='absolute right-3 bg-purple-300 text-purple-600 p-3 flex items-center justify-center top-3 rounded-xl group-hover:bg-white group-hover:text-purple-600'><ShoppingCartOutlinedIcon /></span>
          <p className='h-10 text-gray-600 text-base group-hover:text-white'>ABC&apos;s</p>
          <p className='h-10 text-xl group-hover:text-white'>2023</p>
          <p className='h-10 group-hover:text-white'><b className=' text-purple-600 group-hover:text-yellow-200'>3 new</b> Since last visit</p>
        </div>
      </div>

      <div className='flex w-full gap-3 mt-3 flex-wrap'>
        <div className=' w-80 flex-auto shadow-md p-3 border border-gray-300 rounded-xl bg-white transition-all relative'>
          <ReactECharts option={barChart} />
        </div>
        <div className=' w-80 flex-auto shadow-md p-3 border border-gray-300 rounded-xl bg-white transition-all relative'>
          <ReactECharts option={pieChart} />
        </div>
      </div>
    </>
  )
}
