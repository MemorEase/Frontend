import React from 'react'
import ReactDOM from 'react-dom/client'
//import './index.css'

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';

import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import SignUp from './pages/SignUp.jsx'
import LogIn from './pages/LogIn.jsx'
import Studious from './pages/Studious.jsx'
import Sets from './pages/Sets.jsx'
import AddSet from './pages/AddSet.jsx'
import EditSet from './pages/EditSet.jsx'
import ViewSet from './pages/ViewSet.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} /> 
      <Route path="about" element={<About />} />
      <Route path="login" element={<LogIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="sets" element={<Sets />} />
      <Route path="studious" element={<Studious />} />
      <Route path="addset" element={<AddSet />} />
      <Route path="/edit/:id" element={<EditSet />} />
      <Route path="/view/:id" element={<ViewSet />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);
