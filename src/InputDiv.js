import React, { useEffect, useState } from "react";

function InputDiv() {
  const [inputValue, setInputValue] = useState("");
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/devices");
        const data = await response.json();
        const devicesWithIds = data.map((device) => ({
          ...device,
          id: device._id
        }));
        setDevices(devicesWithIds);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="input-div-container"> {}
      <select value={inputValue} onChange={handleInputChange}>
        <option value="">Select a device</option>
        {devices.map((device) => (
          <option key={device.id} value={device.name}>
            {device.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default InputDiv;
