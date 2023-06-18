import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faUmbrella, faCloudSun, faLightbulb, faMicrochip, faGamepad, faSignOutAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Popup from "./Popup";
import axios from "axios";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { w3cwebsocket as WebSocket } from 'websocket';
import "./MainContent.css";
import { useNavigate } from "react-router-dom";
import InputDiv from "./InputDiv";


function MainContent() {
    const MAX_STATE_SIZE = 100;
    const [state, setState] = useState([]);
    const [activeTab, setActiveTab] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");
    const [newDevice, setNewDevice] = useState({
        name: "",
        status: "",
        connectionType: ""
    });
    const [showAdminSettings, setShowAdminSettings] = useState(false);
    const [sensorData, setSensorData] = useState([]);
    const navigate = useNavigate();

    const [state2, setState2] = useState([
        { id: 1, name: "Device 1", humidity: 50 },
        { id: 2, name: "Device 2", humidity: 30 },
        { id: 3, name: "Device 3", humidity: 70 },
    ]);
    const [humidityData, setHumidityData] = useState([]);

    useEffect(() => {
        const updatedHumidityData = state2.map((device) => ({
            id: device.id,
            humidity: device.humidity,
        }));
        setHumidityData(updatedHumidityData);
    }, [state2]);

    useEffect(() => {
        fetchData();

    }, []);

    useEffect(() => {
        fetchData();

        const ws = new WebSocket("ws://localhost:8084");

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            const { deviceId, humidity } = message;

            setState((prevState) => {
                const updatedDevices = prevState.map((device) => {
                    if (device.id === deviceId) {
                        return {
                            ...device,
                            humidity: humidity,
                        };
                    }
                    return device;
                });

                return updatedDevices;
            });
        };

        return () => {
            ws.close();
        };
    }, []);

    useEffect(() => {
        const sensorObjects = state.filter(
            (device) => device.type === "sensor" && device.humidity
        );

        const sensorData = sensorObjects.map((sensor) => ({
            name: sensor.name,
            value: sensor.humidity,
        }));

        setSensorData(sensorData);
    }, [state]);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/devices");
            const data = await response.json();
            const devicesWithIds = data.map((device) => ({
                ...device,
                id: device._id
            }));
            setState(devicesWithIds);
        } catch (error) {
            console.log(error);
        }
    };

    const handleBoxClick = async (id) => {
        try {
            const response = await axios.put(`http://localhost:3000/api/device/${id}`);
            const deviceData = response.data;
            setState((prevState) => {
                const updatedDevices = prevState.map((device) => {
                    if (device.id === id) {
                        const newStatus = device.status === "On" ? "Off" : "On";
                        return {
                            ...device,
                            status: newStatus
                        };
                    }
                    return device;
                });
                const updatedDevice = updatedDevices.find((device) => device.id === id);
                if (updatedDevice) {
                    setStatusMessage((prevMessage) => {
                        return prevMessage ? `${prevMessage}\nTurned ${updatedDevice.name} ${updatedDevice.status}` : `Turned ${updatedDevice.name} ${updatedDevice.status}`;
                    });
                }
                return updatedDevices;
            });
        } catch (error) {
            console.error("PUT request failed:", error);
            setStatusMessage("PUT request failed");
        }
    };

    const handleTabClick = (index) => {
        if (index === 1) {
            navigate("/admin");
        } else {
            setActiveTab(index);
        }
    };

    const handleAddDeviceClick = () => {
        setShowPopup(true);
    };

    const handleTabClick2 = (index) => {
        if (index === 2) {
            localStorage.removeItem("isLoggedIn");
            navigate("/login");
            window.location.reload();
        } else {
            setActiveTab(index);
        }
    };

    const handlePopupClose = () => {
        setShowPopup(false);
        setNewDevice({
            name: "",
            status: "",
            connectionType: ""
        });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewDevice((prevDevice) => ({
            ...prevDevice,
            [name]: value
        }));
    };

    const handleSaveDevice = () => {
        setState((prevDevices) => [...prevDevices, newDevice]);
        handlePopupClose();
    };

    const handleRemoveDevice = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/device/remove/${id}`);
            setState((prevDevices) => prevDevices.filter((device) => device.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const toggleAdminSettings = () => {
        setShowAdminSettings(!showAdminSettings);
    };

    return (
        <div className="container">
            <div className="sidebar">
                <div
                    className={`tab ${activeTab === 0 ? "active" : ""}`}
                    onClick={() => handleTabClick(0)}
                >
                    Manage devices
                </div>
                <div
                    className={`tab ${activeTab === 1 ? "active" : ""}`}
                    onClick={() => handleTabClick(1)}
                >
                    Admin settings
                </div>
                <div
                    className={`tab ${activeTab === 2 ? "active" : ""}`}
                    onClick={() => handleTabClick2(2)}
                >
                    <FontAwesomeIcon icon={faSignOutAlt} className="tab-icon" />
                    Log out
                </div>
            </div>

            <div className="content">
                <div className="input-div">
                    <InputDiv />
                </div>
                <div className="input-div2">
                    <InputDiv />
                </div>
                <div className="input-div3">
                    <InputDiv />
                </div>
                <div className="input-div4">
                    <InputDiv />
                </div>

                <div className="circleP">
                    <CircularProgressbar
                        value={Math.floor(Math.random() * 101)}
                        text={Math.floor(Math.random() * 101).toString()}
                    />
                </div>
                <div className="circleD">
                    <CircularProgressbar
                        value={Math.floor(Math.random() * 101)}
                        text={Math.floor(Math.random() * 101).toString()}
                    />
                </div>
                <div className="circleC">
                    <CircularProgressbar
                        value={Math.floor(Math.random() * 101)}
                        text={Math.floor(Math.random() * 101).toString()}
                    />
                </div>
                <div className="circleK">
                    <CircularProgressbar
                        value={Math.floor(Math.random() * 101)}
                        text={Math.floor(Math.random() * 101).toString()}
                    />
                </div>
                <div className="real-time-data-label">REAL TIME DATA</div>
                <div className="code-block">
                    <div className="code-scroll">
                        <pre>
                            <code>
                                {JSON.stringify(state, null, 2)}
                            </code>
                        </pre>
                    </div>
                </div>
            </div>

            <div className="box-container">
                <h2>Devices</h2>

                {state.map((item) => (
                    <div
                        className="box"
                        key={item.id}
                        onClick={() => handleBoxClick(item.id)}
                    >
                        <h3>{item.name}</h3>
                        <div
                            className={`circle ${item.status === "On" ? "active" : ""}`}
                            style={{
                                backgroundColor: item.status === "On" ? "green" : "red"
                            }}
                        ></div>
                        <p>Status: {item.status}</p>
                        <p>Address: {item.address}</p>
                        {item.type === "Lamp" && (
                            <FontAwesomeIcon icon={faLightbulb} className="lamp-icon" />
                        )}
                        {item.type === "sensor" && (
                            <FontAwesomeIcon icon={faMicrochip} className="lamp-icon" />
                        )}
                        {item.type === "Controller" && (
                            <FontAwesomeIcon icon={faGamepad} className="lamp-icon" />
                        )}
                        <FontAwesomeIcon
                            icon={faTrashAlt}
                            className="trash-icon"
                            onClick={() => handleRemoveDevice(item.id)}
                        />
                    </div>
                ))}

                {showPopup && (
                    <Popup
                        newDevice={newDevice}
                        handleInputChange={handleInputChange}
                        handleSaveDevice={handleSaveDevice}
                        handlePopupClose={handlePopupClose}
                    />
                )}

                <div className="box add-box" onClick={handleAddDeviceClick}>
                    +
                </div>
            </div>

            {showAdminSettings && (
                <div className="admin-settings">
                    <h2>Admin Settings</h2>
                    <div className="admin-settings-content">
                        { }
                    </div>
                </div>
            )}

            <div className="weather-bar">
                <div className="temperature-today">
                    <h2>19/06/2023</h2>
                    <div className="divider"></div>
                    <h2>Today</h2>
                    <div className="temperature-1">
                        <div className="weather-info">
                            <FontAwesomeIcon icon={faSun} className="weather-icon" />
                            <h2>15/9<span>°C</span></h2>
                        </div>
                        <div className="weather-info">
                            <FontAwesomeIcon icon={faUmbrella} className="weather-icon" />
                            <h2>0%</h2>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="temperature-tomorrow">
                    <h2>Tomorrow</h2>
                    <div className="temperature-2">
                        <div className="weather-info">
                            <FontAwesomeIcon icon={faCloudSun} className="weather-icon first" />
                            <h2>18/12<span>°C</span></h2>
                        </div>
                        <div className="weather-info">
                            <FontAwesomeIcon icon={faUmbrella} className="weather-icon" />
                            <h2>10%</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainContent;
