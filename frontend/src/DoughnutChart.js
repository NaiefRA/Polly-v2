// DoughnutChart.js
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ options }) => {
  // Prepare labels and votes
  const labels = options.map((opt) => opt.optionValue);
  const dataValues = options.map((opt) => opt.optionVotes);

  // Optional: Assign random colors for fun
  const backgroundColors = labels.map(
    () => `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`
  );

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Votes",
        data: dataValues,
        backgroundColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return <Doughnut data={data} options={chartOptions} />;
};

export default DoughnutChart;
