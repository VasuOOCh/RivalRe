import React, { useState } from 'react'
import "./addstory.scss"
import CloudinaryUploadWidget from '../Upload Widget/Upload'
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'


const AddStory = ({ setShowAddStory, setStories ,setStoryAdded}) => {
    const { currentUser } = useSelector((state) => state.user);
    const [images, setImages] = useState([]);
    const [desc, setDesc] = useState('');
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            if (images.length > 0 && desc) {
                const { data } = await axios.post('/stories', {
                    images, desc,userId : currentUser._id
                })
                // console.log(data);
                setImages([])
                setDesc('')
                setShowAddStory(false);
                setStoryAdded(true)
                setStories((prev) => [...prev, data]);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='addStory'>
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <h2>Add a story</h2>
                    <CloudinaryUploadWidget text={"Add Photos"} uwConfig={{
                        cloudName: "dzgqb4bb6",
                        uploadPreset: "rivalre",
                        multiple: true,
                        maxImageFileSize: 3000000,
                        folder: "rivalre_avatars"
                    }} setState={setImages} />

                    {
                        images.length > 0 && (
                            <div className="showPhotos">
                                {
                                    images.map((image, index) => (
                                        <img key={index} src={image} />
                                    ))
                                }
                            </div>
                        )
                    }

                    <div className="inputFields">
                        <input required value={desc} onChange={(e) => setDesc(e.target.value)} type="text" name="desc" placeholder='Description' />
                        <button type='submit'>
                            <SendIcon />
                        </button>
                    </div>
                    <div className="info">
                        <p>* The story will get auto deleted after 12 hrs <br /> & <br /> You cannot delete the story once you add it</p>

                        
                        
                    </div>

                </form>

                <div className="crossBtn" onClick={() => setShowAddStory(false)}>
                    <CancelIcon />
                </div>
            </div>
        </div>
    )
}

export default AddStory
