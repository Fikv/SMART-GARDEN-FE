import React from "react";
import "./Popup.css";
import axios from "axios";

function Popup({ newDevice, handleInputChange, handlePopupClose }) {
  const handleSaveDevice = () => {
    const payload = {
      name: newDevice.name,
      type: newDevice.deviceType,
      status: newDevice.status,
      connectionType: newDevice.connectionType,
      address: newDevice.address
    };

    axios
      .post("http://localhost:3000/api/device", payload)
      .then(response => {
        console.log(response.data);
        window.location.reload(); // Reload the page
        // Handle the response if needed
      })
      .catch(error => {
        console.error(error);
        // Handle the error if needed
      });
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <h2>Add New Device</h2>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={newDevice.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            name="status"
            value={newDevice.status}
            onChange={handleInputChange}
          >
            <option value="">Choose Status</option>
            <option value="on">On</option>
            <option value="off">Off</option>
          </select>
        </div>
        <div>
          <label>Device Type:</label>
          <select
            name="deviceType"
            value={newDevice.deviceType}
            onChange={handleInputChange}
          >
            <option value="">Choose Device Type</option>
            <option value="sensor">Sensor</option>
            <option value="lamp">Lamp</option>
            <option value="controller">Controller</option>
          </select>
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={newDevice.address}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Connection Type:</label>
          <select
            name="connectionType"
            value={newDevice.connectionType}
            onChange={handleInputChange}
          >
            <option value="">Choose Connection Type</option>
            <option value="wifi">Wi-Fi</option>
            <option value="bluetooth">Bluetooth</option>
          </select>
        </div>
        <div className="button-container">
          <button className="btn-save" onClick={handleSaveDevice}>
            Save
          </button>
          <button className="btn-cancel" onClick={handlePopupClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;


