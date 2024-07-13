import React, { useEffect, useState } from 'react'
import './profileupdate.scss'
import CloudinaryUploadWidget from '../Upload Widget/Upload'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserStart, fetchUserFailure, fetchUserSuccess } from '../../Redux/userSlice';

const ProfileUpdate = ({ user }) => {
    const dispatch = useDispatch()
    const [images, setImages] = useState([]);
    const [username, setUsername] = useState('');
    const [updatedUserDetails,setUpdatedUserDetails] = useState({})

    useEffect(() => {
        if(username) {
            setUpdatedUserDetails((prev) => (
                {...prev, username}
            ))
        }if(images.length> 0) {
            setUpdatedUserDetails((prev) => (
                {...prev, avatar : images[0]}
            ))
        }
    }, [images,username])

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const {data} = await axios.put('/users/update/' + user._id, updatedUserDetails);
            // console.log(data);
            dispatch(fetchUserSuccess(data));
            setImages([])
            setUsername('')
        } catch (error) {
            console.log(error);
            dispatch(fetchUserFailure);
        }
        // console.log(images, username);
    }

    return (
        <div className="updateUser">
            <h2>Update User</h2>
            <form onSubmit={handleSubmit}>
                <div className="inputs">
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder={user.username} />
                    <CloudinaryUploadWidget text={"Update Avatar"} uwConfig={{
                        cloudName: "dzgqb4bb6",
                        uploadPreset: "rivalre",
                        multiple: false,
                        maxImageFileSize: 3000000,
                        folder: "rivalre_avatars"
                    }} setState={setImages} />
                </div>
                {
                    images.length > 0 && (
                        <div className="displayImage">
                            <img src={images[0]} alt="updatedImg" />
                        </div>
                    )
                }
                <button className='updateBtn' type='submit'>
                    Update
                </button>

            </form>
        </div>
    )
}

export default ProfileUpdate
