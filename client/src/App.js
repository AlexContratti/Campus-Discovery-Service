import logo from './logo.svg';
import './App.css';
import React from "react"
import Homepage from './pages/Homepage.js';
import Config from './pages/Config.js';
import Events from './pages/Events.js';
import Start from './pages/Start.js';
import Login from './pages/Login.js';
import Registered from './pages/Registered.js'

import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<Homepage />}/>
        <Route path = "/config" element = {<Config />} />
        <Route path = "/events" element = {<Events />} />
        <Route path = "/start" element = {<Start />} />
        <Route path = "/config" element = {<Config />} />
        <Route path = "/login" element = {<Login />} />
        <Route path = "/registered" element = {<Registered />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
