import React from 'react'
import './Calendar.css'
import config from '../config'
import ThisWeekContext from '../ThisWeekContext'
import TokenService from '../services/token-service'
import { format } from 'date-fns'

class Calendar extends React.Component{

    state = {
        events: []
    }

    static contextType = ThisWeekContext;

    // Fetch events posted by the logged in user only
    componentDidMount() {
        const user = TokenService.getUserId()
        fetch(`${config.API_ENDPOINT}/api/myevents/${user}`, {
            headers: {
            'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res => {
                if (!res.ok) {
                    return Promise.reject(res.statusText);
                }
                return res.json();
            }).then(userEvents => {
                this.setState({
                    events: userEvents
                })
                console.log(this.state.events)
            }).catch(err =>
                console.error({ err }))
    };

    handleClickDelete = e => {
        e.preventDefault();
        const event = this.state.events
        const eventId = event.id
        console.log(eventId)
        fetch(config.API_ENDPOINT + `/api/events/${eventId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            }
        })

            .then(res => {
                if (!res.ok) return res.json().then(error => Promise.reject(error));
            })
            .then(() => {
                this.context.deleteEvent(eventId);
                window.location = '/api/events'
            })
            .catch(error => {
                console.error({ error })
            })
    }


    //only load delete button for logged in users 
    renderDeleteButton() {
        if (TokenService.getAuthToken()) {
            return (
                <button className='delete-review-button' onClick={this.handleClickDelete}>Delete</button>
            )
        }
    }
    
    render(){
        const events  = this.state.events
        console.log(events)
        return(
            <section className='calendar-page'>
                <h2>Your Current Events</h2>
                    <div className='calendar-table'>
                        {events.map(data =>
                        <div className='weekday' key={data.id}>{data.weekday}
                            <div className='event'><h3>Event</h3>
                                <a href={data.event_url} className='event-link' rel='noopener noreferrer' target='_blank'>{data.title}</a>
                                <span className='event-date'> {format(data.event_date, 'ddd MM/DD/YYYY')}</span>
                                <p>{data.event}</p>
                            {this.renderDeleteButton()}
                            <button className='edit-button'>Edit</button>
                            </div>
                    </div>
                        )}
                        {/* <div className='weekday'>Monday
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
                        </div> */}
                    </div>
                </section>
        )
    }
}

export default Calendar;