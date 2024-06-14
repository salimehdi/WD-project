"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
const Chart = dynamic(
  () => import('react-apexcharts'),
  { ssr: false }
);

import { ApexOptions } from 'apexcharts';

const App: React.FC = () => {
  const [options] = useState<ApexOptions>({
    chart: {
      type: 'area',
      height: 160,
      sparkline: {
        enabled: true,
      },
    },
    xaxis: {
      categories: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
      ],
    },
    stroke: {
      curve: 'smooth',
    },
    dataLabels: {
      enabled: false,
    },
  });

  const [series] = useState([
    {
      name: 'Profit',
      data: [
        3800, 4200, 4500, 4700, 6200, 6500, 6800, 7000, 7200, 7500, 4800, 7500,
        1800, 4200, 3900, 2500, 2800, 5100, 4900, 5200, 5400, 1500, 8700, 3200,
        3500, 1200, 5500, 5800, 5196, 4457,
      ],
      // Define gradient color for the area beneath the line
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100],
        },
      },
    },
  ]);

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart rounded-lg bg-gray-100">
          <div className="relative p-10 text-6xl font-semibold text-blue-700">
            <div className="text-b absolute left-0 top-0 ml-10 mt-4 rounded-lg text-xl text-cyan-600">
              Profit:
            </div>
            65,625 ₹
          </div>
          {typeof window !== 'undefined' && (
            <Chart
            options={options}
            series={series}
            type="area"
            width="100%"
            height={250}
          />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
