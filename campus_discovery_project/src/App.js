import logo from './logo.svg';
import './App.css';
import React from "react"
import Homepage from './Homepage.js';
import Config from './Config.js';
import Events from './Events.js';
import Start from './Start.js';
import Login from './Login.js';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
