import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./AdminSettings.css";

function FunctionBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    navigate("/login");
  };

  const handleManageDevicesClick = () => {
   
    navigate("/");
  };

  const handleAdminSettingsClick = () => {
 
    navigate("/admin");
  };

  return (
    <div className="function-bar">
      <div className="tab-container">
        <div className="tab active" onClick={handleManageDevicesClick}>
          Manage Devices
        </div>
        <div className="tab" onClick={handleAdminSettingsClick}>
          Admin Settings
        </div>
        <div className="tab" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} className="tab-icon" />
          Log Out
        </div>
      </div>
    </div>
  );
}

function AdminSettings() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);


  const handleUserTypeChange = async (userId, userType) => {
    try {
      const response = await fetch(`http://localhost:3000/api/user/make-${userType}/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userType }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update user type');
      }
  
      fetchUsers();
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/user");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="admin-settings-container">
      <div className="sidebar">
        <FunctionBar />
      </div>
      <div className="admin-settings-content">
        <h2>Admin Settings</h2>
        <div className="users-table">
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Last Logon Date</th>
                <th>Date of Creation</th>
                <th>User Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.lastLogonDate}</td>
                  <td>{user.dateOfCreation}</td>
                  <td>
                    <select
                      value={user.userType}
                      onChange={(e) => handleUserTypeChange(user._id, e.target.value)}
                    >
                      <option value="normal">Normal</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="remove-button"
                      onClick={(e) => {
                        e.stopPropagation();
                      
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminSettings;
