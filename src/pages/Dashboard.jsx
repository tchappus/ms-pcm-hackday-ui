import React, { useState } from 'react';

import DashboardCard04 from '../partials/dashboard/DashboardCard04';
import DashboardCard05 from '../partials/dashboard/DashboardCard05';
import DashboardCard06 from '../partials/dashboard/DashboardCard06';
import DashboardCard07 from '../partials/dashboard/DashboardCard07';

function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">


        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">



            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">

              <DashboardCard04 />
              {/* Line chart (Real Time Value) */}
              <DashboardCard05 />
              {/* Table (Top Channels) */}
              <DashboardCard07 />
              {/* Doughnut chart (Top Countries) */}
              <DashboardCard06 />

              
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;