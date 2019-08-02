import React from 'react'
import './Calendar.css'
import config from '../config'
import ThisWeekContext from '../ThisWeekContext'
import TokenService from '../services/token-service'
import CalendarFormat from '../CalendarFormat/CalendarFormat';

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
            }).catch(err =>
                console.error({ err }))
    };
    
    render(){ 
        const {events = []}  = this.state;
        return(
            <section className='calendar-page'>
                <h2>Your Saved Events</h2>
                    {events.map(event => 
                        <CalendarFormat 
                            key={event.id}
                            id={event.id}
                            event_url={event.event_url}
                            event_img={event.event_img}
                            event_date={event.event_date}
                            event={event.event}
                            title={event.title}
                        />
                    )}
                </section>
        )
    }
}

export default Calendar;