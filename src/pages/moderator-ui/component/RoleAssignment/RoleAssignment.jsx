import React, { useEffect, useState } from "react";
import "./RoleAssignment.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getListRefereeFreeTime } from "../../../../redux/actions/RefereeAction";
import api from "../../../../config";
import { toast } from "react-toastify";
import { getActive } from "../../../../redux/actions/FormatAction";

const RoleAssignment = () => {
  const { tournamentId, competitionId } = useParams();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const getRefereesFreeTimes = useSelector((state) => state.getFreetimeReferee);
  const refereeList = Array.isArray(
    getRefereesFreeTimes?.listRefereefreetime?.data?.listRefereeRsps
  )
    ? getRefereesFreeTimes.listRefereefreetime.data.listRefereeRsps
    : [];
  const numLocations = getRefereesFreeTimes?.listRefereefreetime?.data?.numberLocation || 0;
  const isAssign  = getRefereesFreeTimes?.listRefereefreetime?.data?.isReferee ;
  const [chiefReferees, setChiefReferees] = useState(1);
  const [referees, setReferees] = useState(1);
  const [simultaneousReferees, setSimultaneousReferees] = useState(numLocations);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedReferee, setSelectedReferee] = useState([]); 
  const [updatedRefereeList, setUpdatedRefereeList] = useState([]);

  const isAddSuccess = useSelector((state) => state.addScheduleReferee?.success);

  useEffect(() => {
    dispatch(getListRefereeFreeTime(tournamentId, competitionId));
    dispatch(getActive(competitionId));
  }, [dispatch, tournamentId, competitionId, loading]);

  useEffect(() => {
    // Set simultaneousReferees after numLocations is available
    if (numLocations > 0) {
      setSimultaneousReferees(numLocations );
    }
  }, [numLocations]);

  const isCheck = refereeList[0]?.isReferee;

  // useEffect(() => {
  //   if (simultaneousReferees <= numLocations) {
  //     toast.error(`Số đội ngũ trọng tài phải lớn hơn ${numLocations}.`);
  //   }
  // }, [simultaneousReferees, numLocations]);

  useEffect(() => {
    if (isAssign) {
      setUpdatedRefereeList(refereeList);
      return;
    }

    const requiredChiefReferees = chiefReferees * simultaneousReferees;
    const requiredRegularReferees = referees * simultaneousReferees;

    let chiefRefereesAssigned = 0;
    let regularRefereesAssigned = 0;

    const autoAssignedReferees = refereeList.map((referee) => {
      if (chiefRefereesAssigned < requiredChiefReferees) {
        chiefRefereesAssigned++;
        return { ...referee, role: "MRF", selected: true };
      } else if (regularRefereesAssigned < requiredRegularReferees) {
        regularRefereesAssigned++;
        return { ...referee, role: "SRF", selected: true };
      } else {
        return { ...referee, role: null, selected: false };
      }
    });

    setUpdatedRefereeList(autoAssignedReferees);
  }, [refereeList, chiefReferees, referees, simultaneousReferees, isAssign]);

  const handleRoleChange = (id, newRole) => {
    const updatedList = updatedRefereeList.map((referee) =>
      referee.id === id ? { ...referee, role: newRole } : referee
    );
    setUpdatedRefereeList(updatedList);
  };
  

  const handleConfirm = () => {
    const requiredChiefReferees = chiefReferees * simultaneousReferees;
    const requiredRegularReferees = referees * simultaneousReferees;
  
    const chiefRefereesAssigned = updatedRefereeList.filter(
      (referee) => referee.role === "MRF" && referee.selected
    ).length;
  
    const regularRefereesAssigned = updatedRefereeList.filter(
      (referee) => referee.role === "SRF" && referee.selected
    ).length;
  
    // Kiểm tra số lượng trọng tài chính
    if (chiefRefereesAssigned < requiredChiefReferees) {
      toast.error(
        `Không đủ số trọng tài chính! Yêu cầu ${requiredChiefReferees}, hiện tại chỉ chọn ${chiefRefereesAssigned}.`
      );
      return;
    }

    // Kiểm tra số lượng trọng tài viên
    if (regularRefereesAssigned < requiredRegularReferees) {
        toast.error(
            `Không đủ số trọng tài viên! Yêu cầu ${requiredRegularReferees}, hiện tại chỉ chọn ${regularRefereesAssigned}.`
        );
        return;
    }

    // Nếu số lượng hợp lệ, tiếp tục lưu vào cơ sở dữ liệu
    saveRefereesToDB();
  };

  const handleSimultaneousRefereesChange = (value) => {
    if (value >= numLocations) {
      setSimultaneousReferees(value);
    } else {
      toast.error(`Số đội ngũ trọng tài phải lớn hơn hoặc bằng ${numLocations}.`);
    }
  };

  const saveRefereesToDB = () => {
    const selectedReferees = updatedRefereeList
      .filter((referee) => referee.selected)
      .map((referee) => ({
        refereeId: referee.id,
        role: referee.role || "SRF",
      }));
     console.log(selectedReferees)
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
        setLoading(true);
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
        if (ref.id === referee.id) {
          return { ...ref, selected: !ref.selected };
        }
        return ref;
      });

      const selectedRefs = updatedReferees.filter((ref) => ref.selected);
      setSelectedReferee(selectedRefs);
      setSelectAll(selectedRefs.length === updatedReferees.length);
      return updatedReferees;
    });
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    const updatedList = updatedRefereeList.map((referee) => ({
      ...referee,
      selected: newSelectAll,
    }));

    setUpdatedRefereeList(updatedList);
    setSelectedReferee(newSelectAll ? updatedList : []);
  };

  return (
    <div className="role-assignment-container">
      <div className="role-assignment-header">
        <h2>Quản lí trọng tài</h2>
        <div className="header-buttons">
          {isAssign !== true && (
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
            onChange={(e) => handleSimultaneousRefereesChange(Number(e.target.value))}
          />
        </div>
      </div>
      <div className="table-edit-refereecompetition-moderator">
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
                    onChange={(e) =>
                      handleRoleChange(referee.id, e.target.value)
                    }
                    className="role-select"
                    disabled={isCheck}
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
    </div>
  );
};

export default RoleAssignment;
