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
import SignUp from './pages/SignUp.jsx'
import LogIn from './pages/LogIn.jsx'
import EditSet from './pages/EditSet.jsx'
import ViewSet from './pages/ViewSet.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} /> 
      <Route path="login" element={<LogIn />} />
      <Route path="signup" element={<SignUp />} />
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
