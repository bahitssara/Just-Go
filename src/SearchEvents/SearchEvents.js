import React from 'react';
import './SearchEvents.css'
import config from '../config'
import ThisWeekContext from '../ThisWeekContext'
import { format } from 'date-fns'
import EventsApiService from '../services/events-api-service'
import AddEvent from '../AddEvent/AddEvent'
import TokenService from '../services/token-service'

class SearchEvents extends React.Component {
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
            event_type: '',
            user_id: '',
            imgError: true
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
                if (responseJson.events.length !== 0) {
                    this.setState({
                        searchResults: responseJson.events,
                    })
                } else {
                    this.setState({
                        searchResults: [{
                            datetime_local: '',
                            id: '',
                            performers: [{
                                image: 'https://images.unsplash.com/photo-1499415479124-43c32433a620?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1789&q=80'
                            }],
                            title: 'No Search Results',
                            type: 'No events for this artist currently, search another!',
                            url: '',
                            venue: {
                                name: '',
                                display_location: ''
                            }
                        }]
                    })

                }
            })
            .catch(error => {
                console.error({ error })
            })
    }
    //send event details to /api/events just-go-api endpoint
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


    static contextType = ThisWeekContext;
    render() {
        const results = this.state.searchResults
        return (
            <section className='search-bar'>
                <form className='search-form' onSubmit={e => this.updateState(e)}>
                    <label htmlFor='search-input'>Search a city, event, venue or musician and <span className='just-go'>Just Go!</span>
                        <input type='text' name='search_input' id='search_input' ref={input => (this.input = input)} required/>
                    </label>
                    <button type='submit' className='search-button' >Search</button>
                </form>
                <div className='results'>
                    <ul className='results-li'>
                        {results.map(event =>
                            <li className='search-li-item' key={event.id}>
                                <a href={event.url} id='event-link-search' rel='noopener noreferrer' target='_blank'>{event.title}</a>
                                <img
                                    className='event-photo'
                                    alt='test'
                                    src={event.performers[0].image ? event.performers[0].image : 'https://icon-library.net/images/no-image-icon/no-image-icon-0.jpg'}
                                />
                                <p>Event Type:{event.type}</p>
                                <p>{event.venue.display_location}</p>
                                <p>{event.venue.name}</p>
                                <span className='event-date'>{format(event.datetime_local, 'ddd MM/DD/YYYY')}</span>
                                <AddEvent
                                    //render button and collect event details to send to api
                                    title={event.title}
                                    weekday={event.datetime_local}
                                    event_type={event.type}
                                    event={event.venue.display_location}
                                    event_url={event.url}
                                    event_date={event.datetime_local}
                                    event_img={event.performers[0].image ? event.performers[0].image : 'https://icon-library.net/images/no-image-icon/no-image-icon-0.jpg'}
                                    onAddEvent={(e) => this.handleEventSubmit(e)}
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

