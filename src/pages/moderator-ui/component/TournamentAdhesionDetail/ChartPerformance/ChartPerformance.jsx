import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const ChartPerformance = () => {
  const series = [50]; // Giá trị hiệu suất (%)

  const options = {
    // chart: {
    //   type: "radialBar",
    // },
    plotOptions: {
      radialBar: {
        startAngle: -120,
        endAngle: 120,
        hollow: {
          margin: 10,
          size: "50%",
        },
        track: {
          background: "#e7e7e7",
          strokeWidth: "100%",
        },
        dataLabels: {
          show: true,
          name: {
            show: true,
            fontSize: "16px",
            color: "#333",
            offsetY: 60,
            text: "Hiệu suất",
          },
          value: {
            show: true,
            fontSize: "20px",
            fontWeight: 600,
            color: "#000",
            formatter: (val) => `${val}%`,
          },
        },
        colors: {
          function({ value }) {
            if (value < 40) return "#f94144"; // Red
            if (value >= 40 && value < 70) return "#f9c74f"; // Yellow
            return "#43aa8b"; // Green
          },
        },
      },
    },
    labels: ["Hiệu suất"],
  };

  const matchTime = [1, 2, 3, 4, 5, 6, 7, 8]; // Thời gian ghi điểm (phút)
  const positivePoints = [1, 0, 3, 1, 0, 10, 1, 2]; // Điểm cộng
  const negativePoints = [0, -1, 0, 0, -1, 0, -4, 0]; // Điểm trừ

  // Tính hiệu suất thi đấu
  // const performance = positivePoints.map(
  //   (value, index) => value + (negativePoints[index] || 0)
  // );

  const [state, setState] = useState({
    series: [
      {
        name: "Điểm cộng",
        data: positivePoints,
      },
      {
        name: "Điểm trừ",
        data: negativePoints,
      },
      // {
      //   name: "Hiệu suất",
      //   data: performance,
      // },
    ],
    options: {
      chart: {
        // type: "area",
        stacked: false,
        //    height: 350,

        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 4,
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.45,
          opacityTo: 0.05,
          stops: [20, 100, 100, 100],
        },
      },
      yaxis: {
        min: Math.min(...negativePoints, 0) - 1, // Hiển thị dư ra 2 giá trị phía dưới
        max: Math.max(...positivePoints) + 1, // Hiển thị dư ra 2 giá trị phía trên
        title: {
          text: "Điểm",
        },
      },
      xaxis: {
        rotate: 0,
        categories: matchTime, // Sử dụng thời gian ghi điểm
        title: {
          text: "Thời gian (phút)",
        },
      },
      title: {
        text: "Biểu đồ thống kê",
        align: "left",
        offsetX: 14,
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        offsetX: -10,
      },
    },
  });

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
      }}
    >
      <div
        style={{
          width: "60%",
          height: "fit-content",
          backgroundColor: "#fff",
          borderRadius: "7px",
        }}
      >
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="area"
          height={380}
        />
      </div>
      <div
        style={{
          width: "300px",
          height: "300px",
          backgroundColor: "#fff",
          borderRadius: "7px",
        }}
      >
        <ReactApexChart
          options={options} // Fallback nếu options chưa sẵn sàng
          series={series} // Fallback giá trị series
          type="radialBar"
          height={350}
        />
      </div>
      <div
        style={{
          width: "300px",
          height: "300px",
          backgroundColor: "#fff",
          borderRadius: "7px",
        }}
      >
        <Gauge data={data} options={options} />
      </div>
    </div>
  );
};

export default ChartPerformance;
