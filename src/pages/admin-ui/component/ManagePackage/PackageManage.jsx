import React, { useState, useEffect } from "react";
import axios from "axios";
import { CiEdit, CiCircleRemove } from "react-icons/ci";
import "./PackageManage.css";
import PackagesModal from "../PackageModal/PackagesModal";
import DeleteModal from "../PackageModal/DeleteModal";
import api from "../../../../config";
const PackageManage = () => {
  const [packages, setPackages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Fetch packages from API

  useEffect(() => {
    api
      .get("api/packages")
      .then((response) => {
        if (response.data.success.data) {
          setPackages(response.data.success.data);
          console.log(packages);
        } else {
          navigate(`/404error`);
        }

      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



  const handleAddClick = () => {
    setSelectedPackage(null); // Clear selected package for adding new
    setIsModalOpen(true);
  };

  const handleEditClick = (pkg) => {
    setSelectedPackage(pkg); // Set selected package for editing
    setIsModalOpen(true);
  };

  const handleDeleteClick = (pkg) => {
    setSelectedPackage(pkg); // Set selected package for deletion
    setIsDeleteModalOpen(true);
  };

  const handleDeletePackage = (packageId) => {
    // Remove the deleted package from the list
    setPackages((prevPackages) => prevPackages.filter((pkg) => pkg.id !== packageId));
  };

  const handleSavePackage = (updatedPackage) => {
    setPackages((prevPackages) => {
      const packageIndex = prevPackages.findIndex((pkg) => pkg.id === updatedPackage.id);
      if (packageIndex >= 0) {
        const newPackages = [...prevPackages];
        newPackages[packageIndex] = updatedPackage;
        return newPackages;
      } else {
        return [...prevPackages, updatedPackage];
      }
    });
    setIsModalOpen(false); // Close modal after saving
  };

  return (
    <div className="package_manage_container">
      <div className="package_manage_container_title">Gói đăng ký thi đấu</div>
      <div className="package_manage_container_header">
        <div className="package_manage_search_container">
          <input
            type="text"
            placeholder="Tìm kiếm nội dung"
            className="package_manage_search_input"
          />
        </div>
        <div className="package_manage_action_buttons">
          <button className="package_manage_add_button" onClick={handleAddClick}>
            + Gói đăng ký thi đấu
          </button>
        </div>
      </div>
      <div className="package_manage_container_wrapper">
        {packages.map((pkg) => (
          <div key={pkg.id} className="package_card_wrapper">

            <div className="package_card_content_wrapper">
              <h3 className="package_card_title_text">{pkg.name}</h3>
              <p>Số trận đấu: {pkg.maxMatch}</p>
              <p>Giá: {pkg.price.toLocaleString()} đ</p>
              <p>Số lần tạo giải đấu: {pkg.maxTournament}</p>
              <p>Số đội tối đa: {pkg.maxTeam}</p>
            </div>
            <div className="package_card_actions">

              <div
                className="package_card_delete_icon"
                onClick={() => handleDeleteClick(pkg)}
              >
                <CiCircleRemove />
              </div>
              <div
                className="package_card_edit_icon"
                onClick={() => handleEditClick(pkg)}
              >
                <CiEdit />
              </div>
            </div>
          </div>
        ))}
      </div>
      <PackagesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePackage}
        packageData={selectedPackage}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDeletePackage}
        packageData={selectedPackage}
      />
    </div>
  );
};

export default PackageManage;
