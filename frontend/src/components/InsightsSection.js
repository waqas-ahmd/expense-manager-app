import React from "react";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";

const last30days = (date) => {
  const dateNow = new Date();
  const dateTest = new Date(date);
  var d_time = dateNow.getTime() - dateTest.getTime();
  var d_days = d_time / (1000 * 3600 * 24);
  return d_days <= 30 ? true : false;
};

const InsightsSection = () => {
  const { expenses } = useSelector((state) => state.expenses);
  const expenses30days = expenses.filter((e) => last30days(e.date));
  const categories = Array.from(new Set(expenses.map((e) => e.categoryName)));
  var data = {};
  categories.forEach((c) => {
    data[c] = 0;
  });

  expenses30days.forEach((e) => {
    data[e.categoryName] += e.value;
  });

  const totalExpenses = expenses30days.reduce((a, b) => a + b.value, 0);

  const chartData = {
    labels: categories,
    datasets: [
      {
        label: "Expenses in Last 30 Days",
        data: categories.map((c) => data[c]),
        backgroundColor: [
          "#F51720",
          "#FA26A0",
          "#F8D210",
          "#FF8300",
          "#A16AE8",
          "#3CACAE",
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="TabBox">
      <div style={{ maxWidth: 400, width: "100%", margin: "auto" }}>
        <Pie
          data={chartData}
          options={{
            plugins: {
              legend: {
                position: "bottom",
              },
              title: {
                display: true,
                text: "Last 30 Days Expenses",
              },
              subtitle: {
                display: true,
                text: `Total Expenses: Rs.${totalExpenses}`,
                position: "bottom",
              },
              tooltip: {
                callbacks: {
                  label: (i) => `${i.label} : Rs.${i.parsed}`,
                  footer: (i) =>
                    `${((i[0].parsed / totalExpenses) * 100).toFixed(1)} %`,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default InsightsSection;
