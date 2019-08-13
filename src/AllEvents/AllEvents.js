import React from 'react'
import './AllEvents.css'
import config from '../config'
import Slider from "react-slick"
import ThisWeekContext from '../ThisWeekContext'
import TokenService from '../services/token-service'
import AllEventFormat from '../AllEventFormat/AllEventFormat';

class AllEvents extends React.Component {

    state = {
        events: [],
        isLoading: false
    }

    static contextType = ThisWeekContext;

    // Fetch events posted by the logged in user only
    componentDidMount() {
        this.setState({ isLoading: true });
        fetch(`${config.API_ENDPOINT}/api/events`, {
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
        //provide settings for slider feature 
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
          }; 
        return (
            <section className='all-event-page'>
                <h2>What people are diggin'</h2>
                {isLoading && <span className='login-loading'>Looking for events!</span>}
                <Slider {...settings}>
                {events.map(event =>
                        <AllEventFormat
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

export default AllEvents;