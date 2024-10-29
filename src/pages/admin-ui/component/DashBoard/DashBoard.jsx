import React from 'react';
import './Dashboard.css';
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { IoCartOutline } from 'react-icons/io5';
import { FaRegUser, FaTrophy } from 'react-icons/fa';
import { CartesianGrid, Line, LineChart, BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from 'recharts';

// Dữ liệu giả cho biểu đồ doanh thu theo từng tháng
const listRevenue = [
  { month: 'Jan', revenue: 200000000 },
  { month: 'Feb', revenue: 250000000 },
  { month: 'Mar', revenue: 300000000 },
  { month: 'Apr', revenue: 150000000 },
  { month: 'May', revenue: 220000000 },
  { month: 'Jun', revenue: 280000000 },
  { month: 'Jul', revenue: 310000000 },
  { month: 'Aug', revenue: 400000000 },
  { month: 'Sep', revenue: 350000000 },
  { month: 'Oct', revenue: 290000000 },
  { month: 'Nov', revenue: 330000000 },
  { month: 'Dec', revenue: 370000000 }
];

// Dữ liệu giả cho biểu đồ cột hiển thị số lượng giải đấu được tạo theo từng tháng
const tournamentsCreated = [
  { month: 'Jan', tournaments: 10 },
  { month: 'Feb', tournaments: 15 },
  { month: 'Mar', tournaments: 20 },
  { month: 'Apr', tournaments: 8 },
  { month: 'May', tournaments: 12 },
  { month: 'Jun', tournaments: 18 },
  { month: 'Jul', tournaments: 22 },
  { month: 'Aug', tournaments: 25 },
  { month: 'Sep', tournaments: 17 },
  { month: 'Oct', tournaments: 19 },
  { month: 'Nov', tournaments: 21 },
  { month: 'Dec', tournaments: 23 }
];

// Hàm định dạng doanh thu cho trục Y
const formatYAxis = (tickItem) => {
  return `${tickItem / 1000000}M`;
};

// Hàm định dạng giá trị hiển thị trong Tooltip
const formatCurrency = (value) => {
  return `${value.toLocaleString()} đ`;
};

const Dashboard = () => {
  return (
    <div className="dashboard_full_page_container">
      <div className="dashboard_full_page_title">
        Thống kê
      </div>
      <div className="dashboard_statistics_cards_container">
        <div className="dashboard_statistics_card">
          <div className="dashboard_statistics_card_icon yellow_background">
            <RiMoneyDollarCircleLine className="fas fa-shopping-bag" />
          </div>
          <div>
            <h2>Doanh thu</h2>
            <p>2.000.000.000đ</p>
          </div>
        </div>

        <div className="dashboard_statistics_card">
          <div className="dashboard_statistics_card_icon green_background">
            <IoCartOutline className="fas fa-truck" />
          </div>
          <div>
            <h2>Đơn hàng</h2>
            <p>40</p>
          </div>
        </div>

        <div className="dashboard_statistics_card">
          <div className="dashboard_statistics_card_icon purple_background">
            <FaRegUser className="fas fa-users" />
          </div>
          <div>
            <h2>Người dùng</h2>
            <p>200</p>
          </div>
        </div>

        <div className="dashboard_statistics_card">
          <div className="dashboard_statistics_card_icon violet_background">
            <FaTrophy className="fas fa-comments" />
          </div>
          <div>
            <h2>Giải đấu</h2>
            <p>5</p>
          </div>
        </div>
      </div>

      <div className="dashboard_main_content_section">
        <div className="dashboard_activities_section">
          <h3>Doanh thu theo từng tháng</h3>
          <div className="activities_chart_container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={listRevenue} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={formatYAxis} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dashboard_reports_section">
          <h3>Số lượng giải đấu được tạo theo từng tháng</h3>
          <div className="reports_chart_container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={tournamentsCreated} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="tournaments" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="dashboard_bottom_section">
        <div className="dashboard_task_overview_card">
          <h3>Your tasks</h3>
          <p>Calculated in last 7 days</p>
          <div className="task_chart_container">
            <div className="task_progress_chart green_progress">55%</div>
            <div className="task_progress_chart yellow_progress">45%</div>
          </div>
        </div>

        <div className="dashboard_project_overview_card">
          <h3>Your projects</h3>
          <p>Calculated in last 30 days</p>
          <div className="project_chart_container">
            {/* Biểu đồ dự án ở đây */}
          </div>
        </div>

        <div className="dashboard_sales_overview_card">
          <h3>Your Sales</h3>
          <p>A general overview of your sales</p>
          <div className="sales_chart_container">
            {/* Biểu đồ doanh số ở đây */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
