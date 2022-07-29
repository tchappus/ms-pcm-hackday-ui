import React, { useState, useEffect } from "react"
import { Subject } from "rxjs";
import DashboardCard04Class from '../partials/dashboard/DashboardCard04Class';
import DashboardCard05Class from '../partials/dashboard/DashboardCard05Class';
import DashboardCard06Class from '../partials/dashboard/DashboardCard06Class';
import DashboardCard07Class from '../partials/dashboard/DashboardCard07Class';

export default () => {
  const paymentSubject = new Subject();
  const initialPaymentSubject = new Subject();

  useEffect(() => {

    fetch("http://payment-apps42-api.westus.azurecontainer.io/payments/all")
      .then(resp => resp.json())
      .then(body => {
        console.log(body);
        initialPaymentSubject.next(body);
      });

    const paymentEvtSrc = new EventSource('http://payment-apps42-api.westus.azurecontainer.io/payments');
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
              <DashboardCard04Class paymentSubject={paymentSubject} initialPaymentSubject={initialPaymentSubject} />
              <DashboardCard05Class paymentSubject={paymentSubject} initialPaymentSubject={initialPaymentSubject} />
              <DashboardCard06Class paymentSubject={paymentSubject} initialPaymentSubject={initialPaymentSubject} />
              <DashboardCard07Class paymentSubject={paymentSubject} initialPaymentSubject={initialPaymentSubject} />
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}