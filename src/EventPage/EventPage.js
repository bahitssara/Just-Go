import React from 'react'
import './EventPage.css'
import SearchEvents from '../SearchEvents/SearchEvents'
import AllEvents from '../AllEvents/AllEvents';

class EventPage extends React.Component {
    render() {
        return (
            //render events and search bar to one path
            <section className='event-page'>
                <SearchEvents />
                <AllEvents />
            </section>
        )
    }
}

export default EventPage