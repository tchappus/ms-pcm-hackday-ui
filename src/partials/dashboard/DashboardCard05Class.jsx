import React, { useState, useEffect } from 'react';
import Info from '../../utils/Info';
import RealtimeChart from '../../charts/RealtimeChart';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

class DashboardCard05Class extends React.Component {


  render() {

    // IMPORTANT:
    // Code below is for demo purpose only, and it's not covered by support.
    // If you need to replace dummy data with real data,
    // refer to Chart.js documentation: https://www.chartjs.org/docs/latest


    const labels = ['JL 01', 'JL 02', 'JL 03', 'JL 04', 'JL 05', 'JL 06', 'JL 07', 'JL 08' ]
    
    // Dummy data to be looped
    const data = [ 1000, 2000, 4200, 3200,3300, 2000,2100, 2310];

     const chartData = {
      labels: labels,
      datasets: [
        // Indigo line
        {
          data: data,
          fill: true,
          backgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.blue[500])}, 0.08)`,
          borderColor: tailwindConfig().theme.colors.indigo[500],
          borderWidth: 2,
          tension: 0,
          pointRadius: 0,
          pointHoverRadius: 3,
          pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
          clip: 20,
        },
      ],
    };

    return (
      <div className="flex flex-col col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
        <header className="px-5 py-4 border-b border-slate-100 flex items-center">
          <h2 className="font-semibold text-slate-800">Real Time Value</h2>
          <Info className="ml-2" containerClassName="min-w-44">
            <div className="text-sm text-center">Built with <a className="underline" href="https://www.chartjs.org/" target="_blank" rel="noreferrer">Chart.js</a></div>
          </Info>
        </header>
        {/* Chart built with Chart.js 3 */}
        {/* Change the height attribute to adjust the chart height */}
        <RealtimeChart data={chartData} width={595} height={248} />
      </div>
    );
  }
}
export default DashboardCard05Class;
