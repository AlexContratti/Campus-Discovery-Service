import React, { Fragment, useEffect, useRef, useState } from 'react'
import {Link } from "react-router-dom";
import Sidebar from '../components/Sidebar';
import './Events.css';
import AddIcon from '@mui/icons-material/Add';
import Modal from "../components/Modal";
import AddEvent from "../components/AddEvent";
import DeleteIcon from '@mui/icons-material/Delete';
import {getInfo} from "../components/GlobalUser"
import Pagination from "../components/Pagination"
import EditIcon from '@mui/icons-material/Edit';
import Edit from '@mui/icons-material/Edit';

function Events() {
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDesModal, setShowDesModal] = useState(false);
    const [data, setData] = useState([]);   
    const eventtiles = useRef(null)

    const [eventName, setEventName] = useState("")
    const [location, setLocation] = useState("")
    const [dateTime, setDateTime] = useState("")
    const [desc, setDesc] = useState("")

    const [currPage, setCurrPage] = useState(1);
    const [postsPerPage] = useState(10);

    const indexOfLastPost = Math.min(currPage * postsPerPage, data.length);
    const indexOfFirstPost = Math.max(indexOfLastPost - postsPerPage, (currPage - 1) * postsPerPage);
    const currEvents = data.slice(indexOfFirstPost, indexOfLastPost);


    var modal = null
    useEffect( () => {
        fetch("http://localhost:3001/events")
            .then(res => res.json())
            .then(data => setData(data));
    }, []);

    const paginate = (pageNumber) => {
        setCurrPage(pageNumber)
    };

    const previousPage = () => {
        if (currPage !== 1) setCurrPage(currPage - 1);
    };

    const nextPage = () => {
        if (currPage != Math.ceil(data.length / postsPerPage)) setCurrPage(currPage + 1);
    };

    const handleAddEvent = async () => {
        setShowModal(false)
        let userInfo = await getInfo()
        const add = fetch("http://localhost:3001/createEvent", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                eventName: eventName,
                host: userInfo[1],
                location: location,
                dateTime: dateTime,
                description: desc,
            })
        }).then(console.log).catch(console.error)
        console.log(add)
    }

    const handleEventDelete = async (e) => {
        /* const user = await fetch("/users", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username:"Host",
            })
        }) */
        let event = ""
        const ev = await fetch("http://localhost:3001/event", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                eventName: e.target.id,
            })
        }).then(res => res.json()).then(data => event = data[0])
        let userInfo = await getInfo()

        console.log(userInfo[2], userInfo[1], event.host)
        if (userInfo[2] === "Organizer" || userInfo[1] === event.host) {
            const del = fetch("http://localhost:3001/deleteEvent", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    eventName: e.target.id,
                })
            }).then(console.log).catch(console.error)
        }
    }

    const handleEditEvent = async () => {
        try{
            console.log("handler")
            const edit = await fetch("http://localhost:3001/editEvent", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    eventName: eventName,
                    updates: {
                        location: location,
                        time: dateTime,
                        description: desc
                    }
                })
            })
            console.log("end")
            setShowEditModal(false);
        } catch(err){
            console.error()
        }
    }

    const modalHandler = (event) => {
        console.log(event.target.id)
        modal = document.getElementById(event.target.id + "-modal")
        modal.style.display = "block"
        document.getElementById(event.target.id+"-modal").show = true;
        //setShowDesModal(true);
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
                        <AddEvent  addEvent={handleAddEvent} eventName={eventName} setEventName={setEventName}
                            location={location} setLocation={setLocation} dateTime={dateTime} setDateTime={setDateTime}
                            desc={desc} setDesc={setDesc}/>
                    </Modal>
                    {/*<div className="delete-button" onClick={() => setShowModal(true)}>Delete</div>*/}
                </div>
                
                <div className="grid-container">
                    { currEvents === null ? "" : currEvents.map(event => (
                        
                        <section className='tile'>
                            <div className="card">
                                <h2>{event.name}</h2>
                                <p>{event.time}</p>
                                <p>{event.description}</p> 
                                <button className="button" type = "button" id = {event.name} onClick = {modalHandler}>Find Out More</button>{' '}
                                <button className="button" type = "button" id = {event.name} onClick = {handleEventDelete}>Delete</button>{' '}
                                <button className="edit-button" type="button"  onClick={() => setShowEditModal(true)}> <EditIcon/> </button>
                                <Modal title="Edit" show={showEditModal} setShow={setShowEditModal}>
                                    <AddEvent addEvent={handleEditEvent} eventName={eventName} setEventName={setEventName}
                                        location={location} setLocation={setLocation} dateTime={dateTime} setDateTime={setDateTime}
                                        desc={desc} setDesc={setDesc}/>
                                </Modal> 
                                    {/* <div onClick={handleEventDelete}>
                                        <DeleteIcon type="button" pointerEvents="none"></DeleteIcon>
                                    </div> */}
                    
                            </div>

                            {/* <Modal id = {event.name+"-modal"} show={showDesModal} setShow={setShowDesModal}>
                                <div className='des-modal-content'>
                                    <h2>{event.name}</h2>
                                    <p>Host: {event.host}</p>
                                    <p>Location: {event.location}</p>
                                    <p>Date&Time: {event.time}</p>
                                    <p>Description: {event.description}</p> 
                                </div>
                            </Modal>  */}

                            <div id={event.name+"-modal"} class="modal">
                                <div className="modal-content">
                                    <span className="close" onClick={close}>
                                        &times;
                                    </span>
                                    <div className='des-modal-content'>
                                        <h2>{event.name == null ? "No name" : event.name}</h2>
                                        <p>Host: {event.host == null ? "No host" : event.host}</p>
                                        <p>Location: {event.location == null ? "No location" : event.location}</p>
                                        <p>Date&Time: {event.time == null ? "No time" : event.time}</p>
                                        <p>Description: {event.description == null ? "No description" : event.description}</p> 
                                    </div>
                                </div>
                            </div>
                            
                        </section>
                        
                    ))}
                    
                </div>
                <Pagination className="pages" eventsPerPage={postsPerPage} totalEvents={data.length} paginate={paginate}
                    previousPage={previousPage} nextPage={nextPage}/>
            </div>
        </div>
    );
}

export default Events;