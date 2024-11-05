import React, { useState, useEffect } from "react";
import "./PackagesModal.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../../../config";

const PackagesModal = ({ isOpen, onClose, onSave, packageData }) => {
  const [name, setName] = useState("");
  const [maxMatch, setMaxMatch] = useState("");
  const [price, setPrice] = useState("");
  const [maxTournament, setMaxTournament] = useState("");
  const [maxTeam, setMaxTeam] = useState("");

  useEffect(() => {
    if (packageData) {
      setName(packageData.name);
      setMaxMatch(packageData.maxMatch);
      setPrice(packageData.price);
      setMaxTournament(packageData.maxTournament);
      setMaxTeam(packageData.maxTeam);
    } else {
      setName("");
      setMaxMatch("");
      setPrice("");
      setMaxTournament("");
      setMaxTeam("");
    }
  }, [packageData]);

  const handleSave = () => {
    const updatedPackage = {
      name,
      maxMatch,
      price,
      maxTournament,
      maxTeam,
    };

    if (packageData) {
      // Update existing package

      api
        .put(`/api/packages/${packageData.id}`, updatedPackage, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          toast.success("Cập nhật gói dịch vụ thành công!");
          onSave({ ...updatedPackage, id: packageData.id }); // Pass the ID back to the parent
          onClose();
        })
        .catch((error) => {
          toast.error("Cập nhật gói dịch vụ thất bại!");
          console.error("Error updating package:", error);
        });
    } else {
      // Add new package

      const response = api
        .post("/api/packages", updatedPackage, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          toast.success("Thêm gói dịch vụ thành công!");
          onSave({ ...updatedPackage, id: response.data.id }); // Use response data ID if available
          onClose();
        })
        .catch((error) => {
          toast.error("Thêm gói dịch vụ thất bại!");
          console.error("Error adding package:", error);
        });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="packages_modal_overlay">
      <ToastContainer />
      <div className="packages_modal">
        <h3 className="packages_modal_title">
          {packageData ? "Chỉnh sửa gói dịch vụ" : "Thêm gói dịch vụ mới"}
        </h3>

        <label className="packages_modal_label">Tên gói dịch vụ</label>
        <input
          type="text"
          placeholder="Tên gói dịch vụ"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="packages_modal_input"
        />

        <label className="packages_modal_label">Số trận đấu tối đa</label>
        <input
          type="text"
          placeholder="Số trận đấu tối đa"
          value={maxMatch}
          onChange={(e) => setMaxMatch(e.target.value)}
          className="packages_modal_input"
        />

        <label className="packages_modal_label">Giá</label>
        <input
          type="text"
          placeholder="Giá gói dịch vụ"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="packages_modal_input"
        />

        <label className="packages_modal_label">Lượt tạo giải đấu tối đa</label>
        <input
          type="text"
          placeholder="Lượt tạo giải đấu tối đa"
          value={maxTournament}
          onChange={(e) => setMaxTournament(e.target.value)}
          className="packages_modal_input"
        />

        <label className="packages_modal_label">Số đội tối đa tham gia</label>
        <input
          type="text"
          placeholder="Số đội tối đa tham gia"
          value={maxTeam}
          onChange={(e) => setMaxTeam(e.target.value)}
          className="packages_modal_input"
        />

        <div className="packages_modal_actions">
          <button
            onClick={onClose}
            className="packages_modal_button packages_modal_cancel"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="packages_modal_button packages_modal_save"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackagesModal;
