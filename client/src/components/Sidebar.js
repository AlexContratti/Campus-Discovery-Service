import React, {useState, useEffect, useRef} from "react"
import './Sidebar.css'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import EventIcon from '@mui/icons-material/Event';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import {getInfo} from "../components/GlobalUser"


export default function Sidebar () {
  const navigate = useNavigate()
  const [type, setType] = useState("")
  const handleExitClick = () => {navigate('/')}

  useEffect(() => {
    //setType(localStorage.getItem("type"))
    getInfo().then(res => setType(res[2]));
    // console.log(localStorage.getItem("username"))
    // console.log(type)
  });

  

  return (
    <div className="nav-bar-container">
      <div className="menu-container">
        <div className="header">DiscoverGT</div>
        <ul className="menu">
          <li className="menu-item"><EventIcon className="icon"/> All Events</li>
          <li className="menu-item"><EventAvailableIcon className="icon"/> Registered </li>
          <li className="menu-item"><PersonOutlineIcon className="icon"/> Account </li>
          <li className="menu-item" onClick={handleExitClick}><LogoutIcon className="icon"/> Exit </li>
        </ul>
      </div>
      <div className="profile"><AccountCircleIcon className="icon"/> {type} </div>
    </div>
  )
}