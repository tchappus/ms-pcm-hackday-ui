import React, { useState, useEffect } from "react"
import { Subject } from "rxjs";
import DashboardCard04Class from '../partials/dashboard/DashboardCard04Class';
import DashboardCard05Class from '../partials/dashboard/DashboardCard05Class';
import DashboardCard06Class from '../partials/dashboard/DashboardCard06Class';
import DashboardCard07Class from '../partials/dashboard/DashboardCard07Class';

export default () => {
  const paymentSubject = new Subject();

  useEffect(() => {
    const paymentEvtSrc = new EventSource('http://localhost:8082/payments-test');
    paymentEvtSrc.onmessage = function (event) {
      paymentSubject.next(JSON.parse(event.data));
    }
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              <DashboardCard04Class paymentSubject={paymentSubject} />
              <DashboardCard05Class paymentSubject={paymentSubject} />
              <DashboardCard06Class paymentSubject={paymentSubject} />
              <DashboardCard07Class paymentSubject={paymentSubject} />
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
