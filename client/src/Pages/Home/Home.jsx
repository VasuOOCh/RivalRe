import React, { useEffect } from 'react'
import "./home.scss"
import { useSelector, useDispatch } from 'react-redux'
import { useState } from "react";
import AddPost from '../../Components/AddPost/AddPost';
import axios from 'axios';
import Card from '../../Components/Card/Card';


const Home = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [showHome, setShowHome] = useState(true)

    const [allPosts, setAllPosts] = useState([])

    useEffect(() => {
        try {
            if (showHome) {
                const fetchAllPosts = async () => {
                    const { data } = await axios.get('/posts');
                    // console.log(data);
                    setAllPosts(data)
                }
                fetchAllPosts()
            } else {
                const fetchAllPosts = async () => {
                    const { data } = await axios.get('/posts/subposts');
                    // console.log(data);
                    setAllPosts(data)
                }
                fetchAllPosts()
            }
        } catch (error) {
            console.log(error.response.data);

        }
    }, [showHome, currentUser])


    return (
        <div className='home'>
            <div className="homeLeft">

            </div>
            <div className="homeMain">
                {
                    currentUser &&
                    <AddPost setAllPosts={setAllPosts} />
                }
                <div className="postSwitch">
                    <div className={`homePosts${showHome ? " active" : ""}`} onClick={() => setShowHome(true)}>
                        Home
                    </div>
                    <div className={`followingPosts${!showHome ? " active" : ""}`} onClick={() => setShowHome(false)}>
                        Following
                    </div>
                </div>

                <div className="allPosts">
                    {
                        allPosts.map((post) => (<Card key={post._id} post={post} />))
                    }
                </div>



            </div>

            <div className="homeRight">

            </div>

        </div>
    )
}

export default Home
