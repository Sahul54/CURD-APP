import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import "../addUser/add.css";
import toast from 'react-hot-toast';

const Edit = () => {

 const users = {
    fname: "",
    lname: "",
    email: "",
    profileImage: null,
 };

 const { id } = useParams();
 const navigate = useNavigate();
 const [user, setUser] = useState(users);

 const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
 };

 const fileChangeHandler = (e) => {
    setUser({ ...user, profileImage: e.target.files[0] });
 };

 useEffect(() => {
    axios.get(`http://localhost:8000/api/getOne/${id}`)
    .then((response) => {
        setUser(response.data);
    })
    .catch((error) => {
        console.log(error);
    });
 }, [id]);

 const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fname", user.fname);
    formData.append("lname", user.lname);
    formData.append("email", user.email);
    if (user.profileImage) formData.append("profileImage", user.profileImage);

    await axios.put(`http://localhost:8000/api/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => {
       toast.success(response.data.msg, { position: "top-right" });
       navigate("/");
    })
    .catch((error) => console.log(error));
 };

 return (
    <div className='addUser'>
        <Link to={"/"}>Back</Link>
        <h3>Update User</h3>
        <form className='addUserForm' onSubmit={submitForm}>
            <div className="inputGroup">
                <label htmlFor="fname">First Name</label>
                <input
                    type="text"
                    value={user.fname}
                    onChange={inputChangeHandler}
                    id="fname"
                    name="fname"
                    autoComplete="off"
                    placeholder="First Name"
                />
            </div>
            <div className="inputGroup">
                <label htmlFor="lname">Last Name</label>
                <input
                    type="text"
                    value={user.lname}
                    onChange={inputChangeHandler}
                    id="lname"
                    name="lname"
                    autoComplete="off"
                    placeholder="Last Name"
                />
            </div>
            <div className="inputGroup">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    value={user.email}
                    onChange={inputChangeHandler}
                    id="email"
                    name="email"
                    autoComplete="off"
                    placeholder="Email"
                />
            </div>
            <div className="inputGroup">
                <label htmlFor="profileImage">Profile Image</label>
                <input
                    type="file"
                    id="profileImage"
                    name="profileImage"
                    onChange={fileChangeHandler}
                />
            </div>
            <div className="inputGroup">
                <button type="submit">UPDATE USER</button>
            </div>
        </form>
    </div>
 );
};

export default Edit;
