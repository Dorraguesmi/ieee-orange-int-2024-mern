import React, { useState, useEffect } from "react";
import { addUser, updateUser } from "./api";
import './App.css' ;

const UsersForm = ({ currentUser, onSave, onCancel }) => {
  const [user, setUser] = useState({ email: "", username: "", password: "" });

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user.id) {
        await updateUser(user.id, user);
      } else {
        await addUser(user);
      }
      onSave();
    } catch (error) {
      console.error("Error saving user", error);
    }
  };

  return (
    <div className="user-form">
      <h2>{user.id ? "Edit User" : "Add User"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            {user.id ? "Update" : "Add"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UsersForm;
