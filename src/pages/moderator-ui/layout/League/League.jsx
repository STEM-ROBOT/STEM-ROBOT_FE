import { useState } from "react";
import Header from "../../../system-ui/component/Header/Header";
import Footer from "../../../system-ui/component/Footer/Footer";
import "./League.css";
import { IoAppsSharp, IoGrid, IoListSharp, IoSearch } from "react-icons/io5";
import LeagueView from "../../component/LeagueView/LeagueView";
import SearchFilter from "../../component/SearchFilter/SearchFilter";
import { useNavigate } from "react-router-dom";
const leagueData = [
  {
    id: "t1001",
    name: "ROBOCON THPT VIP PRO - 2024",
    location:
      "Khu công nghiệp Quốc tế Protrade, Đường tỉnh 744, An Tây, Bến Cát, Bình Dương, Việt Nam",
    teams: 14,
    views: 191,
    matchesPlayed: 2,
    totalMatches: 4,
    endDate: "2024-10-13T23:59:59",
    images: [
      "https://istema.vn/wp-content/uploads/2023/03/p.png",
      "https://th.bing.com/th/id/OIP.7HSEMd30tk4S_tCOunvBXAHaEK?w=331&h=186&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      "https://istema.vn/wp-content/uploads/2023/03/s.png",
    ],
  },
  {
    id: "t1002",
    name: "ROBOCON THPT  - 202VIP PRO4",
    location:
      "Khu công nghiệp Quốc tế Protrade, Đường tỉnh 744, An Tây, Bến Cát, Bình Dương, Việt Nam",
    teams: 9,
    views: 192,
    matchesPlayed: 0,
    totalMatches: 3,
    endDate: "2024-10-13T23:59:59",
    images: [
      "https://istema.vn/wp-content/uploads/2023/03/p.png",
      "https://th.bing.com/th/id/OIP.7HSEMd30tk4S_tCOunvBXAHaEK?w=331&h=186&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      "https://istema.vn/wp-content/uploads/2023/03/s.png",
    ],
  },
  // Add more data here
];
const League = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("grid");
  return (
    <div className="league_page">
      <Header />
      <div className="league_container">
        {/* Search and Filter section */}
        <SearchFilter />
        <div className="view_toggle">
          <div className="btn_option">
            <button
              onClick={() => setViewMode("list")}
              className={
                viewMode === "list" ? "option_view active" : "option_view"
              }
            >
              <IoListSharp className="icon_option_view" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={
                viewMode === "grid" ? "option_view active" : "option_view"
              }
            >
              <IoGrid className="icon_option_view" />
            </button>
          </div>
        </div>
        {/* View League - List View */}
        <div className={`league_grid ${viewMode}`}>
          {leagueData.map((leagues, i) => (
            <LeagueView viewMode={viewMode} league={leagues} />
          ))}

         
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default League;
