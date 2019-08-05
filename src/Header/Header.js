import React from 'react';
import './Header.css'
import { Link } from 'react-router-dom'
import TokenService from '../services/token-service'
import HeaderLoginForm from '../HeaderLoginForm/HeaderLoginForm';


class Header extends React.Component{ 
  handleLogoutClick = () => {
    TokenService.clearAuthToken()
    TokenService.clearUserId()
  }
 
  renderLogoutLink() {
    return (
        <div className='header-logged-in'>
            <Link to='/events'className='home-link'>
              <h1>This Week
              <i className='fas fa-calendar-alt'></i></h1>
            </Link>
            <Link
                className='logout-link'
                onClick={this.handleLogoutClick}
                to='/'>
                <span title='Logout'>Logout<i className="fas fa-sign-out-alt" /></span>
            </Link>
        </div>
    )
  }

  renderLoginLink() {
    return (
      <div>
        <Link to='/'className='home-link'>
          <h1 className='home-link'>This Week
            <i className='fas fa-calendar-alt'></i></h1>
        </Link>
        <Link to='/login' className='sign-in-link'>
          Login
          <i className='fas fa-sign-in-alt'/>
        </Link>
          <HeaderLoginForm />
      </div>
    )
  }

    render() {
        return(
          <header className='header'>
          {TokenService.hasAuthToken()
                  ? this.renderLogoutLink()
                  : this.renderLoginLink()}
          </header>
        )
    }
}

export default Header;

