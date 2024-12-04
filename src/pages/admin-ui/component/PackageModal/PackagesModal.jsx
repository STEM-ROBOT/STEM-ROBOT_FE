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

  const [errors, setErrors] = useState({}); // Thêm state để lưu lỗi

  useEffect(() => {
    if (packageData) {
      setName(packageData.name);
      setMaxMatch(packageData.maxMatch);
      setPrice(packageData.price);
      setMaxTournament(packageData.maxTournament);
      setMaxTeam(packageData.maxTeam);
      setErrors({});
    } else {
      setName("");
      setMaxMatch("");
      setPrice("");
      setMaxTournament("");
      setMaxTeam("");
      setErrors({});
    }
  }, [packageData]);

  const validateFields = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Tên gói dịch vụ không được để trống.";
    if (!maxMatch || isNaN(maxMatch) || maxMatch <= 0)
      newErrors.maxMatch = "Số trận đấu phải là số dương.";
    if (!price || isNaN(price) || price <= 0)
      newErrors.price = "Giá phải là số dương.";
    if (!maxTournament || isNaN(maxTournament) || maxTournament <= 0)
      newErrors.maxTournament = "Số lần tạo giải phải là số dương.";
    if (!maxTeam || isNaN(maxTeam) || maxTeam <= 0)
      newErrors.maxTeam = "Số đội tối đa phải là số dương.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Trả về true nếu không có lỗi
  };

  const handleSave = () => {
    if (!validateFields()) {
      return; // Dừng lại nếu có lỗi
    }

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
        
          onSave({ ...updatedPackage, id: packageData.id }); 
          toast.success("Cập nhật gói dịch vụ thành công!");
          onClose();
        })
        .catch((error) => {
          toast.error("Cập nhật gói dịch vụ thất bại!");
          console.error("Error updating package:", error);
        });
    } else {
      // Add new package
      api
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
          className={`packages_modal_input ${errors.name ? "input-error" : ""}`}
        />
        {errors.name && <span className="error-text">{errors.name}</span>}

        <label className="packages_modal_label">Số trận đấu tối đa</label>
        <input
          type="text"
          placeholder="Số trận đấu tối đa"
          value={maxMatch}
          onChange={(e) => setMaxMatch(e.target.value)}
          className={`packages_modal_input ${
            errors.maxMatch ? "input-error" : ""
          }`}
        />
        {errors.maxMatch && <span className="error-text">{errors.maxMatch}</span>}

        <label className="packages_modal_label">Giá</label>
        <input
          type="text"
          placeholder="Giá gói dịch vụ"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className={`packages_modal_input ${errors.price ? "input-error" : ""}`}
        />
        {errors.price && <span className="error-text">{errors.price}</span>}

        <label className="packages_modal_label">Lượt tạo giải đấu tối đa</label>
        <input
          type="text"
          placeholder="Lượt tạo giải đấu tối đa"
          value={maxTournament}
          onChange={(e) => setMaxTournament(e.target.value)}
          className={`packages_modal_input ${
            errors.maxTournament ? "input-error" : ""
          }`}
        />
        {errors.maxTournament && (
          <span className="error-text">{errors.maxTournament}</span>
        )}

        <label className="packages_modal_label">Số đội tối đa tham gia</label>
        <input
          type="text"
          placeholder="Số đội tối đa tham gia"
          value={maxTeam}
          onChange={(e) => setMaxTeam(e.target.value)}
          className={`packages_modal_input ${
            errors.maxTeam ? "input-error" : ""
          }`}
        />
        {errors.maxTeam && <span className="error-text">{errors.maxTeam}</span>}

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
