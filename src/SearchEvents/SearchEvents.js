import React from 'react';
import './SearchEvents.css'
import config from '../config'
import ThisWeekContext from '../ThisWeekContext'
import { format } from 'date-fns'
import EventsApiService from '../services/events-api-service'
import AddEvent from '../AddEvent/AddEvent'

class SearchEvents extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            query: '',
            searchResults: [],
            weekday: '',
            title: '',
            event_url: '',
            event: '',
            event_date: '',
            event_img: '',
            user_id: ''
        }
        this.handleSearch = this.handleSearch.bind(this)
    }

    //Get search query value
    updateState(ev) {
        ev.preventDefault()
        const value = this.input.value
        this.setState({
            query: value,
        })
        this.handleSearch(value)
    }
        
    //search SeatGeek API for concerts
    handleSearch(query) {
        const auth = config.EVENT_API_KEY;
        const eventApiParams = `?q=${query}&client_id=${auth}`;
        const str = config.EVENT_API + `${eventApiParams}`;
        const url = str.replace(/ /g, '+')
        fetch(url, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then(responseJson => {
                this.setState({
                    searchResults: responseJson.events
                })
                console.log(this.state.searchResults)
            })
            .catch(error => {
                console.error({ error })
            })
    }

    handleEventSubmit = ev => {
        ev.preventDefault();
        this.setState({ error: null })
        const { user_id, weekday, title, event_url, event, event_date } = ev.target

        EventsApiService.postEvent({
            user_id: user_id.value,
            weekday: weekday.value,
            title: title.value,
            event_url: event_url.value,
            event: event.value,
            event_date: event_date.value
        })
            .then(() =>
                weekday.value = '',
                title.value = '',
                event_url.value = '',
                event.value = '',
                event_date.value = '',
            )
            .catch(res => {
                this.setState({ error: res.error })
            })
    }
    
    static contextType = ThisWeekContext;
    render() { 
        const results = this.state.searchResults
        return(
            <section className='search-bar'>
                <form className='search-form' onSubmit={e => this.updateState(e)}>
                        <legend>Search or Add Events</legend>
                        <label htmlFor='search-input'>Search
                        <input type='text' name='search_input' id='search_input' ref={input => (this.input = input)} />
                        </label>
                        <button type='submit' className='search-button' >Search</button>
                </form>
                <h3>Results</h3>
                        <div className='results'>
                            <ul className='results-li'>
                                {results.map(event =>             
                                    <li className='search-li-item' key={event.id}>
                                        <a href={event.url} className='event-link' rel='noopener noreferrer' target='_blank'>{event.title}</a>
                                        {event.performers.map(photo => 
                                        <img src={photo.image} 
                                            alt='event' className='event-photo'
                                            key={photo.id}/>
                                        )}
                                        <p>Event Type:{event.type}</p>
                                        <p>{event.venue.name}</p>
                                        <span className='event-date'>Event Date: {format(event.datetime_local, 'ddd MM/DD/YYYY')}</span>

                                        <AddEvent 
                                           title={event.title} 
                                           weekday={event.datetime_local}
                                           
                                        />
                                    </li>
                                )}
                             </ul> 
                        </div>
            </section>
        )
    }
}

export default SearchEvents;