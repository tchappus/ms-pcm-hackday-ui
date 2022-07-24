import React, { useState, useEffect } from 'react';
import Info from '../../utils/Info';
import RealtimeChart from '../../charts/RealtimeChart';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

export default ({ paymentSubject }) => {

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      // Indigo line
      {
        data: [],
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
  });

  useEffect(() => {
    const payments = [];
    paymentSubject.subscribe({
      next: payment => {
        payments.push(payment);

        const timestamps = []
        const values = [];
        let value = 0;

        for (const payment of payments) {
          
          const date = payment["timestamp"].split("T")[0];

          if (date != '2022-07-23') {
            continue;
          }

          const timestamp = payment["timestamp"].split("T")[1].substring(0, 8);

          if (payment["direction"] == "into") {
            value += payment["amount"];
          } else {
            value -= payment["amount"];
          }

          values.push(value);
          timestamps.push(timestamp);
        }

        setChartData({
          labels: timestamps,
          datasets: [
            // Indigo line
            {
              data: values,
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
        });
      }
    });
  }, []);


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
};
