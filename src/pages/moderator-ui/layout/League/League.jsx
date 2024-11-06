import { useEffect, useState } from "react";
import Header from "../../../system-ui/component/Header/Header";
import Footer from "../../../system-ui/component/Footer/Footer";
import "./League.css";
import { IoAppsSharp, IoGrid, IoListSharp, IoSearch } from "react-icons/io5";
import LeagueView from "../../component/LeagueView/LeagueView";
import SearchFilter from "../../component/SearchFilter/SearchFilter";
import { useNavigate } from "react-router-dom";
import api from "../../../../config";

const League = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("grid");
    const [leagueData, setLeagueData] = useState([]);
    useEffect(() => {
      api
        .get("/api/tournaments/list-tournament")
        .then((tournament) => {
          console.log(tournament);
          setLeagueData(tournament.data.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(leagueData);
    }, []);
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
          {leagueData?.map((leagues, i) => (
            <LeagueView key={i} viewMode={viewMode} league={leagues} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default League;
