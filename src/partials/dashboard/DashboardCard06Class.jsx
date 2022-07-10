import React from 'react';
import DoughnutChart from '../../charts/DoughnutChart';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

class DashboardCard06Class extends React.Component {
  state = { dummyTop: [] };



  async componentDidMount() {
    const response = await fetch('http://localhost:8080/currency');
    const res = await response.json();

    this.setState({ dummyTop: res.dummyTop });
    console.log(this.dummyTop );
 
  }

  render() {


    const { dummyTop } = this.state;

    console.log(dummyTop );

    return (
      <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
        <header className="px-5 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-800">Top Countries</h2>
        </header>
          <DoughnutChart data={dummyTop.chartData} width={389} height={260} />
      </div>
    );
  }
}

export default DashboardCard06Class;
