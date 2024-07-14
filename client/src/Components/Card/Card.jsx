import React, { useEffect, useRef, useState } from 'react'
import './card.scss'
import axios from 'axios'
import { format, render, cancel, register } from 'timeago.js';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserStart, fetchUserFailure, fetchUserSuccess, followUser, unfollowUser } from '../../Redux/userSlice';
import ImageSlider from '../ImageSlider/ImageSlider';
import { Link, useNavigate } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Comment from '../Comments/Comment';



const Card = ({post}) => {
    const navigate = useNavigate()
    const [openSection, setOpenSection] = useState(false)
    const dispatch = useDispatch()
    const { currentUser } = useSelector((state) => state.user)
    const [userDetails, setUserDetails] = useState({});
    const [showComments,setShowComments] = useState(false)
    async function deletePost() {
        try {
            await axios.delete('/posts/' + post._id)
            navigate('/')

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        async function fetchUserDetails() {
            const { data } = await axios.get('/users/' + post.userId)
            // console.log(data);
            setUserDetails(data)
        }
        fetchUserDetails()
    }, [post])

    const [likeState, setLikeState] = useState({
        likeCount: post.likes.length,
        isLiked: post.likes.includes(currentUser?._id)
    });
    const [dislikeState, setDislikeState] = useState({
        dislikeCount: post.dislikes.length,
        isDisliked: post.dislikes.includes(currentUser?._id)
    })
    // console.log(post);

    async function followUserFunc() {
        try {
            const { data } = await axios.put('/users/follow/' + userDetails._id)
            dispatch(followUser(userDetails._id))

        } catch (error) {
            console.log(error);
        }
    }
    async function unfollowUserFunc() {
        try {
            const { data } = await axios.put('/users/unfollow/' + userDetails._id)
            dispatch(unfollowUser(userDetails._id))

        } catch (error) {
            console.log(error);
        }
    }

    async function likePost() {
        try {
            if (currentUser) {
                const { data } = await axios.put('posts/like/' + post._id);
                setLikeState((prev) => (
                    {
                        isLiked: data.likes.includes(currentUser._id),
                        likeCount: data.likes.length
                    }
                ))
                setDislikeState((prev) => (
                    {
                        isDisliked: data.dislikes.includes(currentUser._id),
                        dislikeCount: data.dislikes.length
                    }
                ))
            }

        } catch (error) {
            console.log(error.response.data);
        }
    }

    async function dislikePost() {
        try {
            if (currentUser) {
                const { data } = await axios.put('posts/dislike/' + post._id);
                setDislikeState((prev) => (
                    {
                        isDisliked: data.dislikes.includes(currentUser._id),
                        dislikeCount: data.dislikes.length
                    }
                ))
                setLikeState((prev) => (
                    {
                        isLiked: data.likes.includes(currentUser._id),
                        likeCount: data.likes.length
                    }
                ))
            }
        } catch (error) {
            console.log(error.response.data);
        }
    }

    return (
        <div className='cardMain'>
            <div className="userSection">
                <img src={userDetails.avatar} alt="avatar" />
                <div className='extraInfo'>
                    <div className="username">
                        <Link style={{
                            textDecoration: "none",
                            color: 'inherit'
                        }} to={'/profile/' + userDetails._id}>
                            <p className="name">
                                {userDetails.username}
                            </p>
                        </Link> •  {
                            currentUser && currentUser._id != userDetails._id && (
                                currentUser.following.includes(userDetails._id) ? <span onClick={unfollowUserFunc}>Following</span> : <span onClick={followUserFunc}>Follow</span>
                            )
                        }

                    </div>
                    <div className="date">
                        {format(post.createdAt)}
                    </div>
                </div>
                <div className="moreSection">
                    <MoreVertIcon className='moreIcon' onClick={() => setOpenSection(!openSection)} />
                    {
                        openSection && (
                            <div className="options">
                                <Link style={{
                                    textDecoration : "none",
                                    color: 'inherit'
                                }} to={'/profile/' + userDetails._id}>
                                <button>View Profile</button>
                                </Link>
                                {
                                    currentUser._id === userDetails._id && (
                                        <button onClick={deletePost}>Delete</button>
                                    )
                                }
                            </div>
                        )
                    }
                </div>
            </div>

            <div className="desc">
                {post.desc}
            </div>

            {
                post.images.length > 0 && (
                    <ImageSlider images={post.images} />
                )
            }
            <div className="statsSection">
                <div className="likes" onClick={likePost}>
                    {
                        likeState.isLiked ?
                            <ThumbUpAltIcon /> :
                            <ThumbUpOffAltIcon />
                    }
                    {
                        likeState.likeCount
                    }
                </div>
                <div className="dislikes" onClick={dislikePost}>
                    {
                        dislikeState.isDisliked ?
                            <ThumbDownAltIcon /> :
                            <ThumbDownOffAltIcon />
                    }
                    {
                        dislikeState.dislikeCount
                    }
                </div>

                <div className="comments" onClick={() => setShowComments(!showComments)}>
                    Comments
                </div>

                
            </div>
            {
                    showComments && (

                        <Comment postId={post._id} />
                    )
                }

        </div>
    )
}

export default Card