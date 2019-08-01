import React from 'react';
import './SearchEvents.css'
import config from '../config'
import ThisWeekContext from '../ThisWeekContext'
import { format } from 'date-fns'
import EventsApiService from '../services/events-api-service'
import AddEvent from '../AddEvent/AddEvent'
import TokenService from '../services/token-service'

class SearchEvents extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            query: '',
            searchResults: [],
            img_url: '',
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
                const data = responseJson.events.map(img => {
                    return img.performers
                })
                this.setState({
                    searchResults: responseJson.events,
                    img_url: data
                })
                console.log(this.state.searchResults)
                console.log(this.state.img_url)
            })
            .catch(error => {
                console.error({ error })
            })
    }

    handleEventSubmit = ev => {
        ev.preventDefault();
        this.setState({ error: null })
        const { weekday, title, event_url, event, event_date, event_img } = ev.target

        EventsApiService.postEvent({
            user_id: TokenService.getUserId(),
            weekday: weekday.value,
            title: title.value,
            event_url: event_url.value,
            event: event.value,
            event_date: event_date.value,
            event_img: event_img.value
        })
            .then(() =>
                weekday.value = '',
                title.value = '',
                event_url.value = '',
                event.value = '',
                event_date.value = '',
                event_img.value = ''
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
                        <label htmlFor='search-input'>Search events
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
                                        <img src={event.performers[0].image} alt='event'/>
                                        <p>Event Type:{event.type}</p>
                                        <p>{event.venue.name}</p>
                                        <span className='event-date'>Event Date: {format(event.datetime_local, 'ddd MM/DD/YYYY')}</span>
                                        <AddEvent 
                                           title={event.title} 
                                           weekday={event.datetime_local}
                                           event={event.type}
                                           event_url={event.url}
                                           event_date={event.datetime_local}
                                           event_img={event.performers[0].image}
                                           onAddEvent = {(e) => this.handleEventSubmit(e)}
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

