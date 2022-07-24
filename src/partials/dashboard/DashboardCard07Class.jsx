import React, { useEffect, useState } from 'react';

export default ({ paymentSubject }) => {

  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const paymentsArr = [];

    paymentSubject.subscribe({
      next: (payment) => {
        paymentsArr.push(payment);
        if (paymentsArr.length > 10) {
          paymentsArr.shift();
        }
        paymentsArr.reverse();
        setPayments([...paymentsArr]);
      }
    });
  }, []);

  return (
    <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Recent Payments</h2>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-center">BIC code</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Name</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">City</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Amount</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Currency</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Timestamp</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100">
              {/* Row */}
              {payments.map(payment => (
                <tr key="{payment.id}">
                  <td className="p-2">
                    <div className="flex items-center">
                      <div className="text-slate-800"  >{payment.externalParty.bicCode}</div>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex items-center">
                      <div className="text-slate-800">{payment.externalParty.bankName}</div>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex items-center">
                      <div className="text-slate-800">{payment.externalParty.city}</div>
                    </div>
                  </td>
                  <td className="p-2">
                  {payment.direction == "into" &&
                    <div className="text-right text-green-500">{payment.amount.toFixed(2)}</div>
                  }
                  {payment.direction != "into" &&
                    <div className="text-right text-red-500">({payment.amount.toFixed(2)})</div>
                  }
                  </td>
                  <td className="p-2">
                    <div className="text-center text-sky-500" >{payment.currency}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-center text-sky-500" >{payment.timestamp.split("T")[0]}  {payment.timestamp.split("T")[1].substring(0, 8)}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

