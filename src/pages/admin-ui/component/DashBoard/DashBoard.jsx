import React, { useState, useEffect } from "react";
import "/src/pages/admin-ui/component/DashBoard/DashBoard.css";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { IoCartOutline } from "react-icons/io5";
import { FaRegUser, FaTrophy } from "react-icons/fa";
import {
  CartesianGrid,
  Line,
  LineChart,
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import api from "../../../../config";

// Y-axis format function
const formatYAxis = (tickItem) => `${tickItem / 1000000}M`;

// Tooltip currency format function
const formatCurrency = (value) => `${value.toLocaleString()} đ`;

const Dashboard = () => {
  const [revenueData, setRevenueData] = useState(0);
  const [tournamentsData, setTournamentsData] = useState([]);
  const [transactionsData, setTransactionsData] = useState([]);
  const [accountsData, setAccountsData] = useState([]);
  const [revenueByTimeData, setRevenueByTimeData] = useState([]);
  const [tournamentCreatedData, setTournamentCreatedData] = useState([]);
  useEffect(() => {
    api
      .get("api/orders/total-revenue")
      .then((response) => {
        setRevenueData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    api
      .get("api/orders")
      .then((response) => {
        setTransactionsData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    api
      .get("api/accounts")
      .then((response) => {
        setAccountsData(response.data.success.data);
      })
      .catch((error) => {
        console.log(error);
      });

    api
      .get("api/tournaments/list-tournament")
      .then((response) => {
        if (response.data.data.data) {
          setTournamentsData(response.data.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    api
      .get("api/orders/revenue-by-time")
      .then((response) => {
        // Ensure that response.data.data is defined before mapping
        if (response.data) {
         console.log(response.data)
          const monthlyRevenue = response.data.map((item) => ({
            month: new Date(item.year, item.month - 1).toLocaleString(
              "default",
              {
                month: "short",
              }
            ),
            revenue: item.revenue,
          }));
          setRevenueByTimeData(response.data);
        } else {
          console.error(
            "Expected data format is missing in response",
            response.data
          );
        }
      })
      .catch((error) => {
        console.log("Error fetching monthly revenue:", error);
      });

      api
      .get("api/tournaments/per-month")
      .then((response) => {
        console.log(response.data.data.data);
        if (response) {
          // Nếu dữ liệu trả về đúng định dạng
          const tournamentData = response.data.data.data.map((item) => ({
            month: new Date(2024, item.month - 1).toLocaleString("default", {
              month: "short",
            }),
            tournaments: item.count,
          }));
          setTournamentCreatedData(tournamentData);
        } else {
          console.error("Expected data format is missing in response", response.data);
        }
      })
      .catch((error) => {
        console.log("Error fetching tournament data:", error);
      });
  }, []);

  return (
    <div className="dashboard_full_page_container">
      <div className="dashboard_full_page_title">Thống kê</div>
      <div className="dashboard_statistics_cards_container">
        <div className="dashboard_statistics_card">
          <div className="dashboard_statistics_card_icon yellow_background">
            <RiMoneyDollarCircleLine className="fas fa-shopping-bag" />
          </div>
          <div>
            <h2>Doanh thu</h2>
            <div>{revenueData}đ</div>
          </div>
        </div>

        <div className="dashboard_statistics_card">
          <div className="dashboard_statistics_card_icon green_background">
            <IoCartOutline className="fas fa-truck" />
          </div>
          <div>
            <h2>Đơn hàng</h2>
            <p>{transactionsData?.length}</p>
          </div>
        </div>

        <div className="dashboard_statistics_card">
          <div className="dashboard_statistics_card_icon purple_background">
            <FaRegUser className="fas fa-users" />
          </div>
          <div>
            <h2>Người dùng</h2>
            <p>{accountsData?.length}</p>
          </div>
        </div>

        <div className="dashboard_statistics_card">
          <div className="dashboard_statistics_card_icon violet_background">
            <FaTrophy className="fas fa-comments" />
          </div>
          <div>
            <h2>Giải đấu</h2>
            <p>{tournamentsData?.length}</p>
          </div>
        </div>
      </div>

      <div className="dashboard_main_content_section">
        <div className="dashboard_activities_section">
          <h3>Doanh thu theo từng tháng</h3>
          <div className="activities_chart_container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={revenueByTimeData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={formatYAxis} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dashboard_reports_section">
          <h3>Số lượng giải đấu được tạo theo từng tháng</h3>
          <div className="reports_chart_container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={tournamentCreatedData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
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

      {/* <div className="dashboard_bottom_section">
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
            
          </div>
        </div>

        <div className="dashboard_sales_overview_card">
          <h3>Your Sales</h3>
          <p>A general overview of your sales</p>
          <div className="sales_chart_container">
            
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
