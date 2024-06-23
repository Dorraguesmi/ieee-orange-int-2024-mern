import React, { useState } from "react";
import UserList from "./UsersList";
import UserForm from "./UsersForm";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleEdit = (user) => {
    setCurrentUser(user);
    setShowForm(true);
  };

  const handleSave = () => {
    setShowForm(false);
    setCurrentUser(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setCurrentUser(null);
  };

  return (
    <div className="App">
      <h1>User Management</h1>
      {showForm ? (
        <UserForm
          currentUser={currentUser}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <div>
          <button onClick={() => setShowForm(true)}>Add User</button>
          <UserList onEdit={handleEdit} />
        </div>
      )}
    </div>
  );
};

export default App;
