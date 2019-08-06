import React from 'react';
import './EventPage.css'
import SearchEvents from '../SearchEvents/SearchEvents'
import Calendar from '../Calendar/Calendar'

class EventPage extends React.Component {
    render() {
        return (
            <section className='event-page'>
                <SearchEvents />
                <Calendar />
            </section>
        )
    }
}

export default EventPage