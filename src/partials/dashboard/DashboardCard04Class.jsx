import React, { useEffect, useState } from 'react';
import BarChart from '../../charts/BarChart01';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

export default ({ paymentSubject, initialPaymentSubject }) => {

  const [chartData, setChartData] = useState({
    labels: ['2022-07-23'],
    datasets: [
      // Light blue bars
      {
        label: 'Pay',
        data: [0],
        backgroundColor: tailwindConfig().theme.colors.blue[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[500],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Blue bars
      {
        label: 'Receive',
        data: [0],
        backgroundColor: tailwindConfig().theme.colors.indigo[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.indigo[600],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
    ],
  });

  useEffect(() => {
    const dates = new Set();
    const pay = new Map();
    const receive = new Map();

    const processPayment = (payment) => {
      const date = payment["timestamp"].split("T")[0];

      if (dates.has(date)) {
        if (payment["direction"] == "into") {
          receive.set(date, receive.get(date) + payment["amount"]);
        } else {
          pay.set(date, pay.get(date) + payment["amount"]);
        }
      } else {
        pay.set(date, 0);
        receive.set(date, 0);
        dates.add(date);
        if (payment["direction"] == "into") {
          receive.set(date, payment["amount"]);
        } else {
          pay.set(date, payment["amount"]);
        }
      }
    }

    const produceChartData = () => {
      const datesArray = Array.from(dates).sort();
      const payValues = [];
      const receiveValues = [];

      for (const date of datesArray) {
        if (pay.has(date)) {
          payValues.push(pay.get(date));
        } else {
          payValues.push(0);
        }

        if (receive.has(date)) {
          receiveValues.push(receive.get(date));
        } else {
          receiveValues.push(0);
        }
      }
      return {
        labels: datesArray,
        datasets: [
          // Light blue bars
          {
            label: 'Pay',
            data: payValues,
            backgroundColor: tailwindConfig().theme.colors.blue[400],
            hoverBackgroundColor: tailwindConfig().theme.colors.blue[500],
            barPercentage: 0.66,
            categoryPercentage: 0.66,
          },
          // Blue bars
          {
            label: 'Receive',
            data: receiveValues,
            backgroundColor: tailwindConfig().theme.colors.indigo[500],
            hoverBackgroundColor: tailwindConfig().theme.colors.indigo[600],
            barPercentage: 0.66,
            categoryPercentage: 0.66,
          },
        ],
      };
    }


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
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Pay VS Receive</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <BarChart data={chartData} width={595} height={248} />
    </div>
  );
};
