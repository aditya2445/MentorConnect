import React from 'react';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, LineElement, BarElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6';
import { useSelector } from 'react-redux';


ChartJS.register(ArcElement, LineElement, BarElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const getLastSixMonths = () => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const result = [];
  const today = new Date();
  let month = today.getMonth();

  for (let i = 0; i < 6; i++) {
    result.unshift(months[month]);
    month = (month - 1 + 12) % 12; 
  }

  return result;
};

const DashboardCharts = () => {
  const lastSixMonths = getLastSixMonths();
 const {user} = useSelector(state=>state.profile)
  // Doughnut Chart Data
  const doughnutData = {
    labels: lastSixMonths, 
    datasets: [
      {
        label: 'Users Joined',
        data: [50, 40, 65, 30, 55, 80], 
        backgroundColor: ['#FF6B6B', '#FFCA3A', '#8AC926', '#1982C4', '#6A4C93', '#FF595E'],
        hoverBackgroundColor: ['#FF4B4B', '#FFB52A', '#78B317', '#146AB8', '#5E3A8C', '#FF3D41'],
        borderWidth: 1,
      },
    ],
  };

  // Line Chart Data
  const lineChartData = {
    labels: lastSixMonths, 
    datasets: [
      {
        label: 'Mentors Joined',
        data: [20, 35, 40, 25, 50, 60], 
        borderColor: '#FF6B6B', 
        backgroundColor: 'rgba(255, 107, 107, 0.2)',
        fill: true,
        pointBorderColor: '#FF6B6B',
        pointBackgroundColor: '#FF6B6B',
        borderWidth:1
      },
      {
        label: 'Mentees Joined',
        data: [30, 45, 55, 35, 60, 75], 
        borderColor: '#1982C4', 
        backgroundColor: 'rgba(25, 130, 196, 0.2)', 
        fill: true,
        pointBorderColor: '#1982C4',
        pointBackgroundColor: '#1982C4',
        borderWidth:1
      },
    ],
  };
// Barchart Data
  const barChartData = {
    labels: lastSixMonths,
    datasets: [
      {
        label: 'sessions Revenue',
        data: [800, 500, 700, 300, 1000, 400],
        backgroundColor: '#14B8A6',
        borderColor: '#14B8A6',
        borderWidth: 1,
      },
      {
        label: 'webinar Revenue',
        data: [200, 250, 100, 130, 345, 190],
        backgroundColor: '#F97316',
        borderColor: '#F97316',
        borderWidth: 1,
      },
      {
        label: 'courses Revenue',
        data: [900, 1200, 800, 1300, 950, 1600],
        backgroundColor: '#1E3A8A',
        borderColor: '#1E3A8A',
        borderWidth: 1,
      },
    ],
  };

  // Line Chart Options
  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true, 
     },
    },
  };

  // Doughnut Chart Options
 
  const doughnutChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false, 
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw} users`;
          },
        },
      },
    },
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true, // Display the legend
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Ensures the Y-axis starts from 0
        ticks: {
          callback: function (value) {
            return `$${value}`; // Format the ticks as currency
          },
        },
      },
    },
  };
  return (
    <div className="flex justify-center w-full items-center space-x-8 mt-8">

    
     <div className='flex w-full flex-col gap-10'>
        {/* total analytics */}
     <div className='flex w-full flex-col gap-10 items-center'>
        <h1 className='text-2xl font-bold underline'>Total Analytics</h1>
       {user?.accountType === "Admin" ? <div className='flex w-full items-center justify-between '>
         <div className='w-[300px] p-5 bg-gradient-to-tr from-green-100 to-white h-[150px] border-[1px] flex flex-col justify-center'>
             <p className='text-3xl font-bold'>4,352</p>
             <h1 className=''>Total no of users Users</h1>
             <div className='flex w-full mt-3 justify-between '>
                <div className='flex gap-2 items-center justify-between text-green-500'><FaArrowTrendUp/> 
                <p>1,240</p>
                <p className='text-black italic text-sm'>2.09% this week</p>
             </div></div>
         </div>
         <div className='w-[300px] p-5 bg-gradient-to-tr from-red-100 to-white h-[150px] border-[1px] flex flex-col  justify-center'>
         <p className='text-3xl font-bold'>1,10,352</p>
         <h1 className=''>Total no of users Mentees</h1>
         <div className='flex w-full mt-3 justify-between '>
                <div className='flex gap-2 items-center justify-between text-green-500'><FaArrowTrendUp/> 
                <p>2,230</p>
                <p className='text-black italic text-sm'>1.06% this week</p>
             </div></div>
         </div>
         <div className='w-[300px] p-5 bg-gradient-to-tr from-blue-100 to-white h-[150px] border-[1px] flex flex-col  justify-center'>
         <p className='text-3xl font-bold counter'>14,352</p>
         <h1 className=''>Total no of users Mentors</h1>
         <div className='flex w-full mt-3 justify-between '>
                <div className='flex gap-2 items-center justify-between text-red-500'><FaArrowTrendDown/> 
                <p>2</p>
                <p className='text-black italic text-sm'>0.03% this week</p>
             </div></div>
         </div>
         <div className='w-[300px] p-5 bg-gradient-to-tr from-yellow-100 to-white h-[150px] border-[1px] flex flex-col justify-center'>
         <p className='text-3xl font-bold'>4,00,102</p>
         <h1 className=' '>Total Revenue</h1>
         <div className='flex w-full mt-3 justify-between '>
                <div className='flex gap-2 items-center justify-between text-green-500'><FaArrowTrendUp/> 
                <p>30,030</p>
                <p className='text-black italic text-sm'>3.16% this week</p>
             </div></div>
         </div>
        </div> :  
        // for mentors
        <div className='flex w-full items-center justify-between '>
         <div className='w-[300px] p-5 bg-gradient-to-tr from-green-100 to-white h-[150px] border-[1px] flex flex-col justify-center'>
             <p className='text-3xl font-bold'>4,352</p>
             <h1 className=''>Mentees under me</h1>
             <div className='flex w-full mt-3 justify-between '>
                <div className='flex gap-2 items-center justify-between text-green-500'><FaArrowTrendUp/> 
                <p>1,240</p>
                <p className='text-black italic text-sm'>2.09% this week</p>
             </div></div>
         </div>
         <div className='w-[300px] p-5 bg-gradient-to-tr from-red-100 to-white h-[150px] border-[1px] flex flex-col  justify-center'>
         <p className='text-3xl font-bold'>32</p>
         <h1 className=''>Total no of courses</h1>
         <div className='flex w-full mt-3 justify-between '>
                <div className='flex gap-2 items-center justify-between text-green-500'><FaArrowTrendUp/> 
                <p>3</p>
                <p className='text-black italic text-sm'>1.06% this week</p>
             </div></div>
         </div>
         <div className='w-[300px] p-5 bg-gradient-to-tr from-blue-100 to-white h-[150px] border-[1px] flex flex-col  justify-center'>
         <p className='text-3xl font-bold counter'>152</p>
         <h1 className=''>Total no of Sessions</h1>
         <div className='flex w-full mt-3 justify-between '>
                <div className='flex gap-2 items-center justify-between text-red-500'><FaArrowTrendDown/> 
                <p>2</p>
                <p className='text-black italic text-sm'>0.03% this week</p>
             </div></div>
         </div>
         <div className='w-[300px] p-5 bg-gradient-to-tr from-yellow-100 to-white h-[150px] border-[1px] flex flex-col justify-center'>
         <p className='text-3xl font-bold'>1,00,102</p>
         <h1 className=' '>Total Revenue</h1>
         <div className='flex w-full mt-3 justify-between '>
                <div className='flex gap-2 items-center justify-between text-green-500'><FaArrowTrendUp/> 
                <p>10,030</p>
                <p className='text-black italic text-sm'>10.16% this week</p>
             </div></div>
         </div>
        </div>}

     </div>
        
        {user?.accountType === "Admin" ? <div className='gap-10 flex flex-col w-full'>
        <div className='flex w-full gap-10 justify-evenly items-center'>
      {/* Line Chart */}
      <div className="w-[60%] flex border-[1px] rounded-md p-5 flex-col items-center">
        <h2 className="text-center text-xl font-semibold mb-4">Mentors & Mentees Joined in the Last 6 Months</h2>
      <div className='w-[600px] h-[300px]'>  <Line data={lineChartData} options={lineChartOptions} /></div>
      </div>
      {/* Doughnut Chart */}
      <div className="w-[40%] border-[1px] rounded-md p-5  flex flex-col items-center">
        <h2 className="text-center text-xl font-semibold mb-4">Users Joined in the Last 6 Months</h2>
       <div className='h-[300px] w-[300px]'> <Doughnut data={doughnutData} options={doughnutChartOptions} /></div>
      </div>
        </div>
       
        <div className='flex gap-10 flex-row-reverse w-full justify-evenly items-center'>
      {/* Line Chart */}
      <div className="w-[60%] flex border-[1px] rounded-md p-5 flex-col items-center">
        <h2 className="text-center text-xl font-semibold mb-4">Revenue from Mentors & Mentees in the Last 6 Months</h2>
       <div className='h-[300px] w-[600px]'> <Bar data={barChartData} options={barChartOptions} /></div>
      </div>
      {/* Doughnut Chart */}
      <div className="w-[40%] border-[1px] rounded-md p-5  flex flex-col items-center">
        <h2 className="text-center text-xl font-semibold mb-4">Revenue in the Last 6 Months</h2>
       <div className='h-[300px] w-[300px]'> <Doughnut data={doughnutData} options={doughnutChartOptions} /></div>
      </div>
        </div>
        </div> : <div className='flex w-full gap-10 justify-evenly items-center'>
      {/* Line Chart */}
      <div className="w-[60%] flex border-[1px] rounded-md p-5 flex-col items-center">
        <h2 className="text-center text-xl font-semibold mb-4"> Mentees Joined in the Last 6 Months</h2>
      <div className='w-[550px] h-[300px]'>  <Line data={lineChartData} options={lineChartOptions} /></div>
      </div>
      {/* Bar Chart */}
      <div className="w-[60%] flex border-[1px] rounded-md p-5 flex-col items-center">
        <h2 className="text-center text-xl font-semibold mb-4">Revenue from Sessions, webinars and courses in the Last 6 Months</h2>
       <div className='h-[300px]  w-[550px]'> <Bar data={barChartData} options={barChartOptions} /></div>
      </div>
        </div> }
     </div>
    </div>
  );
};

export default DashboardCharts;
