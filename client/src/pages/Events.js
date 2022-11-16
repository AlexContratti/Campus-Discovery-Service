import React, { Fragment, useEffect, useRef, useState } from 'react'
import {isRouteErrorResponse, Link, Navigate, useNavigate } from "react-router-dom";
import Sidebar from '../components/Sidebar';
import './Events.css';
import AddIcon from '@mui/icons-material/Add';
import Modal from "../components/Modal";
import AddEvent from "../components/AddEvent";
import DeleteIcon from '@mui/icons-material/Delete';
import Pagination from "../components/Pagination"
import EditIcon from '@mui/icons-material/Edit';
import Edit from '@mui/icons-material/Edit';

function Events() {
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showRSVPModal, setShowRSVPModal] = useState(false);
    const [data, setData] = useState([]);
    const [changed, setChanged] = useState(0)   
    const eventtiles = useRef(null)

    const [eventName, setEventName] = useState("")
    const [location, setLocation] = useState("")
    const [dateTime, setDateTime] = useState("")
    const [desc, setDesc] = useState("")
    const [max_capacity, setMaxCapacity] = useState("")
    const [rsvp, setRSVP] = useState({
        "Yes": [],
        "Maybe": [],
        "No": []
    })
    const [removal, setRemoval] = useState("")
    const [addition, setAddition] = useState("")
    const [inviteOnly, setInviteOnly] = useState("No")

    const [currPage, setCurrPage] = useState(1);
    const [postsPerPage] = useState(10);

    const indexOfLastPost = Math.min(currPage * postsPerPage, data.length);
    const indexOfFirstPost = Math.max(indexOfLastPost - postsPerPage, (currPage - 1) * postsPerPage);
    const currEvents = data.slice(indexOfFirstPost, indexOfLastPost);

    const navigate = useNavigate()


    var modal = null
    useEffect(() => {
        setTimeout(() => {
            if (localStorage.getItem("name") === null) {
                navigate("/")
            }
        }, 1000)
    }, [])
    useEffect( () => {
        fetch("http://localhost:3001/events")
            .then(res => res.json())
            .then(data => setData(data));
    }, [changed]);

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
        const add = await fetch("http://localhost:3001/createEvent", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                eventName: eventName,
                host: localStorage.getItem("name"),
                location: location,
                dateTime: dateTime,
                description: desc,
                max_capacity: max_capacity,
                rsvp: rsvp,
                inviteOnly: inviteOnly,
                inviteList: []
            })
        }).then(console.log).catch(console.error)
        console.log(add)
        setChanged(changed + 1)
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

        if (localStorage.getItem("type") === "Organizer" || localStorage.getItem("name") === event.host) {
            const del = await fetch("http://localhost:3001/deleteEvent", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    eventName: e.target.id,
                })
            }).then(console.log).catch(console.error)
            setChanged(changed + 1)
        } else {
            alert("You are not an organizer nor the event host!");
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
                        description: desc,
                        max_capacity: max_capacity,
                        inviteOnly: inviteOnly
                    }
                })
            })
            setChanged(changed + 1)
            console.log("end")
            setShowEditModal(false);
            alert("Edits made!")
        } catch(err){
            console.error()
        }
    }
    const handleRSVP = async (e) => {
        try {
            let event;
            await fetch("http://localhost:3001/event", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    eventName: e.target.id.substring(0, e.target.id.length - 4),
                })
            }).then(response => response.json()).then(data => event = data[0])
            console.log(event)

            let op = e.target.id.substring(e.target.id.length - 3)
            let name = localStorage.getItem("name")
            console.log(op)
            if (op == "Yes") {
                if (event.rsvp.Yes.includes(name)) {
                    alert("Already RSVP-ed!");
                    return;
                }
                if (event.rsvp.Yes.length == event.max_capacity) {
                    alert("Event at max capacity!");
                    return;
                }
                let index = event.rsvp.Maybe.indexOf(name)
                if (index > -1) {
                    event.rsvp.Maybe.splice(index, 1)
                }
                index = event.rsvp.No.indexOf(name)
                if (index > -1) {
                    event.rsvp.No.splice(index, 1)
                }
                event.rsvp.Yes.push(name)
            } else if (op == "May") {
                if (event.rsvp.Maybe.includes(name)) {
                    alert("Already RSVP-ed!");
                    return;
                }
                let index = event.rsvp.Yes.indexOf(name)
                if (index > -1) {
                    event.rsvp.Yes.splice(index, 1)
                    console.log(event.rsvp.Yes)
                }
                index = event.rsvp.No.indexOf(name)
                if (index > -1) {
                    event.rsvp.No.splice(index, 1)
                }
                event.rsvp.Maybe.push(name)
            } else {
                if (event.rsvp.No.includes(name)) {
                    alert("Already RSVP-ed!");
                    return;
                }
                let index = event.rsvp.Yes.indexOf(name)
                if (index > -1) {
                    event.rsvp.Yes.splice(index, 1)
                }
                index = event.rsvp.Maybe.indexOf(name)
                if (index > -1) {
                    event.rsvp.Maybe.splice(index, 1)
                }
                event.rsvp.No.push(name)
            }
            console.log(event.rsvp)

            const edit = await fetch("http://localhost:3001/editEvent", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    eventName: e.target.id.substring(0, e.target.id.length - 4),
                    updates: {
                        rsvp: event.rsvp
                    }
                })
            })
            setChanged(changed + 1)
            console.log("end")
            setShowEditModal(false);
            alert("RSVP Successful!")
        } catch (err) {
            console.error()
        }
    }

    const handleRemove = async (e) => {
        let event;
        await fetch("http://localhost:3001/event", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                eventName: e.target.id,
            })
        }).then(response => response.json()).then(data => event = data[0])
        console.log(event)

        let index = event.rsvp.Yes.indexOf(removal)
        if (index <= -1) {
            alert("Person not found in RSVP list!")
            return;
        }
        event.rsvp.Yes.splice(index, 1)
        const edit = await fetch("http://localhost:3001/editEvent", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                eventName: e.target.id,
                updates: {
                    rsvp: event.rsvp
                }
            })
        })
        setChanged(changed + 1)
    }

    const handleAddition = async(e) => {
        let event;
        await fetch("http://localhost:3001/event", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                eventName: e.target.id,
            })
        }).then(response => response.json()).then(data => event = data[0])
        console.log(event)

        let index = event.inviteList.indexOf(removal)
        if (index > -1) {
            alert("Person already in the invite list!")
            return;
        }

        event.inviteList.push(addition)

        const edit = await fetch("http://localhost:3001/editEvent", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                eventName: e.target.id,
                updates: {
                    inviteList: event.inviteList
                }
            })
        })
        setChanged(changed + 1)
    }

    const modalHandler = (event) => {
        console.log(event.target.id)
        modal = document.getElementById(event.target.id + "-modal")
        modal.style.display = "block"
        document.getElementById(event.target.id+"-modal").show = true;
        //setShowDesModal(true);
    }

    const rsvpModalHandler = (event) => {
        console.log(event.target.id)
        modal = document.getElementById(event.target.id + "-rsvp")
        modal.style.display = "block"
        document.getElementById(event.target.id+"-rsvp").show = true;
        //setShowDesModal(true);
    }

    const adminModalHandler = (event) => {
        console.log(event.target.id)
        modal = document.getElementById(event.target.id + "-admin")
        modal.style.display = "block"
        document.getElementById(event.target.id+"-admin").show = true;
    }

    const close = (event) => {
        modal = document.getElementById(event.target.id)
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
                            desc={desc} setDesc={setDesc} max_capacity={max_capacity} setMaxCapacity={setMaxCapacity} rsvp={rsvp}
                            setRSVP = {setRSVP} inviteOnly={inviteOnly} setInviteOnly={setInviteOnly}/>
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
                                        desc={desc} setDesc={setDesc} max_capacity={max_capacity} setMaxCapacity={setMaxCapacity} rsvp={rsvp}
                                        setRSVP = {setRSVP} inviteOnly={inviteOnly} setInviteOnly={setInviteOnly}/>
                                </Modal> 
                                    {/* <div onClick={handleEventDelete}>
                                        <DeleteIcon type="button" pointerEvents="none"></DeleteIcon>
                                    </div> */}
                                {event.inviteOnly == null || event.host == localStorage.getItem("name") ||
                                    ((event.inviteOnly == "No") || (event.inviteList.includes(localStorage.getItem("name")))) ?
                                    <button className="button" type ="button" id={event.name} onClick ={rsvpModalHandler}>RSVP</button> : ""}
                                {localStorage.getItem("name") != event.host ? "" :
                                    <button className="button" type = "button" id = {event.name} onClick={adminModalHandler}>Manage RSVP List</button>
                                }
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
                            <div id={event.name+"-rsvp"} class="modal">
                                <div className="modal-content">
                                    <span className="close" id={event.name+"-rsvp"} onClick={close}>
                                        &times;
                                    </span>
                                    <div className='des-modal-content'>
                                        <button className="button" type="button" id={event.name+"-Yes"} onClick={handleRSVP}>Will Attend</button>{' '}
                                        <button className="button" type="button" id={event.name+"-May"} onClick={handleRSVP}>Maybe</button>{' '}
                                        <button className="button" type="button" id={event.name+"-Noo"} onClick={handleRSVP}>Will Not Attend</button>
                                    </div>
                                </div>
                            </div>

                            <div id={event.name+"-admin"} class="modal">
                                <div className="modal-content">
                                    <span className="close" id={event.name+"-admin"} onClick={close}>
                                        &times;
                                    </span>
                                    <div className='des-modal-content'>
                                        <h4>Current RSVP List</h4>
                                        {event.rsvp == null ? "None" : (
                                            <section>
                                                {event.rsvp.Yes == null ? "" : event.rsvp.Yes.map(p => <ul>{p}</ul>)}
                                            </section>
                                        )}
                                        <h4>Enter name you would like to remove:</h4>
                                        <input type='text' id="removal" className='input-text'  onChange={e => setRemoval(e.target.value)}></input>
                                        <div className="save-button" id={event.name} onClick={handleRemove}>Submit </div>
                                        {event.inviteOnly === "Yes" ? 
                                        <section>
                                            <h4>Current Invite List</h4>
                                            {event.inviteList == null ? "None" : (
                                                <section>
                                                    {event.inviteList.map(p => <ul>{p}</ul>)}
                                                </section>
                                            )}
                                            <h4>Enter name you would like to add:</h4>
                                            <input type='text' id="addition" className='input-text'  onChange={e => setAddition(e.target.value)}></input>
                                            <div className="save-button" id={event.name} onClick={handleAddition}>Submit </div>
                                        </section> : ""}
                                    </div>
                                </div>
                            </div>

                            <div id={event.name+"-modal"} class="modal">
                                <div className="modal-content">
                                    <span className="close" id={event.name+"-modal"} onClick={close}>
                                        &times;
                                    </span>
                                    <div className='des-modal-content'>
                                        <h2>{event.name == null ? "No name" : event.name}</h2>
                                        <p>Host: {event.host == null ? "No host" : event.host}</p>
                                        <p>Location: {event.location == null ? "No location" : event.location}</p>
                                        <p>Date&Time: {event.time == null ? "No time" : event.time}</p>
                                        <p>Description: {event.description == null ? "No description" : event.description}</p> 
                                        <p>Maximum Capacity: {event.max_capacity == null ? "None" : event.max_capacity}</p>
                                        <p>Current Capacity: {(event.rsvp === undefined || event.rsvp.Yes === undefined) ? 0 + "/" + event.max_capacity : event.rsvp.Yes.length + "/" + event.max_capacity}</p>
                                        <p>RSVP List: </p>
                                        {event.rsvp == undefined ? "None" : (
                                            <section>
                                                <h5>Will Attend:</h5>
                                                {event.rsvp.Yes === undefined ? "" : event.rsvp.Yes.map(p => <ul>{p}</ul>)}
                                                <h5>Maybe</h5>
                                                {event.rsvp.Maybe === undefined ? "" : event.rsvp.Maybe.map(p => <ul>{p}</ul>)}
                                                <h5>Will Not</h5>
                                                {event.rsvp.No === undefined ? "" : event.rsvp.No.map(p => <ul>{p}</ul>)}
                                            </section>
                                        )}
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