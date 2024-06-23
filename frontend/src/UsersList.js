import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser } from './api';
import './App.css' ;

const UsersList = ({ onEdit }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  return (
    <div className="user-list">
      <h2>User List</h2>
      <ul className="list-group">
        {users.map((user) => (
          <li key={user.id} className="list-group-item">
            <div className="user-details">
              <span className="user-username">{user.username}</span>
              <span className="user-email">({user.email})</span>
            </div>
            <div className="user-actions">
              <button className="btn btn-sm btn-primary" onClick={() => onEdit(user)}>Edit</button>
              <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
