import './App.css'

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Layout from './Pages/Layout/Layout';
import Home from './Pages/Home/Home';
import Signin from './Pages/Signin/Signin';
import axios from 'axios'

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
