import React, { useEffect, useState } from "react";
import "./ManageArena.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addLocations,
  getLocations,
} from "../../../../redux/actions/LocationAction";
import { getActive } from "../../../../redux/actions/FormatAction";

const ManageArena = () => {
  const { competitionId } = useParams();
  const dispatch = useDispatch();

  const getListLocations = useSelector((state) => state.getLocations);
  const Data = Array.isArray(getListLocations?.listLocation?.data)
    ? getListLocations?.listLocation?.data
    : [];
  const [arenas, setArenas] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const isAddSuccess = useSelector((state) => state.addLocation?.success);
  const IsLocation = useSelector(
    (state) => state?.getActiveFormat?.data?.data?.isLocation
  );

  useEffect(() => {
    dispatch(getLocations(competitionId));
    dispatch(getActive(competitionId));
  }, [dispatch, competitionId, isAddSuccess]);

  useEffect(() => {
    if (Data.length > 0) {
      setArenas(Data);
    }
  }, [Data]);

  // Automatically set new arenas based on user input
  const handleInputChange = (e) => {
    const num = parseInt(e.target.value);
    setInputValue(e.target.value);

    if (num > 0) {
      const newArenas = Array.from({ length: num }, (_, index) => ({
        id: index + 1,
        address: `Sân ${index + 1}`,
      }));
      setArenas(newArenas);
    } else {
      setArenas([]); // Clear the arenas if input is not valid
    }
  };

  // Handle name change for each arena
  const handleNameChange = (e, id) => {
    const updatedArenas = arenas.map((arena) =>
      arena.id === id ? { ...arena, address: e.target.value } : arena
    );
    setArenas(updatedArenas);
  };

  // Placeholder save function
  const saveArenas = () => {
    const payload = arenas.map((item) => ({
      address: item.address,
    }));
    dispatch(addLocations(competitionId, payload));
  };

  return (
    <div className="manage-arena-main-container">
      <h2 className="manage-arena-title">Quản Lý Sân Đấu</h2>
      <div className="manage-arena-input-section">
        <div className="manage-arena-input-group">
          <label className="manage-arena-label">Nhập số sân:</label>
          <input
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Nhập số sân"
            className="manage-arena-input-field"
          />
        </div>
      </div>

      {/* Render arenas with editable names */}
      <div className="manage-arena-grid-container">
        {arenas.map((arena) => (
          <div key={arena.id} className="manage-arena-individual-container">
            <div className="manage-arena-center-circle"></div>
            <input
              type="text"
              value={arena.address}
              onChange={(e) => handleNameChange(e, arena.id)}
              className="manage-arena-name-input"
            />
          </div>
        ))}
      </div>
      {!IsLocation && (
        <button className="manage-arena-save-button" onClick={saveArenas}>
          Lưu
        </button>
      )}
    </div>
  );
};

export default ManageArena;
