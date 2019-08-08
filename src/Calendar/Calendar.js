import React from 'react'
import './Calendar.css'
// import './SlickCarousel.css' from 'slick-carousel';
// import './SlickSlide.css'
import config from '../config'
import Slider from "react-slick";
import ThisWeekContext from '../ThisWeekContext'
import TokenService from '../services/token-service'
import CalendarFormat from '../CalendarFormat/CalendarFormat';

class Calendar extends React.Component {

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

    render() {
        const { events = [] } = this.state;
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