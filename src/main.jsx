import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Router,
  Route,
}from "react-router-dom";

import Layout from './Layout.jsx';
import Home from './components/Home/Home.jsx';
import About from './components/About/About.jsx';
import Contact from './components/Contact/Contact.jsx';
import Student from './components/Students/StudentsLandingPage.jsx';
import Skills from "./components/Students/Skills";
import Activities from "./components/Students/Activities.jsx";
import Certificates from "./components/Students/certificates.jsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="skills" element={<Skills/>} />
      <Route path="student" element={<Student/>} />
      <Route path="activities" element={<Activities/>} />
      <Route path="certificates" element={<Certificates/>} />
    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
