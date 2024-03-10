import React from 'react';
import ReactApexChart from 'react-apexcharts';

const MyLineChart = (props) => {
  const dates = props.data.map(day => day.dt);
  const temperatures =  props.data.map(day => day.temp.day);
  const chartState = {
    series: [
      {
        name: 'Last Month',
        data: props.data2.map(day => day.temp.day),
      },
      {
        name: 'This Month',
        data: props.data.map(day => day.temp.day),
      },
    ],
    options: {
      chart: {
        type: 'area',
        zoom: {
          enabled: false,
          type: 'x',
          autoScaleYaxis: true,
        },
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth',
        width:0,
      },
      xaxis: {
        show: false, // Hide x-axis
        labels: {
          show: false, // Hide x-axis labels
        },
        axisBorder: {
          show: false, // Hide x-axis border lines
        },
        axisTicks: {
          show: false, // Hide x-axis ticks
        },
      },
      yaxis: {
        show: false, // Hide y-axis
        axisBorder: {
          show: false, // Hide y-axis border lines
        },
        axisTicks: {
          show: false, // Hide y-axis ticks
        },
        labels: {
          show: false, // Hide y-axis labels
        },
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
      grid: {
        show: false, // Hide the grid
      },
      toolbar: {
        show: false, // Hide toolbar with zoom and other navigation menus
      },
      legend: {
        show: false, // Hide series names at the bottom
      },
      colors: ['#FFD9B1', '#FF8900'],
      annotations: {
        xaxis: dates.map((date, index) => ({
          x: date,
          borderColor: '#00E396',
          label: {
            borderColor: '#00E396',
            style: {
              fontSize: '12px',
              color: '#fff',
              background: '#00E396',
            },
            orientation: 'vertical',
            offsetY: -10,
            text: temperatures[index].toFixed(2), // Display the temperature as the annotation text
          },
        })),
      },
    }
  };

  return (
    <div className='mb-0 pb-0'>
      <div id="chart">
        <ReactApexChart options={chartState.options} series={chartState.series} type="area" height={250} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};


export default MyLineChart;