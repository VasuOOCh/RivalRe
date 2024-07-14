import './App.css'

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import {Layout,AuthLayout} from './Pages/Layout/Layout';
import Home from './Pages/Home/Home';
import Signin from './Pages/Signin/Signin';
import axios from 'axios'
import ShowPost from './Pages/ShowPost/ShowPost';
import Profile from './Pages/Profile/Profile';

const router = createBrowserRouter([
  {
    path : '/',
    element : <Layout/>,
    children : [
      {
        path : '',
        element : (<Home />)
      },
      {
        path : '/signin',
        element : <Signin />
      },
      {
        path : '/post/:postId',
        element : <ShowPost />
      }
    ]
  },
  {
    path : '/',
    element : <AuthLayout/>,
    children : [
      {
        path : '/profile/:userId',
        element : <Profile />
      }
    ]
  }
])


function App() {
  axios.defaults.baseURL = 'http://localhost:3000/api';
  axios.defaults.withCredentials = true;

  return (
    <RouterProvider router={router} />
  )
}

export default App
