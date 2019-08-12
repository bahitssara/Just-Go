import React from 'react'
import './Calendar.css'
import config from '../config'
import Slider from "react-slick"
import { Link } from 'react-router-dom'
import ThisWeekContext from '../ThisWeekContext'
import TokenService from '../services/token-service'
import CalendarFormat from '../CalendarFormat/CalendarFormat'

class Calendar extends React.Component {

    state = {
        events: [],
        isLoading: false
    }

    static contextType = ThisWeekContext;

    // Fetch events posted by the logged in user only
    componentDidMount() {
        this.setState({ isLoading: true });
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
                    events: userEvents,
                    isLoading: false
                })
            }).catch(err =>
                console.error({ err }))
    };

    render() {
        const { events = [], isLoading } = this.state;
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
          }; 
        return (
            <section className='calendar-page'>
                <h2>What's the hold up, Just Go!</h2>
                <Link to='events'><button className='search-events-button'>Look for new events</button></Link>
                {isLoading && <span className='login-loading'>Looking for your events!</span>}

                <Slider {...settings}>
                {events.map(event =>
                        <CalendarFormat
                            key={event.id}
                            id={event.id}
                            event_url={event.event_url}
                            event_img={event.event_img}
                            event_date={event.event_date}
                            event={event.event}
                            event_type={event.event_type}
                            title={event.title}
                        />
                )}
                </Slider>

            </section>
        )
    }
}

export default Calendar;