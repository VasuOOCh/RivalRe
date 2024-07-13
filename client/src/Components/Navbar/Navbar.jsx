import React from 'react'
import './navbar.scss'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserStart, fetchUserFailure, fetchUserSuccess } from '../../Redux/userSlice';
import { persistor } from '../../Redux/store';
import axios from 'axios'

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch()
  // console.log(currentUser);
  const handleLogout = async () => {
    try {
      await axios.get('/auth/logout');
      dispatch(fetchUserSuccess(null));
      // When you want to clear the persisted state:
      persistor.purge();

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='navbar'>
      <div className="navWrapper">
        <div className="logo">
          Rival.Re
        </div>
        <ul className="navItems">
          <li>Home</li>
          <li>About</li>
          <li>Report a bug</li>
        </ul>
        <ul className='user'>
          {
            currentUser ?
              <Link style={{ color: "inherit", textDecoration: "none" }} to={'/profile/' + currentUser._id}>
              <div className="currentUser">
                <div className="userInfo">
                  <img src={currentUser.avatar} alt="img" />
                  <span>{currentUser.username}</span>
                </div>
                <button onClick={handleLogout} className='logout'>Logout</button>
              </div></Link> :
              <Link style={{ color: "inherit", textDecoration: "none" }} to={'/signin'}>
                <button>
                  SignIn / SignUp
                </button>
              </Link>
          }
        </ul>
      </div>
    </div>
  )
}

export default Navbar
