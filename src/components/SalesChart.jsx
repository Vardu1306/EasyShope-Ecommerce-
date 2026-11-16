
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SalesChart = ({ orders = [] }) => {
  const monthlySales = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ].map((month, index) => {
    const total = orders.reduce((sum, order) => {
      const date = new Date(
        order.createdAt || order.orderDate || order.date
      );

      if (
        !Number.isNaN(date.getTime()) &&
        date.getMonth() === index &&
        date.getFullYear() === new Date().getFullYear()
      ) {
        return sum + Number(order.totalAmount || 0);
      }

      return sum;
    }, 0);

    return {
      month,
      sales: total,
    };
  });

  return (
    <div className="sales-chart-container">
      <h2>Sales Analytics</h2>
      <p>Monthly sales overview</p>

      <div className="sales-chart">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={monthlySales}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              formatter={(value) => [
                `₹${Number(value).toFixed(2)}`,
                "Sales",
              ]}
            />
            <Bar
              dataKey="sales"
              fill="#7c3aed"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;
