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
import "./ChartPerformance.css";
const ChartPerformance = ({ data, scoreData, formatId }) => {
  const series = [50]; // Giá trị hiệu suất (%)
  console.log(formatId);
  const positiveScores = scoreData?.halfActionTeam?.filter(
    (item) => item.scoreType === "Điểm cộng"
  );
  const negativeScores = scoreData?.halfActionTeam?.filter(
    (item) => item.scoreType === "Điểm trừ"
  );

  // Tính trung bình
  const averagePositive =
    positiveScores?.reduce((sum, item) => sum + item.scorePoint, 0) /
      positiveScores?.length || 0;

  const averageNegative =
    negativeScores?.reduce((sum, item) => sum + item.scorePoint, 0) /
      negativeScores?.length || 0;
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
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
    60,
  ];

  const positivePoints = [1, 0, 3, 1, 0, 10, 1, 2, 5, 3, 4, 0, 2, 6, 8]; // Thêm điểm cộng
  const negativePoints = [0, -1, 0, 0, -1, 0, -4, 0, -2, -3, -1, 0, -2, 0, -5]; // Thêm điểm trừ

  // Dữ liệu cho Recharts
  const chartData = data?.time?.map((time, index) => ({
    time,
    positive: data?.bonus[index],
    negative: data?.minus[index],
  }));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginLeft: "20px",
        width: "80%",
        height: "87vh",
        justifyContent: "space-around",
        alignItems: "center",
        gap: "20px",
        padding: "20px",
        backgroundColor: "rgba(5, 36, 66, 0.61)",
        borderRadius: "10px",
      }}
    >
      {/* Biểu đồ LineChart (Recharts) */}
      <div
        style={{
          width: "100%",
          flex: "1",
          marginBottom: "10px",
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
              formatter={(value, name, props) => [value, `${name}`]}
              labelFormatter={(label) => `Trong Phút Thứ : ${label}`}
            />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="positive"
              stroke="#82ca9d"
              name="Trung Bình Điểm cộng"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="negative"
              stroke="#ff6347"
              name="Trung Bình Điểm trừ"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="view_avg_score">
        {/* Biểu đồ hiệu suất (ApexCharts) */}
        {formatId == 1 &&
          scoreData?.isPlay == true &&
          scoreData?.hintCount != null && (
            <div className="view_avg_score_bonus">
              <div className="view_avg_score_bonus_head">Số Lượt Bóc Thăm</div>
              <div className="view_avg_score_bonus_view">
                {scoreData?.hintCount}
              </div>
            </div>
          )}

        <div className="view_avg_score_bonus">
          <div className="view_avg_score_bonus_head">Trung Bình Điểm Cộng</div>
          <div className="view_avg_score_bonus_view bo">
            {" "}
            {averagePositive.toFixed(2)}
          </div>
        </div>
        <div className="view_avg_score_bonus">
          <div className="view_avg_score_bonus_head">Trung Bình Điểm Trừ</div>
          <div className="view_avg_score_bonus_view mi">
            -{averageNegative.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartPerformance;
