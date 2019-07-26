import React from 'react'
import './Calendar.css'

class Calendar extends React.Component{
    render(){
        return(
            <section className='calendar-page'>
                <h2>Your Current Events</h2>
                    <div className='calendar-table'>
                        <div className='weekday'>Sunday
                            <div className='event'><h3>Event</h3>
                            <button className='delete-button'>Delete</button>
                            <button className='edit-button'>Edit</button>
                            </div>
                        </div>
                        <div className='weekday'>Monday
                            <div className='event'><h3>Event</h3>
                            <button className='delete-button'>Delete</button>
                            <button className='edit-button'>Edit</button>
                            </div>
                        </div>
                        <div className='weekday'>Tuesday
                            <div className='event'><h3>Event</h3>
                            <button className='delete-button'>Delete</button>
                            <button className='edit-button'>Edit</button>
                            </div>
                        </div>
                        <div className='weekday'>Wednesday
                            <div className='event'><h3>Event</h3>
                            <button className='delete-button'>Delete</button>
                            <button className='edit-button'>Edit</button>
                            </div>
                        </div>
                        <div className='weekday'>Thursday
                            <div className='event'><h3>Event</h3>
                            <button className='delete-button'>Delete</button>
                            <button className='edit-button'>Edit</button>
                            </div>
                        </div>
                        <div className='weekday'>Friday
                            <div className='event'><h3>Event</h3>
                            <button className='delete-button'>Delete</button>
                            <button className='edit-button'>Edit</button>
                            </div>
                        </div>
                        <div className='weekday'>Saturday
                            <div className='event'><h3>Event</h3>
                            <button className='delete-button'>Delete</button>
                            <button className='edit-button'>Edit</button>
                            </div>
                        </div>
                        <div className='weekday'>Notes:</div>
                    </div>
                </section>
        )
    }
}

export default Calendar;