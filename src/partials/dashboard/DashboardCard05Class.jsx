import React, { useState, useEffect } from 'react';
import Info from '../../utils/Info';
import RealtimeChart from '../../charts/RealtimeChart';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

export default ({ paymentSubject, initialPaymentSubject }) => {

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
    
    const timestamps = []
    const values = [];
    let value = 0;

    const processPayment = (payment) => {
      const timestamp = payment["timestamp"];

      if (payment["direction"] == "into") {
        value += payment["amount"];
      } else {
        value -= payment["amount"];
      }

      values.push(value);
      timestamps.push(timestamp);
    };

    const produceChartData = () => {
      return {
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
      };
    };

    initialPaymentSubject.subscribe({
      next: payments => {

        for (const payment of payments) {
          processPayment(payment);
        }

        setChartData(produceChartData());

        paymentSubject.subscribe({
          next: payment => {
            processPayment(payment);
    
            setChartData(produceChartData());
          }
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
