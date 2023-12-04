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

import Home from './Home.jsx'
import App from './App.jsx'
import About from './About.jsx'
import SignUp from './SignUp.jsx'
import Contact from './Contact.jsx'
import LogIn from './LogIn.jsx'

import Eli from './people/Eli.jsx'
import Bradley from './people/Bradley.jsx'
import Rayne from './people/Rayne.jsx'
import Anthony from './people/Anthony.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} />
      <Route path="appstuff" element={<App />} />
      <Route path="about" element={<About />} />
      <Route path="meet-us">
        <Route path="eli" element={<Eli />} />
        <Route path="bradley" element={<Bradley />} />
        <Route path="rayne" element={<Rayne />} />
        <Route path="anthony" element={<Anthony />} />
      </Route>
      <Route path="contact" element={<Contact />} />
      <Route path="login" element={<LogIn />} />
      <Route path="signup" element={<SignUp />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);
