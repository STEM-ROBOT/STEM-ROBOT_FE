import React, { useEffect, useState } from "react";
import "./RoleAssignment.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getListRefereeFreeTime } from "../../../../redux/actions/RefereeAction";
import api from "../../../../config";
import { toast } from "react-toastify";

const RoleAssignment = () => {
  const { tournamentId, competitionId } = useParams();

  const dispatch = useDispatch();

  const [chiefReferees, setChiefReferees] = useState(1);
  const [referees, setReferees] = useState(2);
  const [simultaneousReferees, setSimultaneousReferees] = useState(3);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedReferee, setSelectedReferee] = useState([]);

  const getRefereesFreeTimes = useSelector((state) => state.getFreetimeReferee);
  const refereeList = Array.isArray(
    getRefereesFreeTimes?.listRefereefreetime?.data
  )
    ? getRefereesFreeTimes.listRefereefreetime.data
    : [];

  const [updatedRefereeList, setUpdatedRefereeList] = useState([]);
  useEffect(() => {
    dispatch(getListRefereeFreeTime(tournamentId, competitionId));
  }, [dispatch, tournamentId]);
  const isCheck = refereeList[0]?.isReferee;
  
  useEffect(() => {
    // Only set `updatedRefereeList` if it is different from `refereeList`
    if (JSON.stringify(updatedRefereeList) !== JSON.stringify(refereeList)) {
      setUpdatedRefereeList(
        refereeList?.map((referee) => ({
          ...referee,
          role: referee.role || "SRF",
          selected: false,
        }))
      );
    }
  }, [refereeList]);

  const handleRoleChange = (id, newRole) => {
    setUpdatedRefereeList((prevList) =>
      prevList.map((referee) =>
        referee.id === id ? { ...referee, role: newRole } : referee
      )
    );
  };
console.log(updatedRefereeList);

  const handleConfirm = () => {
    const requiredChiefReferees = chiefReferees * simultaneousReferees;
    const requiredRegularReferees = referees * simultaneousReferees;

    const selectedChiefReferees = updatedRefereeList.filter(
      (referee) => referee.selected && referee.role === "MRF"
    ).length;
    const selectedRegularReferees = updatedRefereeList.filter(
      (referee) => referee.selected && referee.role === "SRF"
    ).length;

    const chiefRefereesRemaining =
      requiredChiefReferees - selectedChiefReferees;
    const regularRefereesRemaining =
      requiredRegularReferees - selectedRegularReferees;

    if (chiefRefereesRemaining <= 0 && regularRefereesRemaining <= 0) {
      saveRefereesToDB();
    } else {
      alert(
        `Invalid selection!\n- Trọng tài chính: cần ${requiredChiefReferees}, đã chọn ${selectedChiefReferees}, còn thiếu ${
          chiefRefereesRemaining > 0 ? chiefRefereesRemaining : 0
        }\n` +
          `- Trọng tài viên: cần ${requiredRegularReferees}, đã chọn ${selectedRegularReferees}, còn thiếu ${
            regularRefereesRemaining > 0 ? regularRefereesRemaining : 0
          }`
      );
    }
  };

  const saveRefereesToDB = () => {
    const selectedReferees = updatedRefereeList
      .filter((referee) => referee.selected)
      .map((referee) => ({
        refereeId: referee.id,
        role: referee.role || "SRF",
      }));

    api
      .post(
        `/api/referees/${competitionId}/assign-referees?numberTeamReferee=${simultaneousReferees}&numberSubReferee=${referees}`,
        selectedReferees,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        toast.success("Trọng tài đã được cập nhật vào cuộc thi thành công");
      })
      .catch((error) => {
        toast.error("Có lỗi xảy ra khi cập nhật trọng tài vào đội");
        console.error("Error updating team members:", error.message);
      });
    console.log(competitionId, selectedReferees);
    dispatch();
  };

  const toggleSelection = (referee) => {
    setUpdatedRefereeList((prevReferees) => {
      const updatedReferees = prevReferees.map((ref) => {
        // Chuyển đổi trạng thái chọn của referee được bấm
        if (ref.id === referee.id) {
          return { ...ref, selected: !ref.selected };
        }
        return ref;
      });

      // Lọc ra các referee đã được chọn
      const selectedRefs = updatedReferees.filter((ref) => ref.selected);

      // Cập nhật mảng `selectedReferee` với các trọng tài đã được chọn
      setSelectedReferee(selectedRefs);

      // Cập nhật trạng thái `selectAll`
      setSelectAll(selectedRefs.length === updatedReferees.length);
      console.log(selectedRefs);

      return updatedReferees;
    });
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    // Tạo bản sao của danh sách referee đã cập nhật
    const updatedList = updatedRefereeList.map((referee) => ({
      ...referee,
      selected: newSelectAll,
    }));

    // Cập nhật `selectedReferee` với tất cả các đối tượng referee đã chọn hoặc mảng trống nếu bỏ chọn tất cả
    setUpdatedRefereeList(updatedList);
    setSelectedReferee(newSelectAll ? updatedList : []);

    console.log(newSelectAll ? updatedList : []);
  };


  return (
    <div className="role-assignment-container">
      <div className="role-assignment-header">
        <h2>Quản lí trọng tài</h2>
        <div className="header-buttons">
          {/* <button className="import-button">Import</button> */}
          {isCheck !== true && (
            <button className="create-button" onClick={handleConfirm}>
              Lưu
            </button>
          )}
        </div>
      </div>

      <div className="role-assignment-inputs">
        <div className="input-group">
          <label>Số trọng tài chính:</label>
          <input type="number" value={chiefReferees} disabled />
        </div>
        <div className="input-group">
          <label>Số trọng tài viên:</label>
          <input
            type="number"
            value={referees}
            onChange={(e) => setReferees(Number(e.target.value))}
          />
        </div>
        <div className="input-group">
          <label>Số đội ngũ trọng tài :</label>
          <input
            type="number"
            value={simultaneousReferees}
            onChange={(e) => setSimultaneousReferees(Number(e.target.value))}
          />
        </div>
      </div>

      <table className="role-assignment-table">
        <thead>
          <tr>
            {isCheck !== true && (
              <th>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
            )}
            <th>Ảnh</th>
            <th>Email</th>
            <th>Tên</th>
            <th>Vai trò</th>
          </tr>
        </thead>
        <tbody>
          {updatedRefereeList.map((referee) => (
            <tr key={referee.id}>
              {isCheck !== true && (
                <td>
                  <input
                    type="checkbox"
                    checked={referee.selected}
                    onChange={() => toggleSelection(referee)}
                  />
                </td>
              )}

              <td>
                <img
                  src={referee.image}
                  alt={referee.name}
                  className="referee-image"
                />
              </td>
              <td>{referee.email}</td>
              <td>{referee.name}</td>
              <td>
                <select
                  value={referee.role}
                  onChange={(e) => handleRoleChange(referee.id, e.target.value)}
                  className="role-select"
                >
                  <option value="MRF">Trọng tài chính</option>
                  <option value="SRF">Trọng tài viên</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleAssignment;
