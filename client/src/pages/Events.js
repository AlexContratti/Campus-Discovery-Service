import React, { Fragment, useEffect, useState } from 'react'
import {Link } from "react-router-dom";
import Sidebar from '../components/Sidebar';
import './Events.css';
import AddIcon from '@mui/icons-material/Add';
import Modal from "../components/Modal";
import AddEvent from "../components/AddEvent";

function Events() {
    const [showModal, setShowModal] = useState(false);

    const handleAddEvent = async () => {
        setShowModal(false)
      }

    return (
        <div className="events-container">
            <div className="nav-bar"><Sidebar/></div>
            <div className = "events">
                <div className="pageheader"> Events </div>
                <div className="tool-bar">
                    <div className="add-button" onClick={() => setShowModal(true)}> <AddIcon/> Add Event </div>
                    <Modal title="Add" show={showModal} setShow={setShowModal}>
                        <AddEvent addEvent={handleAddEvent}/>
                    </Modal>
                    {/*<div className="delete-button" onClick={() => setShowModal(true)}>Delete</div>*/}
                </div>
            </div>
        </div>
    );
}

export default Events;