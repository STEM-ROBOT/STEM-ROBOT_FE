import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import "./EditTeamPopup.css";
import api from "../../../../config";
import { toast } from "react-toastify";
import { FirebaseUpload } from "/src/config/firebase";

const EditTeamPopup = ({ team, competitionId, closePopup, setLoadApi }) => {
  const [teamDetails, setTeamDetails] = useState({
    name: team.name,
    phoneNumber: team.phoneNumber,
    contactInfo: team.contactInfo,
    image: team.image,
    members: team.member || [],
  });
  const [logoFile, setLogoFile] = useState(null);

  const [contestantInTeam, setContestantInTeam] = useState(
    team.contestantInTeam
  );

  const [availableContestants, setAvailableContestants] = useState([]);
  const [selectedContestant, setSelectedContestant] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    if (newSelectAll && availableContestants.length > contestantInTeam) {
      alert(
        "Một đội chỉ được đăng ký tối đa " + contestantInTeam + " thành viên"
      );
      setSelectAll(false);
      return;
    }
    setSelectAll(newSelectAll);
    setAvailableContestants((prevContestants) =>
      prevContestants.map((contestant) => ({
        ...contestant,
        selected: newSelectAll,
      }))
    );

    setSelectedContestant(
      newSelectAll ? availableContestants.map((c) => c.id) : []
    );
  };

  // Lấy danh sách thí sinh rảnh khi component mount
  useEffect(() => {
    api
      .get(
        `api/contestants/available/competitionId?competitionId=${competitionId}`
      )
      .then((response) => {
        console.log(response.data.data.data);
        if (response.data.data.data) {
          setAvailableContestants(response.data.data.data); // Sử dụng dữ liệu từ API nếu tồn tại
        } else {
          console.error("Data format is unexpected:", response.data);
          setAvailableContestants([]); // Gán mảng rỗng nếu dữ liệu không đúng định dạng
        }
      })
      .catch((error) => {
        console.error("Error fetching available contestants:", error);
        setAvailableContestants([]); // Gán mảng rỗng khi gặp lỗi
      });
  }, [competitionId]);

  // Handle changes for inputs
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setTeamDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  // Handle logo change
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      const newLogoUrl = URL.createObjectURL(file);
      setTeamDetails((prevDetails) => ({ ...prevDetails, image: newLogoUrl }));
    }
  };

  const toggleSelection = (id) => {
    setAvailableContestants((prevContestants) => {
      const updatedContestants = prevContestants.map((contestant) => {
        // Chuyển đổi trạng thái chọn của thí sinh được bấm
        if (contestant.id === id) {
          return { ...contestant, selected: !contestant.selected };
        }
        return contestant;
      });

      // Lọc ra các ID của thí sinh đã được chọn
      const selectedIds = updatedContestants
        .filter((contestant) => contestant.selected)
        .map((contestant) => contestant.id);

      if (selectedIds.length === contestantInTeam + 1) {
        alert(
          "Một đội chỉ được đăng ký tối đa " + contestantInTeam + " thành viên"
        );
        return prevContestants;
      }
      //kiểm tra nếu số lượng thành viên đạt tối đa thì thông báo đã đủ thành viên
      if (teamDetails.members.length === contestantInTeam) {
        alert("Đội đã có đủ số lượng thành viên");
        return prevContestants;
      }
      //kiểm tra nếu số lượng thành viên hiện tại + số lượng thành viên được chọn vượt quá số lượng cho phép thì thông báo
      if (selectedIds.length + teamDetails.members.length > contestantInTeam) {
        alert("Sô lượng thành viên vượt quá số lượng cho phép");
        return prevContestants;
      }

      // Nếu đủ điều kiện, cập nhật danh sách `selectedContestant` và trạng thái `selectAll`
      setSelectAll(selectedIds.length === updatedContestants.length);
      setSelectedContestant(selectedIds);

      return updatedContestants;
    });
  };

  const handleSave = async () => {
    if (!teamDetails.name || !teamDetails.phoneNumber || !teamDetails.contactInfo) {
      toast.error("Vui lòng điền đầy đủ thông tin đội.");
      return;
    }
  
    // Validate phone number format
    const phoneRegex = /^[0-9]{10,11}$/; // Adjust to match the expected format
    if (!phoneRegex.test(teamDetails.phoneNumber)) {
      toast.error("Số điện thoại không hợp lệ. Vui lòng nhập 10-11 chữ số.");
      return;
    }
  
    if (selectedContestant.length !== contestantInTeam) {
      toast.error(`Vui lòng chọn đủ ${contestantInTeam} thí sinh cho đội.`);
      return;
    }
    const formattedContestants = selectedContestant.map((id) => ({
      contestantId: id,
      teamId:team.id,
    })); 
   
    let imageUrl = teamDetails.image; 
  
    if (logoFile) {
      try {
        console.log(logoFile)
        imageUrl = await FirebaseUpload(logoFile);
      } catch (error) {
        toast.error("Có lỗi xảy ra khi tải ảnh lên");
        console.error("Error uploading image:", error);
        return;
      }
    }
   
    const dataToSave = {
      name: teamDetails.name,
      phoneNumber: teamDetails.phoneNumber,
      contactInfo:teamDetails.contactInfo,
      image:imageUrl,
      contestants : formattedContestants
    } 
 

    api
      .put(
        `api/teams/${team.id}`,
        dataToSave,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        toast.success("Thí sinh đã được cập nhật vào đội thành công");
        setLoadApi(true);
        closePopup();
      })
      .catch((error) => {
        toast.error("Có lỗi xảy ra khi cập nhật thí sinh vào đội");
        console.error("Error updating team members:", error.message);
      });
  };

  return (
    <div className="edit-popup">
      <div className="popup-content">
        <h3>Chỉnh sửa đội</h3>

        <div className="popup-main-content">
          {/* Team logo with the option to change */}
          <div className="edit-logo-section">
            <label className="lable-image-edit-team">
              <img
                src={teamDetails.image}
                alt={teamDetails.name}
                className="edit-logo"
              />
              <input
                style={{ display: "none" }}
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
              />
            </label>
          </div>

          {/* Team name and contact info */}
          <div className="edit-info-section">
            <div>
              <label>Tên đội</label>
              <input
                type="text"
                name="name"
                value={teamDetails.name}
                onChange={handleFieldChange}
                placeholder="Tên đội"
              />
            </div>
            <div className="phone-and-contactperson">
              <div>
                <label>Số điện thoại</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={teamDetails.phoneNumber}
                  onChange={handleFieldChange}
                  placeholder="SĐT liên hệ"
                />
              </div>
              <div>
                <label>Đại diện</label>
                <input
                  type="text"
                  name="contactInfo"
                  value={teamDetails.contactInfo}
                  onChange={handleFieldChange}
                  placeholder="Tên người liên hệ"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Team Members */}
        <label>Thành viên</label>
        <div className="team-members-section">
          <table className="table-assign-contestatnnt-to-team">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Ảnh</th>
                <th>Email</th>
                <th>Tên</th>
              </tr>
            </thead>
            <tbody>
              {availableContestants.map((contestant) => (
                <tr key={contestant.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={contestant.selected || false}
                      onChange={() => toggleSelection(contestant.id)}
                    />
                  </td>
                  <td>
                    <img
                      src={contestant.image}
                      alt={contestant.name}
                      className="referee-image"
                    />
                  </td>
                  <td>{contestant.email}</td>
                  <td>{contestant.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button className="save-button-edit-team" onClick={handleSave}>
          Lưu
        </button>
        <button className="cancel-button-edit-team" onClick={closePopup}>
          Hủy
        </button>
      </div>
    </div>
  );
};

export default EditTeamPopup;
