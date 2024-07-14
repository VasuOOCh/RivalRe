import React, { useEffect, useState } from 'react'
import CloudinaryUploadWidget from '../Upload Widget/Upload'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './addpost.scss'
import AddReaction from '@mui/icons-material/AddReaction';
import SendIcon from '@mui/icons-material/Send';
import { useSelector, useDispatch } from 'react-redux'
import EmojiPicker from 'emoji-picker-react';


const AddPost = ({setAllPosts}) => {
    const [openEmoji,setOpenEmoji] = useState(false)
    const { currentUser } = useSelector((state) => state.user)
    const [postDetails, setPostDetails] = useState({
        desc : ''
    });
    const [images, setImages] = useState([]);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const { data } = await axios.post('/posts', {
                ...postDetails, images
            })
            setPostDetails({
                desc : ''
            })
            setImages([]);
            setOpenEmoji(false);
            setAllPosts((prev) => (
                [...prev, data]
            ))

        } catch (error) {
            console.log(error.response.data);
        }
    }
    const handleInput = (e) => {
        setPostDetails((prev) => (
            { ...prev, [e.target.name]: e.target.value }
        ))
    }

    const removeImg = (index) => {
        const updatedImages = [...images];
        updatedImages.splice(index,1)
        setImages(updatedImages)
    }

    return (
        <div className="addPost">
            <form onSubmit={handleSubmit}>
                <div className="inputs">

                    <div className="mainUpload">
                        <img src={currentUser.avatar} alt="user" />
                        <input required accept='emojis' value={postDetails.desc} type="text" onChange={handleInput} name='desc' placeholder='Whats on your mind' />
                        <button type='submit' >
                            <SendIcon />
                        </button>
                    </div>

                    {
                        images.length > 0 &&
                        <div className="viewImages">
                            {images.map((image, index) => (
                                <div className='showImg' key={index}>
                                    <img src={image} alt="img" />
                                    <div className="cross" onClick={() => removeImg(index)}>
                                        X
                                    </div>
                                </div>
                            ))}
                        </div>
                    }

                    <div className="uploads">
                        <CloudinaryUploadWidget uwConfig={{
                            cloudName: "dzgqb4bb6",
                            uploadPreset: "rivalre",
                            multiple: true,
                            maxImageFileSize: 3000000,
                            folder: "rivalre_posts"
                        }} setState={setImages} />
                        <div className="emoji"  onClick={() => setOpenEmoji(true)}>
                            <AddReaction />
                            Emoji
                        </div>

                    </div>

                    {
                        openEmoji && 
                        <div className='emojiSection'>
                            <EmojiPicker onEmojiClick={
                                (eomjiData) => {
                                    
                                    setPostDetails((prev) => (
                                        {...prev, desc : prev.desc + eomjiData.emoji}
                                    ))
                                }
                            } />
                            <div className="exitEmoji" onClick={() => setOpenEmoji(false)}>
                                X
                            </div>
                        </div>
                    }
                </div>

            </form>
        </div>
    )
}

export default AddPost
