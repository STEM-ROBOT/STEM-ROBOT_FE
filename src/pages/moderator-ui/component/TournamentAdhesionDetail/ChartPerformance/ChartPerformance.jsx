import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ReactApexChart from "react-apexcharts";

const ChartPerformance = () => {
  const series = [50]; // Giá trị hiệu suất (%)

  const radialBarOptions = {
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
            style: {
              fontFamily: "Arial, sans-serif", // Đổi phông chữ
            },
          },
          value: {
            show: true,
            fontSize: "20px",
            fontWeight: 600,
            color: "#000",
            formatter: (val) => `${val}%`,
            style: {
              fontFamily: "Arial, sans-serif", // Đổi phông chữ
            },
          },
        },
        colors: ["#43aa8b"],
      },
    },
    labels: ["Hiệu suất"],
  };

  const matchTime = [
    1, 2, 3, 4, 5, 6, 7, 8, 9,
    "10:30", 11, 12, 13, 14, 15,
    
    
  ]
  
  const positivePoints = [1, 0, 3, 1, 0, 10, 1, 2, 5, 3, 4, 0, 2, 6, 8]; // Thêm điểm cộng
  const negativePoints = [0, -1, 0, 0, -1, 0, -4, 0, -2, -3, -1, 0, -2, 0, -5]; // Thêm điểm trừ

  // Dữ liệu cho Recharts
  const chartData = matchTime.map((time, index) => ({
    time,
    positive: positivePoints[index],
    negative: negativePoints[index],
  }));

  return (
    <div
      style={{
        // display: "flex",
        marginLeft:'20px',
        width:'80%',
        height:"87vh",
        justifyContent: "space-around",
        alignItems: "center",
        gap: "20px",
        padding: "20px",
        backgroundColor: "#f4f4f4",
        borderRadius: "10px",
      }}
    >
      {/* Biểu đồ LineChart (Recharts) */}
      <div
        style={{
          width: "100%",
          height: "400px",
          marginBottom:'20px',
          backgroundColor: "#fff",
          borderRadius: "7px",
          padding: "10px",
          boxSizing: "border-box",
          overflow: "hidden",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              label={{
                value: "Thời gian (phút)",
                position: "insideBottom",
                offset: -5,
              }}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              label={{
                value: "Điểm",
                angle: -90,
                position: "insideLeft",
              }}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              formatter={(value, name, props) => [
                value,
                `${name}`,
              ]}
              labelFormatter={(label) => `Phút thứ ${label}`}
            />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="positive"
              stroke="#82ca9d"
              name="Điểm cộng"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="negative"
              stroke="#ff6347"
              name="Điểm trừ"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Biểu đồ hiệu suất (ApexCharts) */}
      <div
        style={{
          width: "220px",
          height: "220px",
          backgroundColor: "#fff",
          borderRadius: "7px",
          padding: "10px",
          boxSizing: "border-box",
          overflow: "hidden",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <ReactApexChart
          options={radialBarOptions}
          series={series}
          type="radialBar"
          height={300}
        />
      </div>
    </div>
  );
};

export default ChartPerformance;
