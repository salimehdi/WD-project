"use client";
import React, { useState } from "react";
import Chart from "react-apexcharts";

const App = () => {
  const [options] = useState({
    
    chart: {
      type: 'area',
      height: 160,
      sparkline: {
        enabled: true
      },
    },
    xaxis: {
      categories: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
    },
    stroke: {
      curve: "smooth"
    },
    dataLabels: {
      enabled: false
    }
  });

  const [series] = useState([
    {
      name: "Profit ",
      data: [0,0,0,0,1,32,6,15,1,6,7,8,9,12,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
      // Define gradient color for the area beneath the line
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100]
        }
      }
    }
  ]);

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart bg-gray-100 rounded-lg" >
          <div className="text-6xl font-semibold p-10 text-blue-700 relative">
            <div className="absolute text-xl text-cyan-600 top-0 left-0 ml-10 mt-4 text-b rounded-lg">Profit:</div>
            2562.5 ₹
          </div>
          <Chart
            options={options}
            series={series}
            type="area" 
            width="100%"
            height={250}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
