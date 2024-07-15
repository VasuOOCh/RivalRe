import React, { useEffect, useState } from 'react'
import './showStory.scss'
import axios from 'axios'
import Card from '../Card/Card'
import ImageSlider from '../ImageSlider/ImageSlider'
import User from '../User/User'
import { useSelector, useDispatch } from 'react-redux'
import { Vortex } from 'react-loader-spinner'

const ShowStory = ({ story }) => {
    const {currentUser} = useSelector((state) => state.user)
    const [userDetails, setUserDetails] = useState({})
    const [showStory, setShowStory] = useState(false);
    const [viewers, setViewers] = useState([]);
    const [loading,setLoading] = useState(false)

    // useEffect(() => {
    //     console.log(viewers);
    // },[viewers])

    useEffect(() => {
        async function getUsers() {
            try {
                if(story && story.userId === currentUser._id) {
                    const { data } = await axios.get('/stories/users/' + story._id)
                // console.log(data);
                setViewers(data)
                
                }
            } catch (error) {
                console.log(error);
            }
        }
        getUsers()
    }, [story])

    async function handleStory() {
        try {
            setShowStory(true);
            await axios.put('/stories/view/' + story._id)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (story) {
            try {
                
                async function fetchUser() {
                    setLoading(true)
                    const { data } = await axios.get('/users/' + story.userId)
                    // console.log(data);
                    setUserDetails(data)
                    setLoading(false)
                }
                fetchUser()
                
            } catch (error) {
                console.log(error);
            }
        }
    }, [story])

    return (
        <div className='showStory' onClick={handleStory}>
            {
                !loading ? (
                    <>
                    <img className='userImg' src={userDetails.avatar} alt="img" />
                    <span>{userDetails.username}</span>
                    </> ) : (
                        <Vortex
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="vortex-loading"
                        wrapperStyle={{}}
                        wrapperClass="vortex-wrapper"
                        colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
                        />
                    ) 
                
            }

            {
                showStory && (
                    <div className="storyMain">
                        <div className="storySubMain">
                            <div className='story'>
                                <div className="userInfo">
                                    <img className='selectedUserImg' src={userDetails.avatar} alt="image" />
                                    <span>{userDetails.username}</span>
                                </div>
                                <div className="showSlider">
                                <ImageSlider images={story.images} />
                                </div>
                                <div>
                                    {story.desc}
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setShowStory(false); }} className="cross">
                                    X
                                </button>
                            </div>
                            {
                                story.userId == currentUser._id && (
                                    <div className="viewers">
                                <h2>Seen by</h2>
                                <div className="viewedUser">
                                    {
                                        viewers?.map((user) => (
                                            <User user={user} key={user._id} />
                                        ))
                                    }
                                </div>
                            </div>
                                )
                            }
                        </div>
                    </div>
                )
            }
        </div>

    )
}

export default ShowStory
