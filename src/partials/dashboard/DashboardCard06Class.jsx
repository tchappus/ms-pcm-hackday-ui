import React, { useState, useEffect } from 'react';
import DoughnutChart from '../../charts/DoughnutChart';

import { tailwindConfig } from '../../utils/Utils';

export default ({ paymentSubject, initialPaymentSubject }) => {

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Top currencies',
        data: [],
        backgroundColor: [
          tailwindConfig().theme.colors.indigo[500],
          tailwindConfig().theme.colors.blue[400],
          tailwindConfig().theme.colors.indigo[800],
        ],
        hoverBackgroundColor: [
          tailwindConfig().theme.colors.indigo[600],
          tailwindConfig().theme.colors.blue[500],
          tailwindConfig().theme.colors.indigo[900],
        ],
        hoverBorderColor: tailwindConfig().theme.colors.white,
      },
    ],
  });

  useEffect(() => {

    const currencies = new Set();
    const amounts = new Map();

    const processPayment = (payment) => {
      currencies.add(payment["currency"]);

      if (amounts.has(payment["currency"])) {
        amounts.set(payment["currency"], amounts.get(payment["currency"]) + payment["amount"]);
      } else {
        amounts.set(payment["currency"], payment["amount"]);
      }
    };

    const produceChartData = () => {
      const currenciesArray = Array.from(currencies).sort();
      const amountsArray = [];

      for (const curr of currencies) {
        amountsArray.push(amounts.get(curr));
      }

      return {
        labels: currenciesArray,
        datasets: [
          {
            label: 'Top currencies',
            data: amountsArray,
            backgroundColor: [
              tailwindConfig().theme.colors.indigo[500],
              tailwindConfig().theme.colors.blue[400],
              tailwindConfig().theme.colors.indigo[800],
            ],
            hoverBackgroundColor: [
              tailwindConfig().theme.colors.indigo[600],
              tailwindConfig().theme.colors.blue[500],
              tailwindConfig().theme.colors.indigo[900],
            ],
            hoverBorderColor: tailwindConfig().theme.colors.white,
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
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Top Currencies</h2>
      </header>
      <DoughnutChart data={chartData} width={389} height={260} />
    </div>
  );
};
