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
import App from './pages/App.jsx'
import About from './pages/About.jsx'
import SignUp from './pages/SignUp.jsx'
import LogIn from './pages/LogIn.jsx'
import Studious from './pages/Studious.jsx'
import Cards from './pages/Cards.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} />
      <Route path="appstuff" element={<App />} />
      <Route path="about" element={<About />} />
      <Route path="login" element={<LogIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="cards" element={<Cards />} />
      <Route path="studious" element={<Studious />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);
