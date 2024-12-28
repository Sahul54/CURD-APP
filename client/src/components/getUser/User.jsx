import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import './user.css';

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://curd-application-drrf.onrender.com/api/getAll');
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8000/api/deleteUser/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      toast.success('User deleted successfully', { position: 'top-right' });
    } catch (error) {
      toast.error('Failed to delete user', { position: 'top-right' });
    }
  };

  return (
    <div className="userTable">
      <Link to="/add" className="addButton">Add User</Link>
      <table>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id} className="userRow">
              <td>{index + 1}</td>
              <td className="img">
                <img src={`http://localhost:8000/uploads/${user.image}`} alt="User" />
              </td>
              <td>{user.fname} {user.lname}</td>
              <td>{user.email}</td>
              <td className="actionButtons">
                <button className="deleteButton" onClick={() => deleteUser(user._id)}>Delete</button>
                <Link to={`/edit/${user._id}`} className="editButton">Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
