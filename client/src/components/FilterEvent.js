import React, {useEffect, useState} from 'react'
import './FilterEvent.css'
import CheckIcon from '@mui/icons-material/Check';

function FilterEvent ({filterEvent, eventName, setEventName, location, setLocation, dateTime, setDateTime, desc, setDesc, maximum_capacity, setMaxCapacity,
    inviteOnly, setInviteOnly, endDateTime, setEndDateTime}) {
    useEffect(() => {
        setDateTime("");
        setEventName("");
        setHostName("");
    }, [])
    
    return (
      <div className="filter-event-container">
        <div className='input-container'>
        <div className='input'>
                <div className='title'>Date/Time:</div>
                <input type='text' id="dateTime" className='input-text' onChange={e => setDateTime(e.target.value)}></input>
            </div>
            <div className='input'>
                <div className='title'>Event Name:</div>
                <input type='text' id="eventName" className='input-text' autoFocus={true} onChange={e => setEventName(e.target.value)}></input>
            </div>
            <div className='input'>
                <div className='title'>Host Name:</div>
                <input type='text' id="hostName" className='input-text' autoFocus={true} onChange={e => setHostName(e.target.value)}></input>
            </div>
{/*             <div className='input'>
                <div className='title'>Host:</div>
                <input type='text' id="host" className='input-text'></input>
            </div> */}
        
        <div className="save-button" onClick={filterEvent}> <CheckIcon/> Filter</div>
            
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

export default FilterEvent;