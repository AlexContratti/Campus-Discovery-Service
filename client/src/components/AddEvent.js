import React from 'react'
import './AddEvent.css'
import CheckIcon from '@mui/icons-material/Check';

export default function AddEvent ({addEvent}) {
    return (
      <div className="add-event-container">
        <div className='input-container'>
            <div className='input'>
                <div className='title'>Event Name:</div>
                <input type='text' className='input-text' autoFocus={true}></input>
            </div>
            <div className='input'>
                <div className='title'>Host:</div>
                <input type='text' className='input-text'></input>
            </div>
            <div className='input'>
                <div className='title'>Location:</div>
                <input type='text' className='input-text'></input>
            </div>
            <div className='input'>
                <div className='title'>Date/Time:</div>
                <input type='text' className='input-text'></input>
            </div>
            <div className='input'>
                <div className='title'>Description:</div>
                <input type='text' className='input-text'></input>
            </div>
        
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