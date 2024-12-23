import React from 'react'
import { Link } from 'react-router-dom'
import "./user.css"


const User = () => {
  return (
    <div className='userTable'>
        <Link to={"/add"} className='add-btn'>Add User</Link>
        <table border={1} cellPadding={10} cellSpacing={0}>
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>User Name</th>
                    <th>User Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1.</td>
                    <td>Sahul Kumar</td>
                    <td>sahul@gmail.com</td>
                    <td className='action-btn'>
                        <button>Delete</button>
                        <Link to = {'/edit'}>Edit</Link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default User