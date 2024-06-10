import React, { useState } from 'react';
import HeaderAdmin from '../components/HeaderAdmin';
import '../components/viewuser.css';
import Profile from '../components/Profile';
import Buttons from '../components/Buttons';
import ConfirmationDialog from '../components/ConfirmationDialog'; // Import ConfirmationDialog component
import { Link } from 'react-router-dom';

export default function ViewUser() {
  const [users, setUsers] = useState([
    { id: 'L001', name: 'Alice', email: 'alice@example.com', role: 'Lecturer' },
    { id: 'I001', name: 'Bob', email: 'bob@example.com', role: 'Instructor' },
    { id: 'T001', name: 'Charlie', email: 'charlie@example.com', role: 'Technical Officer' },
    { id: 'L002', name: 'Alice', email: 'alice@example.com', role: 'Lecturer' },
    { id: 'I002', name: 'Bob', email: 'bob@example.com', role: 'Instructor' },
    { id: 'T002', name: 'Charlie', email: 'charlie@example.com', role: 'Technical Officer' },
    { id: 'L003', name: 'Alice', email: 'alice@example.com', role: 'Lecturer' },
    { id: 'I003', name: 'Bob', email: 'bob@example.com', role: 'Instructor' },
    { id: 'T003', name: 'Charlie', email: 'charlie@example.com', role: 'Technical Officer' }

  ]);

  const [selectedRole, setSelectedRole] = useState('Lecturers');
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const [textContainerText, setTextContainerText] = useState("Add User Details");
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false); // State to track confirmation dialog visibility
  const [userToRemove, setUserToRemove] = useState(null); // State to track the user to be removed

  const handleRoleClick = (role) => {
    setSelectedRole(role);
  };

  const handleUserIconClick = () => {
    setIsBoxVisible(!isBoxVisible);
  };

  const handleEditButtonClick = () => {
    setTextContainerText("Edit User Details");
  };

  const handleRemoveButtonClick = (user) => {
    setUserToRemove(user);
    setShowConfirmationDialog(true);
  };

  const handleRemoveConfirmation = (confirmed) => {
    if (confirmed && userToRemove) {
      // Remove the user
      setUsers(users.filter(user => user.id !== userToRemove.id));
    }
    setShowConfirmationDialog(false);
    setUserToRemove(null);
  };

  const filteredUsers = users.filter(user => {
    if (selectedRole === 'Lecturers') return user.role === 'Lecturer';
    if (selectedRole === 'Instructors') return user.role === 'Instructor';
    if (selectedRole === 'Technical Officers') return user.role === 'Technical Officer';
    return false;
  });

  return (
    <div>
      <HeaderAdmin onUserIconClick={handleUserIconClick} isProfileVisible={isBoxVisible} />
      <hr style={{height: '1px', backgroundColor: 'black', borderStyle: 'none', margin: 0}}/>
      <div className="viewuser-container">
        <div className="left-side-admin">
          <h2 className="title-admin">Users</h2>
          <ul className="role-list">
            <li onClick={() => handleRoleClick('Lecturers')} className={selectedRole === 'Lecturers' ? 'selected' : ''}>
              Lecturers
            </li>
            <li onClick={() => handleRoleClick('Instructors')} className={selectedRole === 'Instructors' ? 'selected' : ''}>
              Instructors
            </li>
            <li onClick={() => handleRoleClick('Technical Officers')} className={selectedRole === 'Technical Officers' ? 'selected' : ''}>
              Technical Officers
            </li>
          </ul>
        </div>
        <div className="right-side-admin">
          <h3 className="role-title">{selectedRole}</h3>
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
              
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <div className="button-row">
                    <Link to="/adduser">
                      <Buttons text="Edit" borderRadius="20px" width="65px"  height="42px" marginTop="20px" onClick={handleEditButtonClick}/>
                    </Link>
                    <Buttons text="Remove" borderRadius="20px" width="100px"  height="42px" marginTop="20px" marginLeft="50px" onClick={() => handleRemoveButtonClick(user)} />
                  </div>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isBoxVisible && <Profile />}
        {showConfirmationDialog && (
          <ConfirmationDialog
            message={`Do you want to remove "${userToRemove ? userToRemove.role : ''}" User?`}
            onConfirm={handleRemoveConfirmation}
          />
        )}
      </div>
    </div>
  );
}
