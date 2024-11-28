import React from "react";
import { Chart } from "react-google-charts";

const data = [
  ["Task", "Hours per Day"],
  ["Present", 70],
  ["Absent", 5],
];

// Optional
const options = {
  title: "Today Attendance",
  colors: ["#91ED91", "#EE6565"],
  legend: {
    position: "bottom",
    alignment: "center",
    textStyle: {
      color: "#233238",
      fontSize: 14,
    },
  },
  is3D: true,
  titleTextStyle: {
    fontSize: 24, // Increase font size
    bold: true, // Optional: Make title bold
    color: "#233238", // Optional: Change title color
  },
};

function PieChartAdmin() {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        style={{ height: "100%", width: "100%" }} // Set chart's height and width
      />
    </div>
  );
}

export default PieChartAdmin;
