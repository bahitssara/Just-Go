import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import SignUpForm from '../SignUpForm/SignUpForm'
import Header from '../Header/Header'
import Footer from '../footer/footer'
import HomePage from '../HomePage/HomePage';
import EventPage from '../EventPage/EventPage';
import LoginForm from '../LoginForm/LoginForm';
import ThisWeekContext from '../ThisWeekContext'

class App extends React.Component {
  state = {
    user: '',
    events: [],
    searchResults: [],
    error: null
  };

  handleDeleteEvent = eventId => {
    this.setState({
      events: this.state.events.filter(event => event.id !== eventId)
    })
  }

  handleEditEvent = eventId => {
    this.setState({
      events:
        [...this.state.events, eventId]
    })
  }

  handleAddEvent = event => {
    this.setState({
      events:
        [...this.state.event, event]
    })
  }

  handleEventSearch = (events) => {
    this.setState({
      searchResults: events
    })
  }

  setError = (error) => {
    console.error(error)
    this.setState({
      error
    })
  }

  render() {
    const contextValue = {
      user: this.state.user,
      events: this.state.event,
      searchResults: this.state.searchResults,
      deleteEvent: this.handleDeleteEvent,
      editreview: this.handleEditEvent,
      addReview: this.handleAddEvent,
      error: this.state.error
    }

    return (
      <ThisWeekContext.Provider value={contextValue}>
        <main className='App'>
          <Route path='/' component={Header} />
          <Route path='/' component={HomePage} exact />
          <Route path='/signup' component={SignUpForm} exact />
          <Route path='/events' component={EventPage} exact />
          <Route path='/login' component={LoginForm} exact />
          <Route path='/' component={Footer} />
        </main>
      </ThisWeekContext.Provider>
    );
  }
}

export default App;