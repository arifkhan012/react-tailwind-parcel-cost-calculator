import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [value, setValue] = useState();
  const [defaultCost] = useState(100);
  const [destination, setDestination] = useState("inside");
  const [rules] = useState([
    {
      min: 1,
      max: 5,
      inside: 60,
      outside: 100,
      status: true,
    },
    {
      min: 6,
      max: 10,
      inside: 100,
      outside: 150,
      status: true,
    },
    {
      min: 11,
      max: 15,
      inside: 150,
      outside: 200,
      status: false,
    },
    {
      min: 16,
      max: 25,
      inside: 250,
      outside: 400,
      status: true,
    },
  ]);
  const [orders, setOrders] = useState([]);
  const addOrderHandler = () => {
    if (value) {
      let rule = rules.find(
        (rule) => value >= rule.min && value <= rule.max && rule.status
      );
      if (rule) {
        let order = {
          value: value,
          destination,
          cost: rule[destination],
        };
        setOrders([order, ...orders]);
      } else {
        alert(
          "No active rule found for this weight! Default rule will be added."
        );
        setOrders([
          {
            value: value,
            destination,
            cost: defaultCost,
          },
          ...orders,
        ]);
      }
    } else {
      alert("set parcel value");
    }
  };
  return (
    <div className="container mx-auto">
      <h2 className="border-y-black mb-5 py-3 text-center text-3xl bg-gray-200">
        Determine Parcel price
      </h2>
      <div className="grid grid-cols-1 gap-4 py-5">
        <div className="">
          <h2 className="text-center text-2xl bg-green-200 py-2">Rules</h2>
          <table className="w-full border">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Weight
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Inside Dhaka
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Outside Dhaka
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {rules &&
                rules.map((rule, index) => (
                  <tr className="border" key={index}>
                    <td className="p-3 text-sm text-gray-700">
                      Min {rule.min}kg to Max {rule.max}kg
                    </td>
                    <td className="p-3 text-sm text-gray-700">
                      {rule.inside} BDT
                    </td>
                    <td className="p-3 text-sm text-gray-700">
                      {rule.outside} BDT
                    </td>
                    <td className="p-3 text-sm text-gray-700">
                      {rule.status? <span className="bg-green-600 text-white p-2 rounded">Active</span> : <span className="bg-red-600 text-white p-2 rounded">Inactive</span>}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

      </div>
      <div className="grid grid-cols-2 gap-4 py-5">
        <div className="">
          <h2 className="text-center text-2xl bg-green-200 py-2">Add Order</h2>
          <div className="grid grid-cols-3 mt-2 gap-2">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="number"
              min={1}
              max={15}
              placeholder=" weight"
              className="rounded border p-2"
            />

            <select
              onChange={(e) => setDestination(e.target.value)}
              className="rounded border p-2 "
            >
              <option value="inside">Inside</option>
              <option value="outside">Outside</option>
            </select>
            <button
              onClick={() => addOrderHandler()}
              className="rounded border p-2 "
            >
              Add
            </button>
          </div>
        </div>
        <div className="bg-red-200">
          <div className="">
            <h2 className="text-center text-2xl bg-green-200 py-2">Orders</h2>
            <table className="w-full border">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Weight
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Destination
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Parcel Cost
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders.map((order, index) => (
                    <tr className="border" key={index}>
                      <td className="p-3 text-sm text-gray-700">
                        {order.value}kg
                      </td>
                      <td className="p-3 text-sm text-gray-700">
                        {order.destination} Dhaka
                      </td>
                      <td className="p-3 text-sm text-gray-700">
                        {order.cost} BDT
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
