import React, { Fragment, useEffect, useState } from 'react'
import {Link } from "react-router-dom";
import Sidebar from '../components/Sidebar';
import './Events.css';
import AddIcon from '@mui/icons-material/Add';
import Modal from "../components/Modal";
import AddEvent from "../components/AddEvent";

function Events() {
    const [showModal, setShowModal] = useState(false);
    var modal = false;

    const handleAddEvent = async () => {
        setShowModal(false)
    }

    const events = [
        ["title1", "host1", "descipriton1", "location1", "date/time1"],
        ["title2", "host1", "descipriton1", "location1", "date/time1"],
        ["title3", "host1", "descipriton1", "location1", "date/time1"],
        ["title4", "host1", "descipriton1", "location1", "date/time1"],
        ["title5", "host1", "descipriton1", "location1", "date/time1"],
        ["title6", "host1", "descipriton1", "location1", "date/time1"],
        ["title7", "host1", "descipriton1", "location1", "date/time1"],
        ["title8", "host1", "descipriton1", "location1", "date/time1"],
        ["title9", "host1", "descipriton1", "location1", "date/time1"],
        ["title10", "host1", "descipriton1", "location1", "date/time1"],
        ["title11", "host1", "descipriton1", "location1", "date/time1"],
        ["title12", "host1", "descipriton1", "location1", "date/time1"],
        ["title13", "host1", "descipriton1", "location1", "date/time1"],
        ["title14", "host1", "descipriton1", "location1", "date/time1"],
        ["title15", "host1", "descipriton1", "location1", "date/time1"],
        ["title16", "host1", "descipriton1", "location1", "date/time1"]
    ]

    const modalHandler = (event) => {
        console.log(event.target.id)
        modal = document.getElementById(event.target.id + "-modal")
        modal.style.display = "block"
    }

    const close = (event) => {
        modal.style.display = "none"
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
                <div className="grid-container">
                    {events.map(event => {
                        return(
                            <section>
                                <div className="card">
                                    <h5>{event[0]}</h5>
                                    <p>{event[1]}</p>
                                    <p>{event[2]}</p>
                                    <p>{event[3]}</p>
                                    <p>{event[4]}</p>
                                    <button type = "button" id = {event[0]} onClick = {modalHandler}>Find Out More</button>{' '}
                                </div>
                                <div id={event[0]+"-modal"} class="modal">
                                    <div className="modal-content">
                                        <span className="close" onClick={close}>
                                            &times;
                                        </span>
                                        <Modal event = {event}/>
                                    </div>
                                </div>
                            </section>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default Events;