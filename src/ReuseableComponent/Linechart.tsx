import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { dashboardLineChartApi } from "../store/Services";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const [apiResponse, setApiResponse]: any = useState([]);

  useEffect(() => {
    dashboardLineChartApi()
      .then((res: any) => {
        setApiResponse(res);
      })
      .catch((err: any) => console.log("err", err));
  }, []);

  const data = {
    labels: apiResponse?.labels, // X-axis labels
    datasets: [
      {
        label: "Total Present",
        data: apiResponse?.data, // Data points
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        
        tension: 0.4, // Line smoothness
   
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Position of the legend
      },
      title: {
        display: true,
        text: "Monthly Attendance Comparision Chart", // Title of the chart
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Y-axis starts at 0
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
