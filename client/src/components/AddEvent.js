import React, {useEffect, useState} from 'react'
import './AddEvent.css'
import CheckIcon from '@mui/icons-material/Check';

function AddEvent ({addEvent, eventName, setEventName, location, setLocation, dateTime, setDateTime, desc, setDesc, maximum_capacity, setMaxCapacity,
    inviteOnly, setInviteOnly}) {
    useEffect(() => {
        setEventName("");
        setLocation("");
        setDateTime("");
        setDesc("");
        setMaxCapacity("");
        setInviteOnly("");
    }, [])
    
    return (
      <div className="add-event-container">
        <div className='input-container'>
            <div className='input'>
                <div className='title'>Event Name:</div>
                <input type='text' id="eventName" className='input-text' autoFocus={true} onChange={e => setEventName(e.target.value)}></input>
            </div>
{/*             <div className='input'>
                <div className='title'>Host:</div>
                <input type='text' id="host" className='input-text'></input>
            </div> */}
            <div className='input'>
                <div className='title'>Location:</div>
                <input type='text' id="location" className='input-text'  onChange={e => setLocation(e.target.value)}></input>
            </div>
            <div className='input'>
                <div className='title'>Date/Time:</div>
                <input type='text' id="dateTime" className='input-text' onChange={e => setDateTime(e.target.value)}></input>
            </div>
            <div className='input'>
                <div className='title'>Description:</div>
                <input type='text' id="description" className='input-text' onChange={e => setDesc(e.target.value)}></input>
            </div>
            <div className='input'>
                <div className='title'>Maximum Capacity</div>
                <input type='text' id="maximum_capacity" className='input-text' onChange={e => setMaxCapacity(e.target.value)}></input>
            </div>
            <div className="label"> Invite-Only: </div>
            <label>
                <select className="select" onChange={e => setInviteOnly(e.target.value)}>
                    <option value = "Yes">Yes</option>
                    <option value = "No">No</option>
                </select>
            </label>
        
        <div className="save-button" onClick={addEvent}> <CheckIcon/> Save & Publish </div>
            
        </div>
        {/*
        <div className="buttons">
          <div className="button" onClick={deleteAccount}>Delete Account</div>
          <div className="button" onClick={deleteApplication}>Delete Application</div>
        </div>
        */}
      </div>
    )
}

export default AddEvent;