import React from 'react';
import DoughnutChart from '../../charts/DoughnutChart';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

class DashboardCard06Class extends React.Component {
  state = { copyChartData: [] };

 

  async componentDidMount() {
    const response = await fetch('http://localhost:8080/currency');
    const res = await response.json();

    let copyChartData = {
      labels: [],
      datasets: [
        {
          label: 'Top Countries',
          data:[],
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
    
    copyChartData.labels=res.dummyTop.chartData.labels;
    copyChartData.datasets[0].data=res.dummyTop.chartData.datasets[0].data;

    this.setState({ chartData : copyChartData });
    console.log(this.chartData );
 
  }

  render() {
    const { chartData } = this.state;

    return (
      <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
        <header className="px-5 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-800">Top Countries</h2>
        </header>
          <DoughnutChart data={chartData} width={389} height={260} />
      </div>
    );
  }
}

export default DashboardCard06Class;
