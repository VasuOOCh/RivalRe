import React, { useEffect, useState } from 'react'
import "./showpost.scss"
import { useParams } from 'react-router-dom'
import axios from 'axios'
const ShowPost = () => {
    const {postId} = useParams();
    const [post,setPost] = useState({})
    // console.log(params);
    useEffect(() => {
        try {
            async function getPost() {
                const {data} =await axios.get('/posts/' + postId)
                // console.log(data);
                setPost(data)
            }
            getPost()
        } catch (error) {
            console.log(error.response.data);
        }
    },[postId])

  return (
    <div className='showPost'>
      ShowPost
    </div>
  )
}

export default ShowPost
