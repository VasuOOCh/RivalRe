import React from 'react'
import './user.scss'
import { Link } from 'react-router-dom'

const User = ({user}) => {
  return (
    <Link style={{ color: "inherit", textDecoration: "none" }} to={'/profile/' + user._id}>
    <div className="userBox">
        <img src={user.avatar} alt="user" />
        <h2>{user.username}</h2>
        {/* <span>{user.username}</span> */}
    </div>
    </Link>
  )
}

export default User
