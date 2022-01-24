import React, { useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { registerables, Chart } from "chart.js";

import { responsedata } from "./res";
// const axios = require("axios");

const apidata = [];
const apilabel = [];
responsedata.map((data) => {
  apidata.push(data.open);
  let temp = data.date.split(" ")[1].split(":");
  apilabel.push(temp[0] + ":" + temp[1]);
});
// console.log(apilabel);
// axios
//   .get(
//     "https://financialmodelingprep.com/api/v3/historical-chart/5min/AAPL?apikey=fee509bb78599de2c519a4792002d1e7"
//   )
//   .then((res) => {
//     call = res.data[0].open;
//     console.log(call);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const data = {
  labels: apilabel,
  datasets: [
    {
      label: "price",
      data: apidata,
      borderColor: "#8862e0",
      backgroundColor: "rgba(102, 78, 235, 0.2)",
      borderWidth: 2,
      fill: true,
    },
  ],
};
const options = {
  // hoverBackgroundColor: "yellow",
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    yAxes: {
      display: false,
    },

    xAxes: {
      display: false,
    },
  },
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
    line: {
      tension: 0,
    },
  },
  stepsize: 500,
};
const LineChart = () => {
  Chart.register(...registerables);
  return (
    <div>
      <div className="row">
        <div className="col-md-12 ">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Line Chart</h4>
              <Line data={data} options={options} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineChart;
