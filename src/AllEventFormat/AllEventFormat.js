import React from 'react'
import ThisWeekContext from '../ThisWeekContext'
import TokenService from '../services/token-service'
import EventsApiService from '../services/events-api-service'
import { format } from 'date-fns'
import AddEvent from '../AddEvent/AddEvent'

class AllEventFormat extends React.Component {
    static contextType = ThisWeekContext

    handleEventSubmit = ev => {
        ev.preventDefault();
        this.setState({ error: null })
        const { weekday, title, event_url, event, event_date, event_img, event_type } = ev.target

        EventsApiService.postEvent({
            user_id: TokenService.getUserId(),
            weekday: weekday.value,
            title: title.value,
            event_url: event_url.value,
            event: event.value,
            event_type: event_type.value,
            event_date: event_date.value,
            event_img: event_img.value
        })
            .then(() =>
                weekday.value = '',
                title.value = '',
                event_url.value = '',
                event.value = '',
                event_type.value = '',
                event_date.value = '',
                event_img.value = ''
            )
            .catch(res => {
                this.setState({ error: res.error })
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
                            <AddEvent
                                    title={title}
                                    weekday={weekday}
                                    event_type={event_type}
                                    event={event}
                                    event_url={event_url}
                                    event_date={event_date}
                                    event_img={event_img}
                                    onAddEvent={(e) => this.handleEventSubmit(e)}
                                />
                        </li>
                    </ul>
            </div>
        )
    }
}

export default AllEventFormat