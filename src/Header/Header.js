import React from 'react';
import './Header.css'
import { Link } from 'react-router-dom'
import TokenService from '../services/token-service'
import HeaderLoginForm from '../HeaderLoginForm/HeaderLoginForm';


class Header extends React.Component {

  // clear token and userid from session storage 
  handleLogoutClick = () => {
    TokenService.clearAuthToken()
    TokenService.clearUserId()
  }

//method to display logout link in the header 
  renderLogoutLink() {
    return (
      <div className='header-logged-in'>
        <Link to='/myevents' className='home-link'>
          <h1>Your Events
              <i className='far fa-grin-tongue'></i></h1>
        </Link>
        <Link
          className='logout-link'
          onClick={this.handleLogoutClick}
          to='/'>
          <span title='Logout' className='logout'>Logout<i className="fas fa-sign-out-alt" /></span>
        </Link>
      </div>
    )
  }

//method to display login link in the header
  renderLoginLink() {
    return (
      <div>
        <Link to='/' className='home-link'>
          <h1 className='home-link'>Just Go
          <i className='far fa-grin-tongue'></i></h1>
        </Link>
        <Link to='/login' className='sign-in-link'>
          Login
          <i className='fas fa-sign-in-alt' />
        </Link>
        <HeaderLoginForm />
      </div>
    )
  }

  render() {
    return (
      //display proper header for logged in and logged out users
      <header className='header'>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </header>
    )
  }
}

export default Header;

