import React from 'react';
import './SearchEvents.css'

class SearchEvents extends React.Component{
    render() { 
        return(
            <section className='search-bar'>
                    <form className='search-form'>
                        <fieldset>
                            <legend>Search or Add Events</legend>
                            <select>
                                <option value=''>Pick your day</option>
                                <option value='Sunday'>Sunday</option>
                                <option value='Monday'>Monday</option>
                                <option value='Tuesday'>Tuesday</option>
                                <option value='Wednesday'>Wednesday</option>
                                <option value='Thursday'>Thursday</option>
                                <option value='Friday'>Friday</option>
                                <option value='Saturday'>Saturday</option>
                            </select>
                            <label htmlFor='search-input'>Search
                            <input type='text'/>
                            </label>
                            <label htmlFor='manul-input'>Manual Add
                            <input type='text'/>
                            </label>
                            <button className='search-button'>Search</button>
                            <h3>Results</h3>
                            <div className='results'>
                                EXAMPLE RESULT
                            </div>
                        </fieldset>
                    </form>
            </section>
        )
    }
}

export default SearchEvents;