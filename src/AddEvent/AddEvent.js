import React from 'react'
import { format } from 'date-fns'
import './AddEvent.css'

export default function AddEvent(props) {
    return (
        //Hidden form to get the values of the event submit 
        <section className='add-event-page'>
            <form className='add-event-form' onSubmit={(e) => props.onAddEvent(e)}>
                <input type='hidden' id='weekday' name='weekday' value={format(props.weekday, 'dddd')} />
                <input type='hidden' id='title' name='title' value={props.title} />
                <input type='hidden' id='event_url' name='event_url' value={props.event_url} />
                <input type='hidden' id='event_type' name='event_type' value={props.event_type} />
                <input type='hidden' id='event' name='event' value={props.event} />
                <input type='hidden' id='event_date' name='event_date' value={props.event_date} />
                <input type='hidden' id='event_img' name='event_img' value={props.event_img}/>
                <button type='submit' className='add-event-button'>Add Event</button>
            </form>
        </section>
    )
}


