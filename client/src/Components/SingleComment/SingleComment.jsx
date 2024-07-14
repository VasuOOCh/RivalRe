import React, { useEffect, useState } from 'react'
import './singlecomment.scss'
import axios from 'axios'
import { format, render, cancel, register } from 'timeago.js';
import { useSelector, useDispatch } from 'react-redux'

const SingleComment = ({comment,setComments}) => {
    const {currentUser} = useSelector((state) => state.user)
    const [userDetails,setUserDetails] = useState({})

    async function handleDelete() {
        try {
            await axios.delete('/comments/' + comment._id)
            setComments((prev) => {
                const updatedComments = prev.filter((com) => com._id != comment._id);
                return updatedComments
            })
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        try {
            async function fetchUser() {
                const {data} = await axios.get('/users/' + comment.userId)
                // console.log(data);
                setUserDetails(data);
            }
            fetchUser()
        } catch (error) {
            console.log(error);
        }
    },[comment])

  return (
    <div className='singleComment'>
      <img src={userDetails.avatar} alt="img" />
      <div className="text">
        <span>{userDetails.username} • &nbsp;
            {
                format(comment.createdAt)
            }
            &nbsp;
             {
               currentUser && currentUser._id == comment.userId && (
                    <>
                    • &nbsp;
             <span onClick={handleDelete} className='deleteBtn'>
                delete
             </span>
             </>
                )
             }
        </span>
        <p>{comment.desc}</p>
      </div>
    </div>
  )
}

export default SingleComment
