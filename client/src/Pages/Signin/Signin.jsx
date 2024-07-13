import React, { useState } from 'react'
import "./signin.scss"
import GoogleIcon from '@mui/icons-material/Google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserStart,fetchUserFailure,fetchUserSuccess,followUser } from '../../Redux/userSlice';

const Signin = () => {
    const [error,setError] = useState('')
    const [success,setSuccess] = useState('')
    const [signInInfo,setSignInInfo] = useState({})
    const [signUpInfo,setSignUpInfo] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch()
    

    const signInInputHandler = (e) => {
        setSignInInfo((prev) => (
            {...prev, [e.target.name] : e.target.value}
        ))
    }

    const signUpInputHandler = (e) => {
        setSignUpInfo((prev) => (
            {...prev, [e.target.name] : e.target.value}
        ))
    }

    const signInHandler = async (e) => {
        setError('')
        setSuccess('')
        try {
            dispatch(fetchUserStart())
            e.preventDefault();
            const res = await axios.post('/auth/signin', signInInfo);
            // console.log(res.data);
            dispatch(fetchUserSuccess(res.data))
            navigate('/')

        } catch (error) {
           console.log(error); 
           dispatch(fetchUserFailure())
           setError(error.response.data.message)
        }
    }
    const signUpHandler = async (e) => {
        setError('')
        setSuccess('')
        try {
            e.preventDefault();
            const res = await axios.post('/auth/signup', signUpInfo);
            // console.log(res.data);
            setSuccess("User created successfully ! Sign in to continue")

        } catch (error) {
           console.log(error); 
           setError(error.response.data.message)
        }
    }


  return (
    <div className="signIn">
        {
            error && <div className='error'>{error}</div>
        }
        {
            success && <div className='success'>{success}</div>
        }
        <div className="signInWrapper">
            
            <form className='signInForm' onSubmit={signInHandler}>
            <h1>SignIn to Rival.Re</h1>
                <input name='username' type="text" onChange={signInInputHandler} placeholder='Username'/>
                <input name='password' onChange={signInInputHandler} type="password" placeholder='Password' />
                <button>Sign In</button>
            </form>

            <div className="or">
                OR
            </div>

            <button className='google'>
                <GoogleIcon />
                <span>Google</span>
            </button>

            {/* <div className="or">
                OR
            </div> */}
            
            <form className='signUpForm' onSubmit={signUpHandler}>
            <h2>New to Rival.Re ? SignUp here</h2>
                <input type="text" name='username' onChange={signUpInputHandler} placeholder='Username'/>
                <input type="email" name='email' onChange={signUpInputHandler}  placeholder='Email'/>
                <input type="password" name='password' onChange={signUpInputHandler}  placeholder='Password' />
                <button>Sign Up</button>
            </form>
        </div>
    </div>
  )
}

export default Signin
