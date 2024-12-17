import { useEffect, useState } from "react";
import Header from "../../../system-ui/component/Header/Header";
import Footer from "../../../system-ui/component/Footer/Footer";
import "./League.css";
import { IoGrid, IoListSharp } from "react-icons/io5";
import LeagueView from "../../component/LeagueView/LeagueView";
import SearchFilter from "../../component/SearchFilter/SearchFilter";
import { Route, useNavigate } from "react-router-dom";
import api from "../../../../config";
import { list_tournament_view } from "../../api/ApiFlowView/ApiFlowView";
import Pagination from "../../../system-ui/component/Pagination/Pagination";
import LoadingComponent from "../../../system-ui/component/Loading/LoadingComponent";

const League = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("grid");
  const [leagueData, setLeagueData] = useState([]);
  const [loadApi, setLoadApi] = useState(true);
  const [search, setSearch] = useState("");
  const [provinceCode, setProvinceCode] = useState("");
  const [status, setStatus] = useState("");
  const [gennerId, setGennerId] = useState("");
  const [level, setLevel] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1); // Đổi tên thành page để đồng nhất với Pagination

  useEffect(() => {
    const leagueApi = () => {
      const params = new URLSearchParams(); // Tạo đối tượng params để lọc linh hoạt

      if (search) params.append("name", search);
      if (provinceCode) params.append("provinceCode", provinceCode);
      if (level) params.append("level", level);
      if (status) params.append("status", status);
      if (gennerId) params.append("GenerId", gennerId);
      params.append("page", page);
      params.append("pageSize", pageSize);

      const url = `${list_tournament_view}${params.toString()}`; // Kết hợp base url và params

      api
        .get(url)
        .then((tournament) => {
          console.log(tournament.data.data);
          setLeagueData(tournament.data.data);
          setLoadApi(false);
        })
        .catch((error) => {
          setLoadApi(false);
          console.log("Error fetching data:", error);
        });
    };

    if (loadApi) {
      leagueApi();
    }
  }, [loadApi, page, pageSize, search, provinceCode, level, status, gennerId]); // Đảm bảo load lại khi page hoặc pageSize thay đổi

  useEffect(() => {
    const updatePageSize = () => {
      if (window.innerWidth > 1583) {
        setPageSize(8);
        setLoadApi(true);
      } else {
        setPageSize(6);
        setLoadApi(true);
      }
    };

    // Gọi ban đầu để set pageSize
    updatePageSize();

    // Thêm event listener để xử lý khi cửa sổ thay đổi kích thước
    window.addEventListener("resize", updatePageSize);

    // Cleanup event listener khi unmount
    return () => window.removeEventListener("resize", updatePageSize);
  }, []);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setLoadApi(true);
  };

  return (
    <div className="league_container">
      <SearchFilter
        setSearch={setSearch}
        setProvinceCode={setProvinceCode}
        setStatus={setStatus}
        setGennerId={setGennerId}
        setLoadApi={setLoadApi}
        setLevel={setLevel}
      />
      {loadApi ? (
        <LoadingComponent position={"fixed"} />
      ) : (
        <>
          <div className="view_toggle">
            <Pagination
              currentPage={page}
              totalPages={leagueData.totalPages}
              onPageChange={handlePageChange}
            />
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
            {leagueData.tournamentRep?.map((leagues, i) => (
              <LeagueView key={i} viewMode={viewMode} league={leagues} />
            ))}
          </div>
        </>
      )}
      {/* Search and Filter section */}
    </div>
  );
};

export default League;
