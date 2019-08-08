import React from 'react'
import ThisWeekContext from '../ThisWeekContext'
import TokenService from '../services/token-service'
import { format } from 'date-fns'
import config from '../config'



class CalendarFormat extends React.Component {
    static contextType = ThisWeekContext

    //only load delete button for logged in users 
    renderDeleteButton() {
        if (TokenService.getAuthToken()) {
            return (
                <button className='delete-review-button' onClick={this.handleClickDelete}>Delete</button>
            )
        }
    }

    handleClickDelete = e => {
        e.preventDefault();
        const eventId = this.props.id
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
                window.location = '/events'
            })
            .catch(error => {
                console.error({ error })
            })
    }

    render() {
        const { id, weekday, title, event_url, event, event_date, event_img, event_type } = this.props
        return (
            <div className='calendar-table'>
                    <ul className='weekday'>{weekday}
                        <li key={id} className='event'>
                            <a href={event_url} className='event-link new-label' rel='noopener noreferrer' target='_blank'>{title}</a>
                            <img src={event_img} alt='event' className='event-pic' />
                            <span className='event-date'> {format(event_date, 'ddd MM/DD/YYYY')}</span>
                            <p>{event}</p>
                            <p>{event_type}</p>
                            {this.renderDeleteButton()}
                        </li>
                    </ul>
            </div>
        )
    }
}

export default CalendarFormat