import React from 'react'
import './CalendarFormat.css'
import ThisWeekContext from '../ThisWeekContext'
import TokenService from '../services/token-service'
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
                window.location = '/api/events'
            })
            .catch(error => {
                console.error({ error })
            })
    }

    render() {
        const { weekday, title, event_url, event, event_date } = this.props
        return (
            <>
                
            </>

        )
    }
}

export default CalendarFormat