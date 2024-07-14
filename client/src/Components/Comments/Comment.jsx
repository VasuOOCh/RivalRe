import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SendIcon from '@mui/icons-material/Send';
import "./comment.scss"
import axios from 'axios';
import SingleComment from '../SingleComment/SingleComment';

const Comment = ({postId}) => {
    const {currentUser} = useSelector((state) => state.user)
    const [comments,setComments] = useState([]);
    const [newComment,setNewComment] = useState({
        desc : ''
    }) 

    useEffect(() => {
        try {
            async function getComments() {
                const {data} =await axios.get('/comments/post/' + postId)
                // console.log(data);
                setComments(data)
            }
            getComments()

        } catch (error) {
            console.log(error);
        }
    }, [postId])

    async function handleSubmit(e) {
        e.preventDefault()
        
        try {
            const {data} = await axios.post('/comments', {
                ...newComment, 
                userId : currentUser._id,
                postId
            });
            // console.log(data);
            setComments((prev) => [...prev, data])
        } catch (error) {
            console.log(error);
        }
    }



  return (
    <div className="commentSection">
        {
            currentUser && (
                <form onSubmit={handleSubmit} className="inputs">

            <img src={currentUser.avatar} alt="userImg" />
            <input onChange={(e) => {
                setNewComment((prev) => ({...prev, desc : e.target.value}))
            }} value={newComment.desc} required type="text" placeholder='Comment something...' />
            <button type='submit'>
            <SendIcon />
            </button>
        </form>

            )
        }
        <div className="comments">
            {
                comments.map((comment) => (
                    <SingleComment setComments={setComments} comment={comment} key={comment._id} />
                ))
            }
        </div>
    </div>
  )
}

export default Comment
