import React from 'react';
import './Header.css'
import { Link } from 'react-router-dom'
import TokenService from '../services/token-service'


class Header extends React.Component{
  handleLogoutClick = () => {
    TokenService.clearAuthToken()
    TokenService.clearUserId()
  }

  renderLogoutLink() {
    return (
        <div className='header-logged-in'>
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
      <Link to='/login' className='sign-in-link'>
        Login
        <i className='fas fa-sign-in-alt'/>
      </Link>
        <form className='sign-in-form'>
          <label htmlFor='email'>Email</label>
            <input 
              type='text'
              name='email'
              id='email'
              />
          <label htmlFor='email'>Password</label>
            <input 
              type='text'
              name='password'
              id='password'
              />
            <Link to='/events'><button type='submit'>Sign In</button></Link>
      </form>
      </div>
    )
  }

    render() {
        return(
          <header className='header'>
            <Link to='/'className='home-link'>
              <h1>This Week
              <i className='fas fa-calendar-alt'></i></h1>
            </Link>
          {TokenService.hasAuthToken()
                  ? this.renderLogoutLink()
                  : this.renderLoginLink()}
          </header>
        )
    }
}

export default Header;

