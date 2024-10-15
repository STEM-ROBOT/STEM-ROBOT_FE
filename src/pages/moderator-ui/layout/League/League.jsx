import { useState } from "react";
import Header from "../../../system-ui/component/Header/Header";
import Footer from "../../../system-ui/component/Footer/Footer";
import "./League.css";
import { IoAppsSharp, IoGrid, IoListSharp, IoSearch } from "react-icons/io5";
import LeagueView from "../../component/LeagueView/LeagueView";
import SearchFilter from "../../component/SearchFilter/SearchFilter";
import { useNavigate } from "react-router-dom";

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
          <LeagueView viewMode={viewMode} />
          <LeagueView viewMode={viewMode} />
          <LeagueView viewMode={viewMode} />
          <LeagueView viewMode={viewMode} />
          <LeagueView viewMode={viewMode} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default League;
