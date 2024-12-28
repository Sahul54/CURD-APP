import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import './add.css';

const Add = () => {
  const [user, setUser] = useState({ 
    fname: '',
    lname: '',
    email: '' 
    });

  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const fileChangeHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!user.fname || !user.lname || !user.email || !image) {
        toast.error('All fields are required', { position: 'top-right' });
        return;
    } 

    const formData = new FormData();
    formData.append('fname', user.fname);
    formData.append('lname', user.lname);
    formData.append('email', user.email);
    formData.append('image', image);


    try {
        const response = await axios.post('https://curd-application-drrf.onrender.com/api/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Required for file uploads
            },
        });

        if (response.status === 200) {
            toast.success('User added successfully', { position: 'top-right' });
            console.log("Success:", response.data);
            navigate('/'); // Redirect to the main page
        } else {
            throw new Error('Unexpected response from the server');
        }
    } catch (error) {
        toast.error('Failed to add user', { position: 'top-right' });
        console.error("Error:", error.message || error.response?.data || error);
    }
};


  return (
    <div className="addUser">
      <Link to="/">Back</Link>
      <h3>Add User</h3>
      <form className="addUserForm" onSubmit={submitForm} encType="multipart/form-data">
        <div className="inputGroup">
          <label htmlFor="fname">First name</label>
          <input type="text" id="fname" name="fname" value={user.fname} onChange={inputChangeHandler} placeholder="First name" />
        </div>
        <div className="inputGroup">
          <label htmlFor="lname">Last name</label>
          <input type="text" id="lname" name="lname" value={user.lname} onChange={inputChangeHandler} placeholder="Last name" />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={user.email} onChange={inputChangeHandler} placeholder="Email" />
        </div>
        <div className="inputGroup">
          <label htmlFor="image">Upload Image</label>
          <input type="file" id="image" name="image" onChange={fileChangeHandler} />
        </div>
        <div className="inputGroup">
          <button type="submit">Add User</button>
        </div>
      </form>
    </div>
  );
};

export default Add;
