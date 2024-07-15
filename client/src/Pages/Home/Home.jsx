import React, { useEffect } from 'react'
import "./home.scss"
import { useSelector, useDispatch } from 'react-redux'
import { useState } from "react";
import AddPost from '../../Components/AddPost/AddPost';
import axios from 'axios';
import Card from '../../Components/Card/Card';
import Story from '../../Components/Story/Story';
import { Link } from 'react-router-dom';
import Chat from '../../Components/Chat/Chat';
import {BallTriangle} from 'react-loader-spinner'


const Home = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [showHome, setShowHome] = useState(true);

    const [allPosts, setAllPosts] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        try {
            if (showHome) {
                const fetchAllPosts = async () => {
                    setLoading(true)
                    const { data } = await axios.get('/posts');
                    // console.log(data);
                    setAllPosts(data);
                    setLoading(false)
                }
                fetchAllPosts()
            } else {
                if (currentUser) {
                    setLoading(true)
                    const fetchAllPosts = async () => {
                        const { data } = await axios.get('/posts/subposts');
                        // console.log(data);
                        setAllPosts(data)
                        setLoading(false)
                    }
                    fetchAllPosts()
                }
            }
        } catch (error) {
            console.log(error.response.data);

        }
    }, [showHome, currentUser])

    if (loading) {
        return (
            <div className='loadBox'>
                <BallTriangle
                    height={100}
                    width={100}
                    radius={5}
                    color="#4fa94d"
                    ariaLabel="ball-triangle-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div>
        )
    }


    return (
        <div className='home'>
            <div className="homeLeft">

            </div>
            <div className="homeMain">
                {
                    currentUser &&
                    <>
                        <AddPost setAllPosts={setAllPosts} />
                        <Story /></>
                }

                {
                    currentUser && (
                        <div className="postSwitch">
                            <div className={`homePosts${showHome ? " active" : ""}`} onClick={() => setShowHome(true)}>
                                Home
                            </div>
                            <div className={`followingPosts${!showHome ? " active" : ""}`} onClick={() => setShowHome(false)}>
                                Following
                            </div>
                        </div>
                    )
                }

                {
                    !currentUser && (
                        <div className="infoAboutLogin">
                            <Link to={'/signin'} style={{
                                textDecoration: "none",
                                color: "#418aff"
                            }}>
                                Signin</Link> to add posts, chat with people , view stories and much more✨
                        </div>
                    )
                }

                <div className="allPosts">
                    {
                        allPosts.map((post) => (<Card key={post._id} post={post} />))
                    }
                </div>



            </div>

            <div className="homeRight">
                {
                    currentUser && (
                        <div className="messageSection">
                            <h2>Messages</h2>
                            <Chat />
                        </div>
                    )
                }

                {/* <div className="suggestionSection">
                        <h3>Suggestions</h3>
                    </div> */}
            </div>

        </div>
    )
}

export default Home
