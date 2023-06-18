import React, { useState, useEffect } from "react";

function UserTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/user");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log("Error:", error);
      // Handle the error or display a notification to the user
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Last Logon Date</th>
          <th>User Type</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.lastLogonDate}</td>
            <td>{user.userType}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;