import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as Cht,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  Tooltip,
} from "chart.js";

Cht.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  Tooltip
);

const CoinChart = ({ arr = [], curr, days }) => {
  const prices = [];
  const date = [];

  for (let i = 0; i < arr.length; i++) {
    if (days === "24h") {
      date.push(new Date(arr[i][0]).toLocaleTimeString());
    } else {
      date.push(new Date(arr[i][0]).toLocaleDateString());
    }

    prices.push(arr[i][1]);
  }

  const data = {
    labels: date,
    datasets: [
      {
        label: `Price in ${curr}`,
        data: prices,
        borderColor: "green",
      },
    ],
  };

  return (
    <Line
      options={{
        responsive: true,
        color: "green",
      }}
      data={data}
    />
  );
};

export default CoinChart;
