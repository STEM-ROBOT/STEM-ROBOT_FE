import React from "react";
import "./DeleteModal.css";
import api from "../../../../config";
import { toast } from "react-toastify";

const DeleteModal = ({ isOpen, onClose, onDelete, packageData }) => {
  if (!isOpen) return null;

  const handleDelete = () => {
    api
      .delete(`/api/packages/${packageData.id}`)
      .then((response) => {
        
          toast.success("Xóa gói dịch vụ thành công!");
          onDelete(packageData.id); // Notify the parent to remove the package from the list
          onClose(); // Close the modal
        
      })
      .catch((error) => {
        toast.error("Xóa gói dịch vụ thất bại!"); // Handle network or server errors
        console.error("Error deleting package:", error);
      });
  };
  

  return (
    <div className="delete_modal_overlay">
      <div className="delete_modal">
        <h3 className="delete_modal_title">Xác nhận xóa</h3>
        <p>
          Bạn có chắc chắn muốn xóa gói dịch vụ "
          <strong>{packageData?.name}</strong>" không?
        </p>

        <div className="delete_modal_actions">
          <button
            onClick={onClose}
            className="delete_modal_button delete_modal_cancel"
          >
            Hủy
          </button>
          <button
            onClick={handleDelete}
            className="delete_modal_button delete_modal_confirm"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
