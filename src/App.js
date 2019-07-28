import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import SignUpForm from './SignUpForm/SignUpForm'
import Header from './Header/Header'
import Footer from './footer/footer'
import HomePage from './HomePage/HomePage';
import EventPage from './EventPage/EventPage';
import LoginForm from './LoginForm/LoginForm';

class App extends React.Component {
  render(){
    return (
      <main className='App'>
        <Route path='/' component={Header}/>
        <Route path='/' component={HomePage} exact/>
        <Route path='/signup' component={SignUpForm} exact/>
        <Route path='/events' component={EventPage} exact/>
        <Route path='/login' component={LoginForm} exact/>
        <Route path='/' component={Footer} />
      </main>
    );
  }
}

export default App;