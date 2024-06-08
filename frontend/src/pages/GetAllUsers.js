import React, { useState } from 'react';
import axios from 'axios';

const GetAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8070/api/users/getall', {
        headers: {
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjU4MzAwNzkyMmI0ZDBhNjQyNDcwYmMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTc4NDI0NDMsImV4cCI6MTcxNzg0NjA0M30.e9IQIGsJNcyBNCfL3dwnwIeFnKvU3LUIbACucQs7UHg"}`, // Replace yourAdminToken with your actual token
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      setUsers(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching users:', err);
      if (err.response) {
        setError(err.response.data.message || 'Failed to fetch users');
      } else {
        setError('Server error');
      }
    }
  };

  return (
    <div>
      <h1>Get All Users</h1>
      <button onClick={fetchUsers}>Fetch Users</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GetAllUsers;
