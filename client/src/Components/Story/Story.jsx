import React, { useEffect, useState } from 'react'
import "./story.scss"
import CloudinaryUploadWidget from '../Upload Widget/Upload';
import axios from 'axios';
import AddStory from '../Add Story/AddStory';
import { useSelector, useDispatch } from 'react-redux'
import ShowStory from '../ShowStory/ShowStory';

const Story = () => {
    const { currentUser } = useSelector((state) => state.user)
    const [stories, setStories] = useState([]);
    const [storyAdded, setStoryAdded] = useState(null);
    const [showAddStory, setShowAddStory] = useState(false);

    useEffect(() => {
        try {
            async function fetchStories() {
                const { data } = await axios.get('/stories');
                
                if (data.some((story) => story.userId == currentUser._id)) {
                    setStoryAdded(true)
                } else {
                    setStoryAdded(false)
                }
                // console.log(data);
                setStories(data)
            }
            fetchStories()
        } catch (error) {
            console.log(error);
        }
    }, [])


    return (
        <div className="storySection">
            <h2>Stories</h2>
            <div className="subStorySection">
                <div className="myStorySection">
                    {
                        storyAdded ? (
                            <div className="userStory">
                                <ShowStory story={
                                    stories.filter((story) => story.userId == currentUser._id)[0]
                                } />
                            </div>
                        ) : (
                            <button onClick={() => setShowAddStory(true)} className="addStoryBtn">
                                Add a story
                            </button>
                        )
                    }

                </div>
                <div className="line"></div>
                <div className="otherStories">
                    {stories.filter((story) => story.userId != currentUser._id).map((story) => (
                        <ShowStory key={story._id} story={story} />
                    ))}
                </div>

                {
                    showAddStory && (
                        <div className="addStoryBox">
                            <AddStory setStoryAdded={setStoryAdded} setStories={setStories} setShowAddStory={setShowAddStory} />
                        </div>
                    )
                }
            </div>
        </div>


    )
}

export default Story
