import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const RatingsChart = ({ data }) => {
  const chartData = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: 'Rating',
        data: data.map((d) => d.rating),
        fill: false,
        borderColor: '#36E0FF',
        backgroundColor: '#36E0FF',
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // ✅ hides "Rating" label on top
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const index = context.dataIndex;
            const contestName = data[index].contest || 'Contest';
            return `${contestName}: ${context.parsed.y} rating`;
          },
        },
      },
    },
    scales: {
      x: {
        display: false, // ✅ hides x-axis dates & title
        grid: {
          display: false, // optional: remove vertical grid lines
        },
      },
      y: {
        title: {
          display: false, // ✅ hides y-axis title
        },
        ticks: {
          // ✅ keeps ratings visible
          precision: 0,
          font: {
            size: 14,
          },
          color: "#9B9CA1",
        },
        grid: {
          display: false,
        },
      },
    },

  };

  return <Line data={chartData} options={options} />;
};

export default RatingsChart;
