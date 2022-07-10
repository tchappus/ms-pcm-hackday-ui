import React from "react"
import DashboardCard04Class from '../partials/dashboard/DashboardCard04Class';
import DashboardCard05Class from '../partials/dashboard/DashboardCard05Class';
import DashboardCard06Class from '../partials/dashboard/DashboardCard06Class';
import DashboardCard07Class from '../partials/dashboard/DashboardCard07Class';

class DashboardClass extends React.Component {

  render() {
    return (
      <div className="flex h-screen overflow-hidden">

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

          <main>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

              {/* Cards */}
              <div className="grid grid-cols-12 gap-6">
              <DashboardCard06Class />
              <DashboardCard04Class />
              <DashboardCard07Class />
                {/* /> 
                <DashboardCard04Class />
                <DashboardCard07Class /> */}
              </div>

            </div>
          </main>
        </div>
      </div>
    );
  }

}
export default DashboardClass;