import React, { useEffect, useState } from 'react'
import "./profile.scss"
import axios from 'axios';
import Card from '../../Components/Card/Card';
import User from '../../Components/User/User';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import ProfileUpdate from '../../Components/Update User/ProfileUpdate';

const Profile = () => {
    const {currentUser} = useSelector((state) => state.user)
    const {userId} = useParams()
    const [user,setUser] = useState({})
    const [activeField, setActiveField] = useState('posts');
    const [posts,setPosts] = useState([]);
    const [followingUsers,setFollowingUsers] = useState([])
    const [followersUsers,setFollowersUsers] = useState([])

    useEffect(() => {
        try {
            if(userId) {
                async function fetchUser() {
                    const {data} = await axios.get('/users/' + userId)
                    setUser(data)
                    // console.log(user);
                }
                fetchUser()
            }
        } catch (error) {
            console.log(error.response.data);
        }
    }, [userId,currentUser])

    useEffect(() => {
        if (activeField === 'posts') {
           async function fetchPosts() {
                const {data} = await axios.get('/posts/?userId=' + userId )
                // console.log(data);
                setPosts(data)
            }
            fetchPosts()
        } else if (activeField === 'following') {
            async function fetchUsers() {
                const {data} = await axios.get('/users/following?userId=' + userId )
                // console.log(data);
                setFollowingUsers(data)
            }
            fetchUsers()
        } else {
            async function fetchUsers() {
                const {data} = await axios.get('/users/followers?userId=' + userId)
                // console.log(data);
                setFollowersUsers(data)
            }
            fetchUsers()
        }
    }, [activeField,userId])

    return (
        <div className="profilePage">
            <div className="userInfoSection">
                <div className="avatar">
                    <img src={user.avatar} alt="img" />
                </div>
                <div className="userInfo">
                    <h1>{user.username}</h1>
                    <div className="statsSection">
                        <div className="followersSection">
                            {user?.following?.length} following</div>
                        <div className="followingSection">
                        {user?.followers?.length} followers
                        </div>
                    </div>
                    <div className="auroStats">
                        Aura 23456
                    </div>
                </div>
            </div>

            {
                currentUser && currentUser._id == user._id && (
                    <ProfileUpdate user={user}  />
                )
            }

            <div className="selectSection">
                <div className={activeField == 'posts' ? "active" : ''} onClick={() => setActiveField('posts')}>Posts</div>
                <div className={activeField == 'following' ? "active" : ''} onClick={() => setActiveField('following')}>Following</div>
                <div className={activeField == 'followers' ? "active" : ''} onClick={() => setActiveField('followers')}>Followers</div>

            </div>

            <div className="showSections">
                {
                    activeField == 'posts' ? 
                    <div className='userPosts'>
                        {
                            posts.map((post) => <Card key={post._id} post={post} />)
                        }
                    </div> :
                    activeField == 'following' ? 
                    <div className="followingUserSection">
                        {
                            followingUsers.map((user) => (
                                <User key={user._id} user={user} />
                            ))
                        }
                    </div> : 
                    <div className="followersUserSection">
                        {
                            followersUsers.map((user) => (
                                <User key={user._id} user={user} />
                            ))
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default Profile
